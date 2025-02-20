import subprocess

def andriod_to_xliff(src, xliff_file):
    try:
        po_file = './output/temp.po'
        subprocess.run(['flatxml2po', src, po_file], check=True)
        print(f"Successfully converted {src} to {po_file}")
        
        subprocess.run(['po2xliff', po_file, xliff_file], check=True)
        print(f"Successfully converted {po_file} to {xliff_file}")
        
        print(f"Successfully converted {src} to {xliff_file}")
    except subprocess.CalledProcessError as e:
        print(f"Error during conversion: {e}")
    except FileNotFoundError as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    src = './output/intial.xml' 
    xliff_file = './output/intial.xlf'
    andriod_to_xliff(src, xliff_file)