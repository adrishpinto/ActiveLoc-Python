import xml.etree.ElementTree as ET
import re

def string_to_xliff(strings_file):
    """Parses the .strings file and returns a list of key-value pairs with comments"""
    key_value_pairs = []
    comment = None

    with open(strings_file, 'r', encoding='utf-8') as file:
        for line in file:
            
            line = line.strip()
            if not line:
                continue

            
            comment_match = re.match(r'\s*/\*([\s\S]*?)\*/\s*', line)
            if comment_match:
                comment = comment_match.group(1).strip()
                continue
            
           
            match = re.match(r'\"(.*?)\"\s*=\s*\"(.*?)\";', line)
            if match:
                key = match.group(1)
                value = match.group(2)
                key_value_pairs.append((key, value, comment))
                comment = None  
    return key_value_pairs

def create_xliff(key_value_pairs, output_file):
    """Creates an XLIFF file from key-value pairs with comments"""
    
    
    xliff = ET.Element('xliff', xmlns="urn:oasis:names:tc:xliff:document:1.2", version="1.2")
    file = ET.SubElement(xliff, 'file', {'source-language': 'en', 'target-language': 'fr'})
    body = ET.SubElement(file, 'body')

    
    for key, value, comment in key_value_pairs:
        if comment:
            trans_unit_id = f"{key}_{comment}"
        else:
            trans_unit_id = key

        trans_unit = ET.SubElement(body, 'trans-unit', id=trans_unit_id)
        source = ET.SubElement(trans_unit, 'source')
        source.text = value
        target = ET.SubElement(trans_unit, 'target')
        target.text = ""  
        

    
    tree = ET.ElementTree(xliff)
    tree.write(output_file, encoding='utf-8', xml_declaration=True)


strings_file = 'output/test.strings' 
output_file = 'output/output.xliff'         

key_value_pairs = string_to_xliff(strings_file)
create_xliff(key_value_pairs, output_file)
