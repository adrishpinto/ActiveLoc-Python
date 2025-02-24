import subprocess
import os
import sys

def docx_to_odt(docx_file_path):
    if not os.path.exists(docx_file_path):
        print(f"Error: The file {docx_file_path} does not exist.")
        sys.exit(1)

    odt_file_path = os.path.splitext(docx_file_path)[0] + ".odt"

    libreoffice_path = r"C:\Program Files\LibreOffice\program\soffice.exe"
    
    command = [
        libreoffice_path, "--headless", "--convert-to", "odt", docx_file_path, "--outdir", os.path.dirname(docx_file_path)
    ]

    try:
        subprocess.run(command, check=True)
        print(f"DOCX to ODT conversion successful. File saved at {odt_file_path}")
        return odt_file_path
    except subprocess.CalledProcessError as e:
        print(f"Error converting DOCX to ODT: {e}")
        sys.exit(1)

def odf_to_xliff(original_odf, xliff_output):
    if not os.path.exists(original_odf):
        print(f"Error: The file {original_odf} does not exist.")
        sys.exit(1)

    try:
        print(f"Converting {original_odf} to {xliff_output}...")
        subprocess.run(
            ["odf2xliff", original_odf, xliff_output],
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        print(f"Successfully created XLIFF file: {xliff_output}")
    except subprocess.CalledProcessError as e:
        print(f"Error during ODF to XLIFF conversion: {e.stderr.decode()}")
        sys.exit(1)

if __name__ == "__main__":
    docx_file = "./output/test.docx"
    xliff_file = "./output/custom.xlf"

    odt_file = docx_to_odt(docx_file)
    odf_to_xliff(odt_file, xliff_file)
