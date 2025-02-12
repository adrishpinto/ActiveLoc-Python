import subprocess

def convert_html_to_po(html_src, po_file):
    try:
        subprocess.run(['html2po', html_src, po_file], check=True)
        print(f"Successfully converted {html_src} to {po_file}")
    except subprocess.CalledProcessError as e:
        print(f"Error during conversion: {e}")
    except FileNotFoundError:
        print("Error: html2po command not found. Please make sure it's installed and in your PATH.")


def convert_po_to_xliff(po_file, xliff_file):
    try:
        subprocess.run(['po2xliff', po_file, xliff_file], check=True)
        print(f"Successfully converted {po_file} to {xliff_file}")
    except subprocess.CalledProcessError as e:
        print(f"Error during conversion: {e}")
    except FileNotFoundError:
        print("Error: po2xliff command not found. Please make sure it's installed and in your PATH.")


def convert_html_to_xliff(html_src, xliff_file):
    try:
        
        po_file = '/output/temp.po'
        convert_html_to_po(html_src, po_file)
        
       
        convert_po_to_xliff(po_file, xliff_file)
        
        print(f"Successfully converted {html_src} to {xliff_file}")
    except Exception as e:
        print(f"Error during conversion: {e}")



html_src = './output/test.html' 
xliff_file = './output/test.xliff'


convert_html_to_xliff(html_src, xliff_file)
