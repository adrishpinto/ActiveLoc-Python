from lxml import etree

# Parse both XLF files
azure_tree = etree.parse('./output/azure.xlf')
initial_tree = etree.parse('./output/intial.xlf')

# Get all target elements from azure.xlf
azure_targets = azure_tree.xpath('//xliff:target', namespaces={'xliff': 'urn:oasis:names:tc:xliff:document:1.1'})

# Get all target elements from initial.xlf
initial_targets = initial_tree.xpath('//xliff:target', namespaces={'xliff': 'urn:oasis:names:tc:xliff:document:1.1'})

# Ensure the number of targets is the same in both files
if len(azure_targets) == len(initial_targets):
    # Replace target.text in initial.xlf with corresponding target.text from azure.xlf
    for azure_target, initial_target in zip(azure_targets, initial_targets):
        initial_target.text = azure_target.text

    # Save the modified initial.xlf
    initial_tree.write('./output/final_modified_file.xliff', pretty_print=True, xml_declaration=True, encoding="UTF-8")
else:
    print("Error: The number of target elements in both files do not match.")
