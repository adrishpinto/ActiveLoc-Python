import xml.etree.ElementTree as ET

def xliff_to_arrays(file_path):
    tree = ET.parse(file_path)
    root = tree.getroot()

    namespace = {'xliff': 'urn:oasis:names:tc:xliff:document:1.2'} 
    source_texts = []
    target_texts = []

    for trans_unit in root.findall(".//xliff:trans-unit", namespace):
        source = trans_unit.find("xliff:source", namespace)
        target = trans_unit.find("xliff:target", namespace)

        if source is not None:
            source_texts.append(source.text)
        else:
            source_texts.append("")

        if target is not None:
            target_texts.append(target.text)
        else:
            target_texts.append("")

    return source_texts, target_texts

# Usage
source_array, target_array = xliff_to_arrays("./output.xliff")
print("Source:", source_array)
print("Target:", target_array)
