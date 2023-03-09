from logging import getLogger

from hetdesrun.adapters.blob_storage.models import (
    BlobStorageStructureSource,
    ObjectKey,
    get_adapter_structure,
)
from hetdesrun.adapters.blob_storage.service import get_object_key_strings_in_bucket

logger = getLogger(__name__)


async def create_sources() -> list[BlobStorageStructureSource]:
    """Create sources from buckets and object keys.

    A MissingHierarchyError raised from get_adapter_structure may or an AdapterConnectionError
    raised from get_object_key_strings_in_bucket may occur.
    """
    thing_nodes = get_adapter_structure().thing_nodes
    buckets = get_adapter_structure().structure_buckets
    source_list: list[BlobStorageStructureSource] = []
    for bucket in buckets:
        object_key_strings = await get_object_key_strings_in_bucket(bucket.name)
        for object_key_string in object_key_strings:
            try:
                object_key = ObjectKey.from_string(object_key_string)
            except ValueError:
                # ignore objects with keys that do not match the expected name scheme
                continue

            # ignore objects that do not match the configured hierarchy
            thing_node_id = object_key.to_thing_node_id(bucket)
            if len([tn for tn in thing_nodes if tn.id == thing_node_id]) == 0:
                continue
            source = BlobStorageStructureSource.from_structure_bucket_and_object_key(
                bucket=bucket, object_key=object_key
            )
            source_list.append(source)
            logger.debug("Created source:\n%s", source)

    return source_list
