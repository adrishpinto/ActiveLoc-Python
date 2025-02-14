import subprocess

def html_to_xliff(html_src, xliff_file):
    try:
        po_file = './all_files/converted/temp.po'
        subprocess.run(['html2po', html_src, po_file], check=True)
        print(f"Successfully converted {html_src} to {po_file}")
        
        subprocess.run(['po2xliff', po_file, xliff_file], check=True)
        print(f"Successfully converted {po_file} to {xliff_file}")
        
        print(f"Successfully converted {html_src} to {xliff_file}")
    except subprocess.CalledProcessError as e:
        print(f"Error during conversion: {e}")
    except FileNotFoundError as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    html_src = './test.html' 
    xliff_file = './aaa.xlf'
    html_to_xliff(html_src, xliff_file)