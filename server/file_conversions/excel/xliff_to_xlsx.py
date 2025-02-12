import openpyxl
from util.xliff_to_arrays import xliff_to_arrays; 
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))) 
wb = openpyxl.load_workbook('sample.xlsx')

source, target = xliff_to_arrays("output.xliff")
sheet = wb.active

print("Source:", source)
print("Target:", target)
print("hello")
search_array = ["hello", "sample", "cherry"]
replace_array = ["bye", "adasdasda", "grape"]

# Loop through all rows and columns in the sheet
for row in sheet.iter_rows():
    for cell in row:
        # Replace matching text using arrays
        for i in range(len(search_array)):
            if isinstance(cell.value, str) and search_array[i] in cell.value:
                cell.value = cell.value.replace(search_array[i], replace_array[i])

# Save the modified workbook (optional)
wb.save('modified_file.xlsx')
