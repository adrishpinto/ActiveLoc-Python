import xml.etree.ElementTree as ET
import xml.dom.minidom

def android_to_xliff(input_file: str, output_file: str) -> None:
    try:
        tree = ET.parse(input_file)
        root = tree.getroot()
        
        xliff = ET.Element('xliff', {'version': '1.2'})
        file_elem = ET.SubElement(xliff, 'file', {
            'source-language': 'en',
            'datatype': 'plaintext',
            'original': 'strings'
        })
        body = ET.SubElement(file_elem, 'body')
        
        for elem in root:
            if elem.tag == 'string':
                trans_unit = ET.SubElement(body, 'trans-unit', {'id': elem.get('name')})
                source = ET.SubElement(trans_unit, 'source')
                source.text = elem.text or ""
                
                if elem.get('translation_description'):
                    note = ET.SubElement(trans_unit, 'note')
                    note.text = elem.get('translation_description')
                    
                if elem.get('translatable'):
                    trans_unit.set('translate', elem.get('translatable'))
                    
            elif elem.tag == 'plurals':
                trans_unit = ET.SubElement(body, 'trans-unit', {'id': elem.get('name')})
                source = ET.SubElement(trans_unit, 'source')
                
                for item in elem:
                    item_source = ET.SubElement(source, 'item', {'quantity': item.get('quantity')})
                    item_source.text = item.text
                    
                if elem.find('item').get('translation_description'):
                    note = ET.SubElement(trans_unit, 'note')
                    note.text = elem.find('item').get('translation_description')
                    
            elif elem.tag == 'string-array':
                trans_unit = ET.SubElement(body, 'trans-unit', {'id': elem.get('name')})
                source = ET.SubElement(trans_unit, 'source')
                
                for item in elem:
                    item_source = ET.SubElement(source, 'item')
                    item_source.text = item.text
        
        output_tree = ET.ElementTree(xliff)
        
        with open(output_file, 'wb') as f:
            f.write(b'<?xml version="1.0" encoding="utf-8"?>\n')
            output_tree.write(f, encoding='utf-8', xml_declaration=False)
        
        with open(output_file, 'r', encoding='utf-8') as f:
            xml_content = f.read()
        
        dom = xml.dom.minidom.parseString(xml_content)
        pretty_xml = dom.toprettyxml(indent='  ')
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(pretty_xml)
        
        print(f"Successfully converted {input_file} to {output_file}")
    except Exception as e:
        print(f"Error during conversion: {str(e)}")

if __name__ == "__main__":
    android_to_xliff('./output/test.xml', './output/output.xlf')
