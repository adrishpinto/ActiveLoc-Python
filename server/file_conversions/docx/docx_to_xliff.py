import subprocess
import os
import sys

def docx_to_xliff(docx_file_path, xliff_output):
    if not os.path.exists(docx_file_path):
        print(f"Error: The file {docx_file_path} does not exist.")
        sys.exit(1)
    
    odt_file_path = os.path.splitext(docx_file_path)[0] + ".odt"
    libreoffice_path = r"C:\Program Files\LibreOffice\program\soffice.exe"
    
    # Convert DOCX to ODT
    try:
        subprocess.run([
            libreoffice_path, "--headless", "--convert-to", "odt", docx_file_path,
            "--outdir", os.path.dirname(docx_file_path)
        ], check=True)
        print(f"DOCX to ODT conversion successful. File saved at {odt_file_path}")
    except subprocess.CalledProcessError as e:
        print(f"Error converting DOCX to ODT: {e}")
        sys.exit(1)
    
    # Convert ODT to XLIFF
    try:
        print(f"Converting {odt_file_path} to {xliff_output}...")
        subprocess.run(["odf2xliff", odt_file_path, xliff_output], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        print(f"Successfully created XLIFF file: {xliff_output}")
    except subprocess.CalledProcessError as e:
        print(f"Error during ODF to XLIFF conversion: {e.stderr.decode()}")
        sys.exit(1)

if __name__ == "__main__":
    docx_to_xliff("./output/test.docx", "./output/custom.xlf")