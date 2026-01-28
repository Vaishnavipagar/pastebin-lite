## Pastebin Lite

### Run locally
npm install
npm run dev

### Persistence
SQLite using better-sqlite3

### Notes
- TTL and view count enforced
- Deterministic time supported

# Pastebin Lite

Pastebin Lite is a lightweight web application that allows users to create and share text snippets using a unique URL.  
Each paste can optionally expire based on **time-to-live (TTL)** or **maximum view count**.  
The application is built with **Next.js** and deployed on **Vercel**.

---

## 🚀 Live Demo

**Production URL:**  
https://pastebin-lite-khaki-seven.vercel.app

---

## 📂 GitHub Repository

https://github.com/Vaishnavipagar/pastebin-lite

---

## ✨ Features

- Create text pastes quickly
- Generate a unique, shareable URL for each paste
- Optional **TTL (Time To Live)** expiration
- Optional **maximum view count** limit
- Paste becomes unavailable after expiration or view limit
- Health check API for deployment verification
- Fully deployed on Vercel

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (React)
- **Backend:** Next.js API Routes
- **Unique ID Generation:** nanoid
- **Data Persistence:** File-based storage (JSON)
- **Deployment Platform:** Vercel
- **Runtime:** Node.js

---

## 🧠 Design Decisions

Initially, SQLite was used for data storage.  
However, since Vercel is a serverless platform and does not support native binaries reliably, the persistence layer was refactored to use **file-based storage**.

This ensures:
- Serverless compatibility
- Data persistence beyond in-memory storage
- Smooth production deployment on Vercel

---

=

