import subprocess
import sys

def xliff_to_odf(template_odf, xliff_input, translated_odf):

    try:
        print(f"Creating translated ODF {translated_odf} from {template_odf} and {xliff_input}...")
        subprocess.run(
            ["xliff2odf", "-t", template_odf, xliff_input, translated_odf],
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        print(f"Successfully created translated ODF file: {translated_odf}")
    except subprocess.CalledProcessError as e:
        print(f"Error during XLIFF to ODF conversion: {e.stderr.decode()}")
        sys.exit(1)

if __name__ == "__main__":

    template_odf = "./output/test.odt" 
    xliff_input = "./output/modified_file.xlf"  
    translated_odf = "./output/res.odt"  

    
    xliff_to_odf(template_odf, xliff_input, translated_odf)
