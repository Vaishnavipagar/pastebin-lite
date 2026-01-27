import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");

  async function createPaste() {
    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: text, max_views: 2 })
    });
    const data = await res.json();
    setUrl(data.url);
  }

  return (
    <>
      <textarea onChange={e => setText(e.target.value)} />
      <br />
      <button onClick={createPaste}>Create Paste</button>
      <p>{url}</p>
    </>
  );
}
