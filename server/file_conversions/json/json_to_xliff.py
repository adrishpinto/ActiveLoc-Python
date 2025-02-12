import subprocess
import os

def json_to_po(json_file_path, po_file_path):
    command = ['json2po', json_file_path, po_file_path]
    try:
        subprocess.run(command, check=True)
        print(f"success converted {json_file_path} to {po_file_path}")
    except subprocess.CalledProcessError as e:
        print(f"Error while converting {json_file_path} to {po_file_path}: {e}")
    
def po_to_xliff(po_file_path, xliff_file_path):
    
    command = ['po2xliff', po_file_path, xliff_file_path]
    try:
        subprocess.run(command, check=True)
        print(f"success converted {po_file_path} to {xliff_file_path}")
    except subprocess.CalledProcessError as e:
        print(f"Error while converting {po_file_path} to {xliff_file_path}: {e}")

def main():
    
    json_file = './output/intial.json'  
    po_file = './output/output.po' 
    xliff_file = './output/output.xliff' 
    
   
    json_to_po(json_file, po_file)
    
    
    po_to_xliff(po_file, xliff_file)

if __name__ == "__main__":
    main()
