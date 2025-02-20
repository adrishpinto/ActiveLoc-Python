import xml.etree.ElementTree as ET
from typing import List, Dict

def convert_xliff_target_to_android(input_file: str, output_file: str) -> None:
    """
    Convert XLIFF file to Android strings.xml format using target content.
    
    Args:
        input_file (str): Path to input XLIFF file
        output_file (str): Path to output Android strings.xml file
    """
    # Parse the XLIFF file
    tree = ET.parse(input_file)
    root = tree.getroot()
    
    # Create the output XML structure
    android_root = ET.Element('resources')
    
    # Find all trans-unit elements
    for trans_unit in root.findall('.//trans-unit'):
        unit_id = trans_unit.get('id')
        target = trans_unit.find('target')
        
        if target is None:
            print(f"Warning: No target found for {unit_id}, skipping...")
            continue
            
        # Check if this is a plurals element (by checking first item for quantity attribute)
        first_item = target.find('item')
        if first_item is not None and 'quantity' in first_item.attrib:
            plurals_elem = ET.SubElement(android_root, 'plurals', name=unit_id)
            for item in target.findall('item'):
                item_elem = ET.SubElement(plurals_elem, 'item', quantity=item.get('quantity'))
                item_elem.text = item.text
                
                # Get translation description from note if exists
                note = trans_unit.find('note')
                if note is not None and note.text:
                    item_elem.set('translation_description', note.text)
                    
        # Check if this is a string array (items without quantity attribute)
        elif target.findall('item'):
            array_elem = ET.SubElement(android_root, 'string-array', name=unit_id)
            for item in target.findall('item'):
                item_elem = ET.SubElement(array_elem, 'item')
                item_elem.text = item.text
                
        # Regular string
        else:
            string_elem = ET.SubElement(android_root, 'string', name=unit_id)
            
            # Check if string is non-translatable
            if trans_unit.get('translate') == 'false':
                string_elem.set('translatable', 'false')
                
            string_elem.text = target.text if target.text is not None else ""
            
            # Get translation description from note if exists
            note = trans_unit.find('note')
            if note is not None and note.text:
                string_elem.set('translation_description', note.text)
    
    # Create the output XML file
    output_tree = ET.ElementTree(android_root)
    
    # Add XML declaration and write to file
    with open(output_file, 'wb') as f:
        f.write(b'<?xml version="1.0" encoding="utf-8"?>\n')
        output_tree.write(f, encoding='utf-8', xml_declaration=False)

def format_xml_file(filename: str) -> None:
    """
    Format the XML file with proper indentation and line breaks.
    Also adds the standard Android copyright header.
    
    Args:
        filename (str): Path to the XML file to format
    """
    import xml.dom.minidom
    
    # Read the file
    with open(filename, 'r', encoding='utf-8') as f:
        xml_content = f.read()
    
    # Parse and format
    dom = xml.dom.minidom.parseString(xml_content)
    pretty_xml = dom.toprettyxml(indent='    ')
    
    # Add copyright header
   
    
    # Write back to file with header
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(pretty_xml)

def main():
    # Example usage
    input_file = './output/azure.xlf'
    output_file = './output/final.xml'
    
    try:
        # Convert XLIFF targets to Android format
        convert_xliff_target_to_android(input_file, output_file)
        
        # Format the output file
        format_xml_file(output_file)
        
        print(f"Successfully converted {input_file} to {output_file}")
    except Exception as e:
        print(f"Error during conversion: {str(e)}")

if __name__ == "__main__":
    main()