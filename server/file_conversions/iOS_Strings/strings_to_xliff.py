import xml.etree.ElementTree as ET
import re

def string_to_xliff(strings_file, output_file):
    """Parses a .strings file and creates an XLIFF file from it."""
    
    key_value_pairs = []
    comment = None

    # Parsing the .strings file to get key-value pairs with comments
    with open(strings_file, 'r', encoding='utf-8') as file:
        for line in file:
            line = line.strip()
            if not line:
                continue

            # Check for comments
            comment_match = re.match(r'\s*/\*([\s\S]*?)\*/\s*', line)
            if comment_match:
                comment = comment_match.group(1).strip()
                continue

            # Check for key-value pairs
            match = re.match(r'\"(.*?)\"\s*=\s*\"(.*?)\";', line)
            if match:
                key = match.group(1)
                value = match.group(2)
                key_value_pairs.append((key, value, comment))
                comment = None  # Reset comment after adding the pair

    # Create the XLIFF file from key-value pairs
    xliff = ET.Element('xliff', xmlns="urn:oasis:names:tc:xliff:document:1.2", version="1.2")
    file = ET.SubElement(xliff, 'file', {'source-language': 'en', 'target-language': 'fr'})
    body = ET.SubElement(file, 'body')

    # Add translation units for each key-value pair
    for key, value, comment in key_value_pairs:
        if comment:
            trans_unit_id = f"{key}_{comment}"
        else:
            trans_unit_id = key

        trans_unit = ET.SubElement(body, 'trans-unit', id=trans_unit_id)
        source = ET.SubElement(trans_unit, 'source')
        source.text = value
        target = ET.SubElement(trans_unit, 'target')
        target.text = ""  # Empty target for translation

    # Write the XLIFF tree to the output file
    tree = ET.ElementTree(xliff)
    tree.write(output_file, encoding='utf-8', xml_declaration=True)

if __name__ == "__main__":
    strings_file = 'output/test.strings'
    output_file = 'output/xicnin.xliff'

    string_to_xliff(strings_file, output_file)
    print(f"XLIFF file has been created at {output_file}")
