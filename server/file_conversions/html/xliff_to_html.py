import subprocess

def po2html(input_po, template_html, output_html):
    # Construct the command
    command = [
        'po2html', '--fuzzy', '-i', input_po, '-t', template_html, '-o', output_html
    ]
    
    # Execute the command
    try:
        subprocess.run(command, check=True)
        print(f"Successfully converted {input_po} to {output_html} using template {template_html}")
    except subprocess.CalledProcessError as e:
        print(f"Error occurred while running po2html: {e}")
    
if __name__ == "__main__":
    input_po = 'output/output.po' 
    template_html = 'output/test.html'  
    output_html = 'output.html'  
    
    po2html(input_po, template_html, output_html)
