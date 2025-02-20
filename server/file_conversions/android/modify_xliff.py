from lxml import etree

tree = etree.parse('./output/intial.xlf')

# Loop through each 'trans-unit' element
for trans_unit in tree.xpath('//xliff:trans-unit', namespaces={'xliff': 'urn:oasis:names:tc:xliff:document:1.1'}):
    # Get the source and target elements
    source = trans_unit.find('xliff:source', namespaces={'xliff': 'urn:oasis:names:tc:xliff:document:1.1'})
    target = trans_unit.find('xliff:target', namespaces={'xliff': 'urn:oasis:names:tc:xliff:document:1.1'})

    # If both source and target exist, replace target's content with source's content and empty the target
    if source is not None and target is not None:
        source.text = target.text  # Replace source with target's text
        target.text = ""  # Empty the target content

# Write the modified XML to a new file
tree.write('./output/intial_modified_file.xlf', pretty_print=True, xml_declaration=True, encoding="UTF-8")
