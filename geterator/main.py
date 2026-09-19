import path_list
from pathlib import Path

def render_template(
    template_file_path: str | Path,
    entity: str,
    entity_endpoint: str,
) -> Path:
    src = Path(template_file_path)

    content = src.read_text(encoding="utf-8")
    content = content.replace("entity_endpoint", entity_endpoint)
    content = content.replace("entity", entity)

    dest = Path(str(src).replace("entity", entity))

    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(content, encoding="utf-8")

    return dest


entity = 'nomenclature'
entity_endpoint = 'supplies/nomenclatures/'

render_template(path_list.api_path, entity, entity_endpoint)
render_template(path_list.store_path, entity, entity_endpoint)
render_template(path_list.schemas_path, entity, entity_endpoint)
render_template(path_list.main_view_path, entity, entity_endpoint)
render_template(path_list.form_path, entity, entity_endpoint)
render_template(path_list.table_path, entity, entity_endpoint)

