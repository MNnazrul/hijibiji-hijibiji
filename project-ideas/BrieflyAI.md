# 🧠 Project Overview:

## AI-Powered Article Summarizer & Narrator (Fully Free, Full Stack)

---

## 🎯 Project Goal

Create a web application where users can:

* Submit articles by pasting text or uploading files
* Get AI-generated summaries of those articles
* Listen to the summaries via natural-sounding AI voice (Text-to-Speech)
* Save, manage, and share their summaries and audios
* Use secure user authentication (login/register)

All built with open-source AI models and free-tier hosting.

---

## 📋 Features

### 1. User Authentication

* Register and login with JWT-based auth
* Protect routes to show user history and saved summaries

### 2. Text Input & Upload

* Textarea for pasting articles
* File upload support (plain text `.txt`)

### 3. AI Summarization

* Use HuggingFace transformer models (`bart-large-cnn`, `t5-small`) locally
* Summarize large text efficiently on backend

### 4. Text-to-Speech (TTS)

* Use Coqui TTS to generate natural audio from summaries
* Audio playback on frontend with download option

### 5. History & Management

* List previously summarized texts & audios per user
* Allow replay and deletion of saved entries

### 6. Optional: Public Sharing

* Generate public URLs for summaries/audio (read-only)

---

## 🛠️ Tech Stack

| Layer              | Technology                 | Purpose                         |
| ------------------ | -------------------------- | ------------------------------- |
| **Frontend**       | Next.js (App Router)       | UI, routing, API consumption    |
|                    | Tailwind CSS               | Styling                         |
|                    | Vercel (Free)              | Frontend hosting                |
| **Backend**        | FastAPI (Python)           | API server, AI inference, auth  |
|                    | SQLite/PostgreSQL          | Database storage                |
|                    | Render / Fly.io            | Backend hosting (free tier)     |
| **AI Models**      | HuggingFace `transformers` | Text summarization              |
|                    | Coqui TTS                  | Text-to-Speech audio generation |
| **Authentication** | JWT (via FastAPI)          | Secure user sessions            |
| **Storage**        | Local filesystem           | Save audio files                |

---

## 🗂️ Frontend Structure (Next.js)

```
src/
 ├── app/                 # Page routes
 │    ├── api/            # Optional Next.js API routes (for proxy or auth)
 │    ├── summarize/      # Summarize page
 │    ├── login/
 │    ├── register/
 │    └── history/        # User history page
 ├── components/          # Reusable UI components (AudioPlayer, Forms)
 ├── lib/                 # Client-side API calls to backend
 ├── types/               # TypeScript types/interfaces
 └── styles/              # CSS / Tailwind config
```

---

## 🔧 Backend Structure (FastAPI)

```
backend/
 ├── main.py              # FastAPI app startup
 ├── models.py            # DB models (User, Summary, Audio)
 ├── routes/              # API endpoints (auth, summarize, tts, history)
 ├── services/            # AI model loading & inference logic
 ├── media/               # Generated audio files storage
 ├── database.py          # DB connection & session
 ├── auth.py              # JWT and security utilities
 ├── summarize.py         # HuggingFace summarizer wrapper
 └── tts.py               # Coqui TTS audio generator
```

---

## 🛠️ How It Works (End-to-End Flow)

1. User registers and logs in
2. User submits article text or file via frontend
3. Frontend sends data to FastAPI `/summarize` endpoint
4. Backend runs summarization AI, returns summary text
5. Backend runs TTS AI, generates audio file
6. Backend stores summary + audio file info in DB
7. Frontend displays summary + audio player
8. User can save, replay, or share results
9. User can view past summaries on history page

---

## 💻 Development Tips

* Load AI models once at backend startup for speed
* Use async endpoints in FastAPI for concurrency
* Limit maximum text length for summarization to avoid timeouts
* Secure media files by user ownership or expiring URLs
* Use environment variables for secrets & config

---

## 🚀 Deployment

* Deploy frontend on **Vercel** (free)
* Deploy backend FastAPI on **Render** or **Fly.io** (free tier supports small apps)
* Use SQLite for development, PostgreSQL on production if needed
* Serve audio files via backend static route or cloud storage

---

## ✅ Why This Project?

* Demonstrates **full-stack development skills**
* Incorporates **real AI models** without paid APIs
* Shows ability to build **production-ready apps**
* Combines **frontend, backend, AI, auth, storage**
* Perfect mid-level portfolio project for students

---
