import xml.etree.ElementTree as ET

def xliff_to_strings(xliff_file, output_file):
    
    tree = ET.parse(xliff_file)
    root = tree.getroot()

    namespace = {'xliff': 'urn:oasis:names:tc:xliff:document:1.2'}

 
    with open(output_file, 'w', encoding='utf-8') as f:
        
        for trans_unit in root.findall(".//xliff:trans-unit", namespace):
           
            trans_unit_id = trans_unit.get('id')
            target = trans_unit.find('xliff:target', namespace).text
            
            if trans_unit_id:
                
                if target is not None: 
                    target = target.strip()

              
                if '_' in trans_unit_id:
                    key, comment = trans_unit_id.split('_', 1)
                    f.write(f'/*{comment}*/\n')
                    f.write(f'"{key}" = "{target}";\n')
                else:
                    f.write(f'"{trans_unit_id}" = "{target}";\n')
                    f.write(f'\n')


xliff_to_strings('./output/output1.xliff', './output/Localization.strings')
