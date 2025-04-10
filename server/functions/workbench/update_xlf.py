import xml.etree.ElementTree as ET
from xml.etree.ElementTree import fromstring

ET.register_namespace('', "urn:oasis:names:tc:xliff:document:1.2")
ET.register_namespace('okp', "okapi-framework:xliff-extensions")
ET.register_namespace('its', "http://www.w3.org/2005/11/its")
ET.register_namespace('itsxlf', "http://www.w3.org/ns/its-xliff/")

ns = {'x': 'urn:oasis:names:tc:xliff:document:1.2'}

def update_xlf(file_path: str, new_targets: list[str]):
    tree = ET.parse(file_path)
    root = tree.getroot()
    trans_units = root.findall('.//x:trans-unit', ns)

    target_idx = 0
    for tu in trans_units:
        target = tu.find('x:target', ns)
        if target is None:
            continue
        for mrk in target.findall('.//x:mrk', ns):
            if target_idx >= len(new_targets):
                break

            # Clear old content
            for child in list(mrk):
                mrk.remove(child)
            mrk.text = None

            # Parse the new content as XML fragment
            try:
                fragment = f"<wrapper>{new_targets[target_idx]}</wrapper>"
                fragment_elem = fromstring(fragment)
                mrk.text = fragment_elem.text  # text before first tag
                for child in fragment_elem:
                    mrk.append(child)
            except Exception as e:
                print(f"Error parsing target {target_idx}: {e}")

            target_idx += 1

    tree.write(file_path, encoding='utf-8', xml_declaration=True)
