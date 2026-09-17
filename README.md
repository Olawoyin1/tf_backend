# TalentFlow Backend API

Node.js + Express + MongoDB waitlist API for TalentFlow. Hosted on Render.

## Stack
- **Runtime**: Node.js 18+
- **Framework**: Express
- **Database**: MongoDB Atlas
- **Email**: Resend
- **Host**: Render

## Project Structure
```
tf-backend/
├── src/
│   ├── index.js              # App entry point
│   ├── models/
│   │   └── Waitlist.js       # Mongoose schema
│   ├── routes/
│   │   └── waitlist.js       # Route handlers
│   └── services/
│       └── emailService.js   # Resend email service
├── .env.example              # Environment variable template
├── .gitignore
└── package.json
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/waitlist` | Register a new waitlist entry |
| `GET` | `/api/waitlist/count` | Get the total number of registrations |
| `GET` | `/health` | Health check |

### POST `/api/waitlist`

**Request body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "role": "athlete",
  "sport": "Football",
  "country": "Nigeria",
  "referralSource": "Twitter"
}
```

**Success response (201):**
```json
{
  "success": true,
  "message": "Welcome to the waitlist, John! You are #42.",
  "data": {
    "position": 42,
    "email": "john@example.com",
    "fullName": "John Doe"
  }
}
```

**Role values:** `athlete`, `coach`, `agent`, `scout`, `club`, `brand`, `journalist`, `analyst`, `medical`, `fan`, `other`

---

## Setup & Deployment

### Step 1 — MongoDB Atlas

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas) and create a free account
2. Create a **free M0 cluster**
3. Create a **database user** (username + password)
4. Under **Network Access**, click **Add IP Address** → choose **Allow Access from Anywhere** (for Render)
5. Click **Connect** → **Drivers** → copy the connection string
6. Replace `<password>` in the string with your actual password

Your URI will look like:
```
mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/talentflow?retryWrites=true&w=majority
```

### Step 2 — Resend

1. Go to [resend.com](https://resend.com) and create a free account
2. Go to **API Keys** and create a new key → copy it
3. Go to **Domains** and add your domain (or use `onboarding@resend.dev` for testing)

### Step 3 — Deploy to Render

1. Push this folder to a GitHub repository
2. Go to [render.com](https://render.com) → **New** → **Web Service**
3. Connect your GitHub repo
4. Set these settings:
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Under **Environment Variables**, add:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Your Atlas connection string |
| `RESEND_API_KEY` | Your Resend API key |
| `FROM_EMAIL` | `TalentFlow <no-reply@yourdomain.com>` |
| `ALLOWED_ORIGINS` | `https://your-frontend-domain.com` |

6. Click **Deploy** — Render will give you a URL like `https://tf-backend.onrender.com`

### Step 4 — Connect the Frontend

In your `tf waitlist` frontend, update the API base URL to your Render URL:
```
https://tf-backend.onrender.com/api/waitlist
```

---

## Local Development

```bash
# Copy env template
cp .env.example .env
# Fill in your actual values in .env

# Run with auto-reload
npm run dev
```
