import subprocess

def android2xliff(input_file, po_file, xliff_file, target_file=None):
    android2po_command = ["android2po", "-i", input_file, "-o", po_file]
    
    if target_file:
        android2po_command = ["android2po", "-t", input_file, "-i", target_file, "-o", po_file]
    
    try:
        subprocess.run(android2po_command, check=True)
        print(f"Android to PO conversion successful! Output file: {po_file}")
        
        po2xliff_command = ["po2xliff", po_file, xliff_file]
        subprocess.run(po2xliff_command, check=True)
        print(f"PO to XLIFF conversion successful! Output file: {xliff_file}")
    
    except subprocess.CalledProcessError as e:
        print(f"Error during conversion: {e}")

if __name__ == "__main__":
    android2xliff("test.xml", "en.po", "en.xliff")
   
