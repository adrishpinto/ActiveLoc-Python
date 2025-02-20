import xml.etree.ElementTree as ET
import xml.dom.minidom

def xliff_to_android(input_file: str, output_file: str) -> None:
    """
    Convert XLIFF file to Android strings.xml format using target content.
    If target is missing, it falls back to source.
    Formats the output file with proper indentation.
    """
    try:
        tree = ET.parse(input_file)
        root = tree.getroot()
        android_root = ET.Element('resources')

        for trans_unit in root.findall('.//trans-unit'):
            unit_id = trans_unit.get('id')
            target = trans_unit.find('target')
            source = trans_unit.find('source')

            # Use target if available; otherwise, fallback to source
            text_content = target.text if target is not None and target.text else (source.text if source is not None else "")

            first_item = target.find('item') if target is not None else None
            if first_item is not None and 'quantity' in first_item.attrib:
                plurals_elem = ET.SubElement(android_root, 'plurals', name=unit_id)
                for item in target.findall('item') if target is not None else source.findall('item'):
                    item_elem = ET.SubElement(plurals_elem, 'item', quantity=item.get('quantity'))
                    item_elem.text = item.text
                    note = trans_unit.find('note')
                    if note is not None and note.text:
                        item_elem.set('translation_description', note.text)

            elif (target.findall('item') if target is not None else source.findall('item')):
                array_elem = ET.SubElement(android_root, 'string-array', name=unit_id)
                for item in target.findall('item') if target is not None else source.findall('item'):
                    item_elem = ET.SubElement(array_elem, 'item')
                    item_elem.text = item.text

            else:
                string_elem = ET.SubElement(android_root, 'string', name=unit_id)
                if trans_unit.get('translate') == 'false':
                    string_elem.set('translatable', 'false')
                string_elem.text = text_content
                note = trans_unit.find('note')
                if note is not None and note.text:
                    string_elem.set('translation_description', note.text)

        output_tree = ET.ElementTree(android_root)
        with open(output_file, 'wb') as f:
            f.write(b'<?xml version="1.0" encoding="utf-8"?>\n')
            output_tree.write(f, encoding='utf-8', xml_declaration=False)

        # Format XML
        with open(output_file, 'r', encoding='utf-8') as f:
            xml_content = f.read()
        pretty_xml = xml.dom.minidom.parseString(xml_content).toprettyxml(indent='    ')
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(pretty_xml)

        print(f"Successfully converted {input_file} to {output_file}")

    except Exception as e:
        print(f"Error during conversion: {str(e)}")

if __name__ == "__main__":
    input_file = './output/azure.xlf'
    output_file = './output/final.xml'
    xliff_to_android(input_file, output_file)
