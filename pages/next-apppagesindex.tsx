import { useState } from 'react'

export default function Home() {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    })

    const data = await res.json()
    setResponse(data.reply)
    setLoading(false)
  }

  return (
    <main style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1>🧾 ANTRAGO – Dokument Erklärer</h1>

      <form onSubmit={handleSubmit}>
        <textarea
          rows={4}
          placeholder="Füge hier deinen Satz ein oder frage z.B. 'Was heißt das?'"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: '100%', padding: 10 }}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Wird geladen...' : 'Senden'}
        </button>
      </form>

      {response && (
        <div style={{ marginTop: 20, background: '#f0f0f0', padding: 10 }}>
          <strong>Antwort:</strong>
          <p>{response}</p>
        </div>
      )}
    </main>
  )
}
