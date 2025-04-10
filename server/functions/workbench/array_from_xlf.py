import xml.etree.ElementTree as ET
import re

def get_inner_xml(elem):
    return ''.join(
        ET.tostring(child, encoding="unicode", method="xml")
        for child in elem
    ) or (elem.text or '')


def remove_namespace_prefix(xml_string):
    xml_string = re.sub(r'<(/?)(ns\d+:)', r'<\1', xml_string)
    xml_string = re.sub(r'\sxmlns(:ns\d+)?="[^"]+"', '', xml_string)
    return xml_string

def extract_xlf(file_path):
    tree = ET.parse(file_path)
    root = tree.getroot()

    ns = {
        "x": "urn:oasis:names:tc:xliff:document:1.2"
    }

    sources = []
    targets = []

    for unit in root.findall(".//x:trans-unit", ns):
        seg_source = unit.find("x:seg-source", ns)
        target_elem = unit.find("x:target", ns)

        if seg_source is not None and target_elem is not None:
            source_mrks = seg_source.findall("x:mrk", ns)
            target_mrks = target_elem.findall("x:mrk", ns)

            for src_mrk, tgt_mrk in zip(source_mrks, target_mrks):
                src_inner = remove_namespace_prefix(get_inner_xml(src_mrk))
                tgt_inner = remove_namespace_prefix(get_inner_xml(tgt_mrk))
                sources.append(src_inner)
                targets.append(tgt_inner)
                print(f"Source: {src_inner}")
                print(f"Target: {tgt_inner}")
                print("-----")

    return sources, targets

if __name__ == "__main__":
    extract_xlf("./test.xlf")
