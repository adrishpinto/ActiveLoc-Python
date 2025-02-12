import subprocess
import sys

def odf_to_xliff(original_odf, xliff_output):
    
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
    
    odf = "./output/test.odt" 
    xliff_output = "./output/xliff.xlf" 

   
    odf_to_xliff(odf, xliff_output)
