import zipfile

def rename_files(zip_path, new_names):
    old_names = [f"{i:04}.wav" for i in range(1, 101)] # Extend as needed
    new_zip_path = zip_path.replace(".zip", "_updated.zip")

    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        with zipfile.ZipFile(new_zip_path, 'w') as new_zip:
            for item in zip_ref.infolist():
                with zip_ref.open(item.filename) as file:
                    data = file.read()
                
                # Check if the file should be renamed
                if item.filename in old_names and old_names.index(item.filename) < len(new_names):
                    arcname = new_names[old_names.index(item.filename)]
                    print(f"Renaming '{item.filename}' → '{arcname}'")
                else:
                    arcname = item.filename

                new_zip.writestr(arcname, data)
    
    print(f"Files renamed successfully! New ZIP saved as '{new_zip_path}'.")

if __name__ == "__main__": 
   rename_files("test.zip", ["custom1.wav", "custom2.wav","new3.wav"])
