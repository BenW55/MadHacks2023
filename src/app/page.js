"use client";
import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <p>Hi!</p>


      <button onClick={async () =>{
        const response =  await fetch("/api/chat-gpt", {
          method: "POST",
          headers: {
            "Content-Type": "applicatoin/json",
          },
          body: JSON.stringify({
            someData:true,

          }),
        });
        console.log("RESPONSE", response);


      }}>
        Hit API
      </button>
    </main>
  )
}
