import re

def extract_sentences_from_srt(file_path):
    sentences = []
    
    with open(file_path, "r", encoding="utf-8") as file:
        lines = file.readlines()
    
    for line in lines:
        line = line.strip()
        
        # Ignore line numbers
        if re.match(r'^\d+$', line):
            continue
        
        # Ignore timestamps
        if "-->" in line:
            continue
        
        # Ignore empty lines
        if line:
            sentences.append(line)
    
    return sentences

# Example usage
file_path = "./output.txt"  # Replace with your actual file path
sentences = extract_sentences_from_srt(file_path)
print(sentences)
