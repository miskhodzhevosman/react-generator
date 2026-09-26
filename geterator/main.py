#!/usr/bin/env python3
"""
generate_crud.py — генерирует файлы для всех моделей указанных приложений
по шаблонам, пути к которым заданы в path_list.py.

Дополнительно: файлы схем (`schemas_path`) генерируются с нуля
из полей модели (FormSchema + TableSchema), без чтения шаблона.

Запуск (из той же папки, где лежит generate_crud.py и path_list.py):
    python generate_crud.py
"""

import os
import re
import sys
from pathlib import Path

import path_list


# ============================================================
# 1. Инициализация Django
# ============================================================
def find_manage_py(start: Path) -> Path | None:
    for parent in [start, *start.parents]:
        candidate = parent / "manage.py"
        if candidate.is_file():
            return candidate
    return None


def extract_settings_module(manage_py: Path) -> str | None:
    try:
        text = manage_py.read_text(encoding="utf-8")
    except OSError:
        return None
    m = re.search(r"DJANGO_SETTINGS_MODULE['\"]?\s*,\s*['\"]([^'\"]+)['\"]", text)
    if m:
        return m.group(1)
    m = re.search(r"DJANGO_SETTINGS_MODULE['\"]?\s*\]\s*=\s*['\"]([^'\"]+)['\"]", text)
    if m:
        return m.group(1)
    return None


def setup_django(project_path: Path) -> None:
    project_path = project_path.resolve()
    if not project_path.is_dir():
        sys.exit(f"Не директория: {project_path}")

    manage_py = find_manage_py(project_path)
    if manage_py is None:
        sys.exit(f"Не найден manage.py в {project_path} или выше.")

    project_root = manage_py.parent
    if str(project_root) not in sys.path:
        sys.path.insert(0, str(project_root))

    if not os.environ.get("DJANGO_SETTINGS_MODULE"):
        settings = extract_settings_module(manage_py)
        if not settings:
            sys.exit("Не удалось определить DJANGO_SETTINGS_MODULE")
        os.environ["DJANGO_SETTINGS_MODULE"] = settings

    import django
    django.setup()
    print(f"[*] Django {django.get_version()} инициализирован "
          f"({os.environ['DJANGO_SETTINGS_MODULE']})")


# ============================================================
# 2. Контекст модели
# ============================================================
def build_context(model) -> dict[str, str]:
    meta = model._meta
    entity = model.__name__.lower()
    app_label = meta.app_label

    return {
        "entity": entity,
        "entity_endpoint": f"{app_label}/{entity}/",
    }


# ============================================================
# 3. Рендер одного шаблона (не-схемы)
# ============================================================
def render_template(
    template_path: Path,
    context: dict[str, str],
    dry_run: bool = False,
) -> Path:
    src = Path(template_path).resolve()

    if not src.is_file():
        print(f"      ✗ шаблон не найден: {src}")
        return src

    content = src.read_text(encoding="utf-8")
    content = content.replace("entity_endpoint", context["entity_endpoint"])
    content = content.replace("entity", context["entity"])

    dest = Path(str(src).replace("entity", context["entity"]))

    if dry_run:
        print(f"      [dry-run] {src} → {dest}")
        return dest

    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(content, encoding="utf-8")
    print(f"      ✓ {dest}")
    return dest


# ============================================================
# 4. Генерация схем из полей модели
# ============================================================

# --- карта: тип поля Django → тип в схеме ---
FIELD_TYPE_MAP = {
    # текст
    "CharField": "text",
    "EmailField": "text",
    "SlugField": "text",
    "URLField": "text",
    "GenericIPAddressField": "text",
    "FilePathField": "text",
    # многострочный
    "TextField": "textarea",
    # числа
    "IntegerField": "number",
    "SmallIntegerField": "number",
    "BigIntegerField": "number",
    "PositiveIntegerField": "number",
    "PositiveSmallIntegerField": "number",
    "PositiveBigIntegerField": "number",
    "DecimalField": "number",
    "FloatField": "number",
    # булево
    "BooleanField": "checkbox",
    "NullBooleanField": "checkbox",
    # даты
    "DateField": "date",
    "DateTimeField": "datetime",
    "TimeField": "time",
    "DurationField": "text",
    # прочее
    "UUIDField": "text",
    "JSONField": "text",
}

RELATION_FIELDS = {"ForeignKey", "OneToOneField", "ManyToManyField"}


def get_field_type(field) -> str:
    """Определяет type поля для FormSchema."""
    # choices → select
    if getattr(field, "choices", None):
        return "select"
    # связи → int (id)
    if field.get_internal_type() in RELATION_FIELDS:
        return "int"
    return FIELD_TYPE_MAP.get(field.get_internal_type(), "text")


def get_label(field) -> str:
    """verbose_name, если задан, иначе имя поля."""
    vn = getattr(field, "verbose_name", None)
    if vn:
        return str(vn)
    return field.name


def get_placeholder(field, field_type: str) -> str:
    """placeholder для поля формы."""
    choices = getattr(field, "choices", None)
    if choices:
        # первое value из choices
        try:
            first_value = next(iter(choices))[0]
        except StopIteration:
            first_value = ""
        return f"Например {first_value}"
    if field.get_internal_type() in RELATION_FIELDS:
        return "Введите id"
    return f"Введите {get_label(field)}"


def get_options(field):
    """options для choices-поля: [{ value, label }, ...]."""
    choices = getattr(field, "choices", None)
    if not choices:
        return None
    result = []
    for value, label in choices:
        result.append({"value": value, "label": str(label)})
    return result


def get_step(field):
    """step для DecimalField."""
    if field.get_internal_type() == "DecimalField":
        places = getattr(field, "decimal_places", None)
        if places is not None:
            return "0." + "0" * (places - 1) + "1" if places > 0 else "1"
    return None


def field_to_form_entry(field) -> dict:
    """Собирает dict для одного поля FormSchema."""
    field_type = get_field_type(field)
    entry = {
        "name": field.name,
        "type": field_type,
        "label": get_label(field),
        "placeholder": get_placeholder(field, field_type),
    }
    options = get_options(field)
    if options:
        entry["options"] = options
    step = get_step(field)
    if step:
        entry["step"] = step
    return entry


def field_to_table_entry(field) -> dict:
    return {
        "name": field.name,
        "label": get_label(field),
    }


# --- поля, которые исключаем из FormSchema ---
FORM_EXCLUDE = {"id", "updated_at"}


def collect_ordered_fields(model):
    """
    Поля модели в порядке объявления: сначала concrete (по creation_counter),
    затем M2M (по creation_counter). Обратные связи пропускаются.
    """
    concrete = []
    m2m = []
    for f in model._meta.get_fields():
        if getattr(f, "auto_created", False) and not getattr(f, "concrete", False):
            # обратная связь — пропускаем
            continue
        if getattr(f, "many_to_many", False):
            m2m.append(f)
        elif getattr(f, "concrete", False):
            concrete.append(f)

    concrete.sort(key=lambda f: getattr(f, "creation_counter", 0))
    m2m.sort(key=lambda f: getattr(f, "creation_counter", 0))
    return concrete + m2m


def _js_value(value) -> str:
    """Преобразует Python-значение в JS-литерал."""
    if isinstance(value, bool):
        return "true" if value else "false"
    if isinstance(value, (int, float)):
        return str(value)
    if value is None:
        return "null"
    s = str(value).replace("\\", "\\\\").replace("'", "\\'")
    return f"'{s}'"


def _render_object(entry: dict, indent: int = 2) -> str:
    """Рендерит один объект поля в JS."""
    pad = " " * indent
    inner = " " * (indent + 2)
    lines = [f"{pad}{{"]
    for key, value in entry.items():
        if key == "options":
            lines.append(f"{inner}{key}: [")
            opt_pad = " " * (indent + 4)
            opt_inner = " " * (indent + 6)
            for opt in value:
                lines.append(f"{opt_pad}{{")
                lines.append(f"{opt_inner}value: {_js_value(opt['value'])},")
                lines.append(f"{opt_inner}label: {_js_value(opt['label'])},")
                lines.append(f"{opt_pad}}},")
            lines.append(f"{inner}],")
        else:
            lines.append(f"{inner}{key}: {_js_value(value)},")
    lines.append(f"{pad}}},")
    return "\n".join(lines)


def render_schema_file(model) -> str:
    """Генерирует содержимое файла схемы из полей модели."""
    entity = model.__name__.lower()
    fields = collect_ordered_fields(model)

    # --- FormSchema ---
    form_entries = []
    for f in fields:
        if f.name in FORM_EXCLUDE:
            continue
        form_entries.append(field_to_form_entry(f))

    # --- TableSchema ---
    table_entries = [field_to_table_entry(f) for f in fields]

    parts = []
    parts.append(f"export const {entity}FormSchema = [")
    for entry in form_entries:
        parts.append(_render_object(entry))
    parts.append("]")
    parts.append("")
    parts.append("")
    parts.append(f"export const {entity}TableSchema = [")
    for entry in table_entries:
        parts.append(_render_object(entry))
    parts.append("]")
    parts.append("")
    return "\n".join(parts)


def schema_dest_path(schemas_path: Path, entity: str) -> Path:
    """Путь сохранения схемы: заменяем 'entity' во всём пути."""
    return Path(str(schemas_path).replace("entity", entity))


def write_schema(
    schemas_path: Path,
    model,
    dry_run: bool = False,
) -> Path:
    entity = model.__name__.lower()
    dest = schema_dest_path(schemas_path, entity)
    content = render_schema_file(model)

    if dry_run:
        print(f"      [dry-run] schema → {dest}")
        return dest

    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(content, encoding="utf-8")
    print(f"      ✓ {dest}")
    return dest


# ============================================================
# 5. Точка входа
# ============================================================
def resolve_path(raw: str) -> Path:
    p = Path(raw)
    if not p.is_absolute():
        p = (Path(__file__).parent / p).resolve()
    return p


def main():
    # --- 1. Путь к проекту из path_list ---
    project_path = resolve_path(path_list.project_path)

    setup_django(project_path)

    # --- 2. Список приложений ---
    app_labels = [a.rstrip("/") for a in path_list.apps]

    # --- 3. Шаблоны (кроме схем) ---
    template_attrs = [
        "api_path",
        "store_path",
        "main_view_path",
        "form_path",
        "table_path",
    ]

    templates: list[Path] = []
    for attr in template_attrs:
        raw = getattr(path_list, attr, None)
        if not raw:
            continue
        templates.append(resolve_path(raw))

    # --- 4. Путь для схем ---
    schemas_raw = getattr(path_list, "schemas_path", None)
    schemas_path = resolve_path(schemas_raw) if schemas_raw else None

    print(f"[*] Приложений: {len(app_labels)} -> {app_labels}")
    print(f"[*] Шаблонов: {len(templates)}")
    for t in templates:
        print(f"    - {t}")
    if schemas_path:
        print(f"[*] Схемы (генерируются с нуля): {schemas_path}")
    print()

    # --- 5. Обходим модели ---
    from django.apps import apps

    for app_label in app_labels:
        try:
            app_config = apps.get_app_config(app_label)
        except LookupError:
            print(f"[!] Приложение не найдено: {app_label}")
            continue

        models = [m for m in app_config.get_models() if not m._meta.auto_created]
        if not models:
            print(f"📦 {app_label}  (моделей нет)\n")
            continue

        print(f"📦 {app_label}  ({len(models)} моделей)")

        for model in sorted(models, key=lambda x: x.__name__):
            ctx = build_context(model)
            print(f"  🧩 {model.__name__}  "
                  f"(entity={ctx['entity']!r}, "
                  f"endpoint={ctx['entity_endpoint']!r})")

            # обычные шаблоны
            for tpl in templates:
                render_template(tpl, ctx)

            # схема — генерируется с нуля
            if schemas_path:
                write_schema(schemas_path, model)
        print()

    print("Готово.")


if __name__ == "__main__":
    main()
