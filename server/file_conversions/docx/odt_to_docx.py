import subprocess
import os

def odt_to_docx(odt_file_path, docx_file_path):
    
    if not os.path.exists(odt_file_path):
        print(f"Error: The file {odt_file_path} does not exist.")
        return
    
    libreoffice_path = r"C:\Program Files\LibreOffice\program\soffice.exe"
    
    command = [
        libreoffice_path, "--headless", "--convert-to", "docx", odt_file_path, "--outdir", os.path.dirname(docx_file_path)
    ]
    
    subprocess.run(command, check=True)
    print(f"Conversion successful! File saved at {docx_file_path}")


odt_file = "./output/res.odt"
docx_file = "./output/final.docx"
odt_to_docx(odt_file, docx_file)
