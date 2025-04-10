import re

def decode(sources):
    converted = []
    for s in sources:
       
        s = re.sub(r'<bpt id="(\d+)">&lt;(.*?)&gt;</bpt>', r'<bpt id="\1"><\2></bpt>', s)
        
        s = re.sub(r'<ept id="(\d+)">&lt;/(.*?)&gt;</ept>', r'<ept id="\1"></\2>;</ept>', s)
        converted.append(s)
    return converted
