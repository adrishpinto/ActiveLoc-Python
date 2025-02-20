import subprocess

def xliff_to_android(src, xliff_file):
    try:
        template = './output/intial.xml'
        po_file = './output/final.po'
        subprocess.run(['xliff2po', src, po_file], check=True)
        print(f"Successfully converted {src} to {po_file}")
        
        # Corrected the placement of '-t' argument
        subprocess.run(['po2flatxml', po_file, xliff_file, '-t', template], check=True)
        print(f"Successfully converted {po_file} to {xliff_file}")
        
        print(f"Successfully converted {src} to {xliff_file}")
    except subprocess.CalledProcessError as e:
        print(f"Error during conversion: {e}")
    except FileNotFoundError as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    src = './output/azure.xlf' 
    xliff_file = './output/final.xml'
    xliff_to_android(src, xliff_file)
