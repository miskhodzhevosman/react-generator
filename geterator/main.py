#!/usr/bin/env python3
"""
generate_crud.py — генерирует файлы для всех моделей указанных приложений
по шаблонам, пути к которым заданы в path_list.py.

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
# 3. Рендер одного шаблона
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

    # --- Содержимое ---
    content = src.read_text(encoding="utf-8")
    content = content.replace("entity_endpoint", context["entity_endpoint"])
    content = content.replace("entity", context["entity"])

    # --- Путь назначения: заменяем 'entity' по ВСЕМУ пути, а не только в имени ---
    dest = Path(str(src).replace("entity", context["entity"]))

    if dry_run:
        print(f"      [dry-run] {src} → {dest}")
        return dest

    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(content, encoding="utf-8")
    print(f"      ✓ {dest}")
    return dest
# ============================================================
# 4. Точка входа
# ============================================================
def main():
    # --- 1. Путь к проекту из path_list ---
    project_path = Path(path_list.project_path)
    if not project_path.is_absolute():
        project_path = (Path(__file__).parent / project_path).resolve()

    setup_django(project_path)

    # --- 2. Список приложений из path_list ---
    # В path_list.apps элементы вида 'crm/', 'finance/' — берём имя без слэша
    app_labels = [a.rstrip("/") for a in path_list.apps]

    # --- 3. Список шаблонов из path_list ---
    template_attrs = [
        "api_path",
        "store_path",
        "schemas_path",
        "main_view_path",
        "form_path",
        "table_path",
    ]

    templates: list[Path] = []
    for attr in template_attrs:
        raw = getattr(path_list, attr, None)
        if not raw:
            continue
        p = Path(raw)
        if not p.is_absolute():
            p = (Path(__file__).parent / p).resolve()
        templates.append(p)

    print(f"[*] Приложений: {len(app_labels)} -> {app_labels}")
    print(f"[*] Шаблонов: {len(templates)}")
    for t in templates:
        print(f"    - {t}")
    print()

    # --- 4. Обходим модели ---
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

            for tpl in templates:
                render_template(tpl, ctx)
        print()

    print("Готово.")


if __name__ == "__main__":
    main()
