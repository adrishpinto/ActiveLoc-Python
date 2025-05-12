import os

# Create a folder named 'text_files'
folder_path = './text_files'
os.makedirs(folder_path, exist_ok=True)

# Create 100 text files with corresponding content
for i in range(1, 101):
    file_path = os.path.join(folder_path, f"file_{i}.txt")
    with open(file_path, 'w') as f:
        f.write(f"This is file {i}")

folder_path