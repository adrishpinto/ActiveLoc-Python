import openpyxl
from openpyxl.styles import Font


file_path = r'./sample.xlsx'


wb = openpyxl.load_workbook(file_path)

sheet = wb['Sheet1']  


source_text = "First"
target_text = "Hello"

    
for row in sheet.iter_rows():
    for cell in row:
        if isinstance(cell.value, str) and source_text in cell.value:
            
            cell_font = cell.font

            
            cell.value = cell.value.replace(source_text, target_text)
            
            
            cell.font = Font(
                bold=cell_font.bold,
                italic=cell_font.italic,
                underline=cell_font.underline,
                color=cell_font.color,
                name=cell_font.name,
                size=cell_font.size
            )


wb.save(r'./modified_file.xlsx')
