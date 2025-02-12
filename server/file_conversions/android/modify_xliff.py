from lxml import etree

tree = etree.parse('output/xliff.xlf')
root = tree.getroot()

namespace = {'xliff': 'urn:oasis:names:tc:xliff:document:1.1'}

for trans_unit in root.findall('.//xliff:trans-unit', namespace):
    source_element = trans_unit.find('xliff:source', namespace)
    target_element = trans_unit.find('xliff:target', namespace)
    
    if source_element is not None and target_element is not None:
        trans_unit.remove(target_element)

tree.write('output/modified_file.xlf', encoding='UTF-8', xml_declaration=True, pretty_print=True)
