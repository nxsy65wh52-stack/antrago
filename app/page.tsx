"use client"

import React, { useState, useRef, KeyboardEvent } from 'react'

type Message = {
  id: number
  sender: 'user' | 'system'
  text: string
}

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'system', text: 'Willkommen bei Antrago — Chat (Testmodus, keine AI verbunden).' }
  ])
  const [input, setInput] = useState('')
  const idRef = useRef(2)

  function sendMessage() {
    const text = input.trim()
    if (!text) return
    const userMsg: Message = { id: idRef.current++, sender: 'user', text }
    setMessages((m) => [...m, userMsg])
    setInput('')
    // placeholder system response (no AI integration yet)
    const sys: Message = {
      id: idRef.current++,
      sender: 'system',
      text: 'Hinweis: Keine AI verbunden. Dies ist eine lokale UI-Testantwort.'
    }
    setTimeout(() => setMessages((m) => [...m, sys]), 300)
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="container">
      <main className="card">
        <header className="cardHeader">
          <h1>ANTRAGO</h1>
          <p className="muted">Assistent — Erklären. (UI Test)</p>
        </header>

        <section className="messages" aria-live="polite">
          {messages.map((m) => (
            <div key={m.id} className={`bubble ${m.sender}`}>
              {m.text}
            </div>
          ))}
        </section>

        <div className="composer">
          <input
            aria-label="Nachricht eingeben"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Schreibe eine Nachricht oder lade ein Dokument hoch..."
          />
          <button onClick={sendMessage} className="sendBtn">Senden</button>
        </div>
      </main>

      <style jsx>{`
        .container{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f6f7fb;padding:24px}
        .card{width:100%;max-width:720px;background:white;border-radius:12px;box-shadow:0 8px 30px rgba(13,38,76,0.07);padding:20px;display:flex;flex-direction:column}
        .cardHeader{border-bottom:1px solid #eef2ff;padding-bottom:12px;margin-bottom:12px}
        h1{margin:0;font-size:20px}
        .muted{color:#6b7280;margin:4px 0 0;font-size:13px}
        .messages{flex:1;overflow:auto;display:flex;flex-direction:column;gap:10px;padding:12px 4px}
        .bubble{max-width:80%;padding:10px 14px;border-radius:10px;font-size:14px}
        .bubble.user{align-self:flex-end;background:#0b6cf6;color:white;border-bottom-right-radius:4px}
        .bubble.system{align-self:flex-start;background:#f3f4f6;color:#0b1f3a}
        .composer{display:flex;gap:8px;padding-top:12px;border-top:1px solid #f1f5f9}
        input{flex:1;padding:10px 12px;border:1px solid #e6eef8;border-radius:8px;font-size:14px}
        .sendBtn{background:#0b6cf6;color:white;border:none;padding:10px 14px;border-radius:8px;cursor:pointer}
      `}</style>
    </div>
  )
}
