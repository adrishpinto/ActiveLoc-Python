import subprocess

def xliff_to_po(xliff_file_path, po_file_path):
    command = ['xliff2po', xliff_file_path, po_file_path]
    try:
        subprocess.run(command, check=True)
        print(f"Successfully converted {xliff_file_path} to {po_file_path}")
    except subprocess.CalledProcessError as e:
        print(f"Error while converting {xliff_file_path} to {po_file_path}: {e}")

def po_to_json(po_file_path, json_file_path):
    command = ['po2json', po_file_path, json_file_path]
    try:
        subprocess.run(command, check=True)
        print(f"Successfully converted {po_file_path} to {json_file_path}")
    except subprocess.CalledProcessError as e:
        print(f"Error while converting {po_file_path} to {json_file_path}: {e}")

def main():
    xliff_file = './output/input.xliff'  
    po_file = './output/output.po' 
    json_file = './output/output.json' 

    xliff_to_po(xliff_file, po_file)
    po_to_json(po_file, json_file)

if __name__ == "__main__":
    main()
