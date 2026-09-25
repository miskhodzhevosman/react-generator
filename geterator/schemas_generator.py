#!/usr/bin/env python3
"""
django_models_dump.py - Печатает все модели Django-проекта в консоль.

Использование:
    python django_models_dump.py /path/to/django/project
    python django_models_dump.py /path/to/django/project --app blog
    python django_models_dump.py /path/to/django/project --local-only
"""

import os
import re
import sys
import argparse
from pathlib import Path


# ---------- цвета ----------
def color(text: str, code: str) -> str:
    if not sys.stdout.isatty() or os.name == "nt":
        return text
    return f"\033[{code}m{text}\033[0m"


# ---------- поиск manage.py и settings ----------
def find_manage_py(start: Path) -> Path | None:
    """Ищет manage.py в start и вверх по дереву."""
    for parent in [start, *start.parents]:
        candidate = parent / "manage.py"
        if candidate.is_file():
            return candidate
    return None


def extract_settings_module(manage_py: Path) -> str | None:
    """Достаёт DJANGO_SETTINGS_MODULE из manage.py."""
    try:
        text = manage_py.read_text(encoding="utf-8")
    except OSError:
        return None

    # Вариант 1: os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'proj.settings')
    m = re.search(
        r"DJANGO_SETTINGS_MODULE['\"]?\s*,\s*['\"]([^'\"]+)['\"]",
        text,
    )
    if m:
        return m.group(1)

    # Вариант 2: os.environ["DJANGO_SETTINGS_MODULE"] = "proj.settings"
    m = re.search(
        r"DJANGO_SETTINGS_MODULE['\"]?\s*\]\s*=\s*['\"]([^'\"]+)['\"]",
        text,
    )
    if m:
        return m.group(1)

    return None


def setup_django(project_path: Path) -> None:
    """Настраивает окружение Django по пути к проекту."""
    project_path = project_path.resolve()

    if not project_path.exists():
        print(f"Путь не существует: {project_path}", file=sys.stderr)
        sys.exit(1)
    if not project_path.is_dir():
        print(f"Это не директория: {project_path}", file=sys.stderr)
        sys.exit(1)

    # Ищем manage.py
    manage_py = find_manage_py(project_path)
    if manage_py is None:
        print(
            f"Не найден manage.py в {project_path} или выше по дереву.",
            file=sys.stderr,
        )
        sys.exit(1)

    project_root = manage_py.parent
    print(f"[*] manage.py: {manage_py}")

    # Добавляем корень проекта в sys.path
    if str(project_root) not in sys.path:
        sys.path.insert(0, str(project_root))

    # Определяем settings
    if not os.environ.get("DJANGO_SETTINGS_MODULE"):
        settings = extract_settings_module(manage_py)
        if not settings:
            print(
                "Не удалось определить DJANGO_SETTINGS_MODULE из manage.py.\n"
                "Задай вручную: export DJANGO_SETTINGS_MODULE=myproject.settings",
                file=sys.stderr,
            )
            sys.exit(1)
        os.environ["DJANGO_SETTINGS_MODULE"] = settings

    print(f"[*] settings: {os.environ['DJANGO_SETTINGS_MODULE']}")

    # Инициализация Django
    import django
    try:
        django.setup()
    except Exception as e:
        print(f"Ошибка инициализации Django: {e}", file=sys.stderr)
        sys.exit(1)

    print(f"[*] Django {django.get_version()} инициализирован\n")


# ---------- описание поля ----------
def describe_field(field) -> str:
    parts = []

    if field.is_relation:
        if field.many_to_many:
            kind = "M2M"
        elif field.one_to_one:
            kind = "O2O"
        elif field.many_to_one:
            kind = "FK"
        else:
            kind = "REL"

        target = ""
        if field.related_model is not None:
            target = (
                f"{field.related_model._meta.app_label}."
                f"{field.related_model.__name__}"
            )
        parts.append(f"{kind} → {target}")

        remote = getattr(field, "remote_field", None)
        if remote and remote.related_model:
            parts.append(f"related_model={remote.related_model}")
        if getattr(field, "on_delete", None):
            parts.append(f"on_delete={field.on_delete.__name__}")
    else:
        parts.append(type(field).__name__)

    if getattr(field, "max_length", None):
        parts.append(f"max_length={field.max_length}")
    if getattr(field, "primary_key", False):
        parts.append("PK")
    if getattr(field, "unique", False):
        parts.append("unique")
    if getattr(field, "null", False):
        parts.append("null=True")
    if getattr(field, "blank", False):
        parts.append("blank=True")
    if getattr(field, "db_index", False):
        parts.append("db_index")
    if getattr(field, "choices", None):
        names = [str(c[0]) for c in field.choices]
        parts.append(f"choices={names}")
    if getattr(field, "default", None) is not None and not callable(field.default):
        parts.append(f"default={field.default!r}")

    return ", ".join(parts)


# ---------- вывод модели ----------
def print_model(model) -> None:
    meta = model._meta

    print()
    print(color(f"  🧩 {meta.app_label}.{model.__name__}", "1;32")
          + color(f"  (таблица: {meta.db_table})", "90"))

    bases = [b.__name__ for b in model.__bases__ if b.__name__ != "object"]
    if bases:
        print(f"     Наследует: {', '.join(bases)}")

    if meta.abstract:
        print(color("     [abstract]", "33"))

    flags = []
    if meta.proxy:
        flags.append("proxy")
    if not meta.managed:
        flags.append("unmanaged")
    if flags:
        print(color(f"     [{', '.join(flags)}]", "33"))

    fields = list(meta.get_fields())
    if fields:
        print(color("     Поля:", "1;34"))
        max_name = max(len(f.name) for f in fields)
        for f in fields:
            name = f.name.ljust(max_name)
            print(f"       • {name}  →  {describe_field(f)}")
    else:
        print(color("     (поля не найдены)", "90"))

    extras = []
    if meta.ordering:
        extras.append(f"ordering={list(meta.ordering)}")
    if meta.verbose_name and str(meta.verbose_name) != model.__name__.lower():
        extras.append(f"verbose_name={meta.verbose_name!r}")
    if meta.unique_together:
        extras.append(f"unique_together={meta.unique_together}")
    if meta.indexes:
        extras.append(f"indexes={[i.name or i.fields for i in meta.indexes]}")
    if meta.constraints:
        extras.append(f"constraints={len(meta.constraints)}")

    if extras:
        print(color("     Meta:", "1;34"))
        for e in extras:
            print(f"       ◦ {e}")

    managers = [m.name for m in meta.managers if m.name != "objects"]
    if managers:
        print(color("     Менеджеры: ", "1;34") + ", ".join(managers))

    own_methods = [
        name for name, _ in model.__dict__.items()
        if callable(getattr(model, name, None))
        and not name.startswith("_")
    ]
    if own_methods:
        print(color("     Методы: ", "1;34") + ", ".join(own_methods))


# ---------- главный вывод ----------
def dump_all(app_filter: str | None, local_only: bool) -> None:
    from django.apps import apps
    from django.conf import settings

    models = list(apps.get_models(
        include_auto_created=False,
        include_swapped=False,
    ))

    # Только локальные приложения (те, что в INSTALLED_APPS)
    if local_only:
        local_labels = set()
        for entry in settings.INSTALLED_APPS:
            if entry.startswith("django."):
                continue
            label = entry.split(".")[-1]
            local_labels.add(label)
        models = [m for m in models if m._meta.app_label in local_labels]

    if app_filter:
        models = [m for m in models if m._meta.app_label == app_filter]

    if not models:
        print("Модели не найдены.")
        return

    by_app: dict[str, list] = {}
    for m in models:
        by_app.setdefault(m._meta.app_label, []).append(m)

    print()
    print(color("=" * 78, "1;36"))
    print(color(
        f"  МОДЕЛЕЙ: {len(models)}  |  ПРИЛОЖЕНИЙ: {len(by_app)}",
        "1;36",
    ))
    print(color("=" * 78, "1;36"))

    for app_label in sorted(by_app):
        try:
            app_config = apps.get_app_config(app_label)
            verbose = app_config.verbose_name
        except LookupError:
            verbose = ""

        print()
        print(color(f"📦 {app_label}", "1;33")
              + (color(f"  ({verbose})", "90") if verbose else ""))
        print(color("-" * 78, "33"))

        for m in sorted(by_app[app_label], key=lambda x: x.__name__):
            print_model(m)

    total_fields = sum(len(list(m._meta.get_fields())) for m in models)
    relations = sum(
        1 for m in models
        for f in m._meta.get_fields()
        if f.is_relation
    )

    print()
    print(color("=" * 78, "1;36"))
    print(color(
        f"  ИТОГО: моделей — {len(models)}, полей — {total_fields}, "
        f"связей — {relations}",
        "1;36",
    ))
    print(color("=" * 78, "1;36"))
    print()


# ---------- точка входа ----------
def main():
    parser = argparse.ArgumentParser(
        description="Печатает все модели Django-проекта в консоль."
    )
    parser.add_argument(
        "project_path",
        help="Путь к корню Django-проекта (там, где manage.py)",
    )
    parser.add_argument(
        "--app",
        help="Показать только одно приложение",
    )
    parser.add_argument(
        "--local-only",
        action="store_true",
        help="Только модели из локальных приложений (не django.*)",
    )
    args = parser.parse_args()

    setup_django(Path(args.project_path))
    dump_all(app_filter=args.app, local_only=args.local_only)


if __name__ == "__main__":
    main()

