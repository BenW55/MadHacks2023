"use client";
import Image from 'next/image'
import styles from './page.module.css'
import { useState } from 'react';
import PDFUploadForm from '@/components/PromptForm'; // Assuming you have updated the form component name
export default function Home() {
    const [choices, setChoices] = useState([]);

    const handlePDFSubmit = async (file) => {
        const formData = new FormData();

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
        }
    };

    return (
    <main className={styles.main}>
    <div className={styles.container}>
      <header className={styles.header}>
        <Image src="/logo.png" width={883.941605839} height={300} objectPosition='center'/>


      </header>
      <div className={styles.result}>
      <PDFUploadForm onSubmit={handlePDFSubmit} />
      {choices.map((choice, index) => (
          <p key={index}>{choice.message.content}</p> // Fixed the key prop
      ))}
      </div>
      </div>
      </main>
    );
}
