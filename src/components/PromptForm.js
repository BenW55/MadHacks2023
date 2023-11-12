import {useState} from "react";
import styles from "./PromptForm.module.css"

function PDFUploadForm({ onSubmit }) {
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please select a PDF file first.");
            return;
        }
        onSubmit(file);
        setFile(null); // Reset the file input after submission
    };

    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile && uploadedFile.type === "application/pdf") {
            setFile(uploadedFile);
        } else {
            alert("Please upload a PDF file.");
            setFile(null);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <label> Upload PDF</label>
            <input 
                className={styles.input} 
                type="file" 
                accept="application/pdf"
                onChange={handleFileChange}
            />
            <input type="submit" value="Upload"/>
        </form>
    );
}

export default PDFUploadForm;
