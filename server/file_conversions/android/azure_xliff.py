from lxml import etree

tree = etree.parse('./output/azure.xlf')

for target in tree.xpath('//xliff:target', namespaces={'xliff': 'urn:oasis:names:tc:xliff:document:1.1'}):
    target.text = "test"

tree.write('./output/azure_modified_file.xliff', pretty_print=True, xml_declaration=True, encoding="UTF-8")


