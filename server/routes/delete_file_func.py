import threading
import shutil
import time
import os

#function to delete the files and folders 
def delete_after_delay(path, delay=1800):
    """Deletes a file or folder after a delay."""
    def delete():
        time.sleep(delay)  
        if os.path.exists(path):
            if os.path.isdir(path):  
                shutil.rmtree(path)  
                print(f"Folder deleted: {path}")
            else:
                os.remove(path)  
                print(f"File deleted: {path}")
    threading.Thread(target=delete, daemon=True).start()