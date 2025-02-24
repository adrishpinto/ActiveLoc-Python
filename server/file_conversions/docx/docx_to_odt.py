import subprocess
import os

def docx_to_odt(docx_file_path, odt_file_path):
    
    if not os.path.exists(docx_file_path):
        print(f"Error: The file {docx_file_path} does not exist.")
        return
    
    
    libreoffice_path = r"C:\Program Files\LibreOffice\program\soffice.exe"
    
   
    command = [
        libreoffice_path, "--headless", "--convert-to", "odt", docx_file_path, "--outdir", os.path.dirname(odt_file_path)
    ]
    
    
    subprocess.run(command, check=True)
    print(f"Conversion successful! File saved at {odt_file_path}")

if __name__ == "__main__":
   docx_file = "./output/test.docx"
   odt_file = "./output/step1.odt"
   docx_to_odt(docx_file, odt_file)
