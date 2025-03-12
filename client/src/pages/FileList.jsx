import { useEffect, useState } from "react";

function FileManager() {
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState({ uploads: [], converted: [] });

    useEffect(() => {
        // Fetch folder list
        fetch("http://localhost:5000/list-folders")
            .then(res => res.json())
            .then(data => setFolders(data.folders))
            .catch(err => console.error("Error fetching folders:", err));

        // Fetch file list
        fetch("http://localhost:5000/list-files")
            .then(res => res.json())
            .then(data => setFiles(data))
            .catch(err => console.error("Error fetching files:", err));
    }, []);

    return (
        <div>
            <h2>Folder & File Manager</h2>

            {/* Display Folders */}
            <h3>Folders</h3>
            {folders.length > 0 ? (
                <ul>
                    {folders.map((folder, index) => (
                        <li key={index}>{folder}</li>
                    ))}
                </ul>
            ) : (
                <p>No folders found.</p>
            )}

            {/* Display Files from "uploads" */}
            <h3>Uploads</h3>
            {files.uploads.length > 0 ? (
                <ul>
                    {files.uploads.map((file, index) => (
                        <li key={index}>{file}</li>
                    ))}
                </ul>
            ) : (
                <p>No files in uploads.</p>
            )}

            {/* Display Files from "converted" */}
            <h3>Converted</h3>
            {files.converted.length > 0 ? (
                <ul>
                    {files.converted.map((file, index) => (
                        <li key={index}>{file}</li>
                    ))}
                </ul>
            ) : (
                <p>No files in converted.</p>
            )}
        </div>
    );
}

export default FileManager;
