from docx_to_odt import docx_to_odt
from odf_to_xliff import odf_to_xliff
from xliff_to_odf import xliff_to_odf
from odt_to_docx import odt_to_docx
import time
def convert_documents():
    try:
        docx_to_odt("./output/test.docx", "./output/test.odt")
        odf_to_xliff("./output/test.odt", "./output/xliff.xlf")
        xliff_to_odf("./output/test.odt" , "./output/xliff.xlf", "./output/res.odt" )
        odt_to_docx("./output/res.odt", "./output/final.docx")
    except Exception as e:
        print(f"An error occurred: {e}")

convert_documents()
