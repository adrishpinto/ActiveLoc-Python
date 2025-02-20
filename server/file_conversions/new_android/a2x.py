import xml.etree.ElementTree as ET
from typing import List, Dict

def convert_android_to_xliff(input_file: str, output_file: str) -> None:
    """
    Convert Android strings.xml file to XLIFF format without target elements.
    
    Args:
        input_file (str): Path to input Android strings.xml file
        output_file (str): Path to output XLIFF file
    """
    # Parse the Android strings file
    tree = ET.parse(input_file)
    root = tree.getroot()
    
    # Create the XLIFF structure
    xliff = ET.Element('xliff', {'version': '1.2'})
    file_elem = ET.SubElement(xliff, 'file', {
        'source-language': 'en',
        'datatype': 'plaintext',
        'original': 'strings'
    })
    body = ET.SubElement(file_elem, 'body')
    
    # Process each element in the Android strings file
    for elem in root:
        if elem.tag == 'string':
            # Handle regular strings
            trans_unit = ET.SubElement(body, 'trans-unit', {'id': elem.get('name')})
            
            source = ET.SubElement(trans_unit, 'source')
            source.text = elem.text or ""
            
            # Add translation description if exists
            if elem.get('translation_description'):
                note = ET.SubElement(trans_unit, 'note')
                note.text = elem.get('translation_description')
                
            # Add translatable attribute if exists
            if elem.get('translatable'):
                trans_unit.set('translate', elem.get('translatable'))
                
        elif elem.tag == 'plurals':
            # Handle plural strings
            trans_unit = ET.SubElement(body, 'trans-unit', {'id': elem.get('name')})
            
            source = ET.SubElement(trans_unit, 'source')
            
            for item in elem:
                item_source = ET.SubElement(source, 'item', {'quantity': item.get('quantity')})
                item_source.text = item.text
                
            if elem.find('item').get('translation_description'):
                note = ET.SubElement(trans_unit, 'note')
                note.text = elem.find('item').get('translation_description')
                
        elif elem.tag == 'string-array':
            # Handle string arrays
            trans_unit = ET.SubElement(body, 'trans-unit', {'id': elem.get('name')})
            
            source = ET.SubElement(trans_unit, 'source')
            
            for item in elem:
                item_source = ET.SubElement(source, 'item')
                item_source.text = item.text
    
    # Create the output XML file
    output_tree = ET.ElementTree(xliff)
    
    # Add XML declaration and write to file
    with open(output_file, 'wb') as f:
        f.write(b'<?xml version="1.0" encoding="utf-8"?>\n')
        output_tree.write(f, encoding='utf-8', xml_declaration=False)

def format_xml_file(filename: str) -> None:
    """
    Format the XML file with proper indentation and line breaks.
    
    Args:
        filename (str): Path to the XML file to format
    """
    import xml.dom.minidom
    
    # Read the file
    with open(filename, 'r', encoding='utf-8') as f:
        xml_content = f.read()
    
    # Parse and format
    dom = xml.dom.minidom.parseString(xml_content)
    pretty_xml = dom.toprettyxml(indent='  ')
    
    # Write back to file
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(pretty_xml)

def main():
    input_file = './output/test.xml'
    output_file = './output/output.xlf'
    try:
        convert_android_to_xliff(input_file, output_file)
        
        
        format_xml_file(output_file)
        
        print(f"Successfully converted {input_file} to {output_file}")
    except Exception as e:
        print(f"Error during conversion: {str(e)}")

if __name__ == "__main__":
    main()