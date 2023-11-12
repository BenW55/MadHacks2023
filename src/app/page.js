"use client";
import Image from 'next/image'
import styles from './page.module.css'
import { useState } from 'react';
import PDFUploadForm from '@/components/PromptForm'; // Assuming you have updated the form component name
export default function Home() {
    const [choices, setChoices] = useState([]);
    const [isSpinning, setIsSpinning] = useState(false);
    const handlePDFSubmit = async (file) => {
        const formData = new FormData();
        setIsSpinning(true);
        formData.append('files', file);
        try {
            const response = await fetch("http://localhost:4000/chat-gpt", {
                method: "POST",
                
                body: formData
            });
            const result = await response.json();
            setChoices(result.choices);

        } catch (error) {
            console.error("An error occurred while uploading the file:", error);
        }finally{
          setIsSpinning(false);
        }
    };

    return (
    <main className={styles.main}>
    <div className={styles.container}>
      <header className={styles.header}>
        <img src="/logo.png" className= {styles.logo}/>


      </header>
        <div className={styles.result}>
      <PDFUploadForm onSubmit={handlePDFSubmit} />
      {choices.map((choice, index) => (
          <p className={styles.data} key={index}>{choice.message.content}</p> // Fixed the key prop
      ))}
          </div>
    </div>
      </main>
    );
}
