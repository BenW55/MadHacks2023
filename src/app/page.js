"use client";
import Image from 'next/image'
import styles from './page.module.css'
import { useState } from 'react';
import PromptForm from '@/components/PromptForm';

export default function Home() {

  const [choices, setChoices] = useState([]);

  return (
    <main className={styles.main}>
      <p>Hi!</p>
      <PromptForm
              onSubmit={ async(prompt) => {
                const response =  await fetch("/api/chat-gpt", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    prompt: prompt,
        
                  }),
                });
                const result = await response.json();
                setChoices(result.choices)
        
              }}/>

      {choices.map(choice => {
        return (
          <p kep = {choice.index}>{choice.message.content}</p>
        )
      })

      }
    </main>
  )
}
