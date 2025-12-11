# 🎓 TruthLens Team Onboarding Guide
## Complete Beginner Setup (From Zero to Running App)

> **For: Shivam to teach Harsh & Uday on Google Meet**  
> **Time needed: ~30-45 minutes**

---

## 📋 Before We Start (Prerequisites Check)

Ask your teammate: "Do you have these installed?"

| Tool | How to Check | If Not Installed |
|------|--------------|------------------|
| **Git** | `git --version` | [Download Git](https://git-scm.com/downloads) |
| **Node.js** | `node --version` (should be 18+) | [Download Node](https://nodejs.org/) |
| **Docker Desktop** | Open Docker Desktop app | [Download Docker](https://www.docker.com/products/docker-desktop/) |
| **VS Code** | Open it | [Download VS Code](https://code.visualstudio.com/) |

**Wait for them to confirm all 4 are installed before proceeding.**

---

## 🚀 Step 1: Clone the Repository

```
"Okay, let's get the code from GitHub onto your computer."
```

**Open Terminal/Command Prompt and run:**

```bash
# Navigate to where you want the project
cd Desktop

# Clone the repository
git clone https://github.com/2025harshrupreja/Truth-Lens-Mini-Project.git

# Go into the project folder
cd Truth-Lens-Mini-Project
```

**Verify:** They should see files when they run `dir` (Windows) or `ls` (Mac/Linux)

---

## 🌿 Step 2: Create Their Own Branch

```
"Now we'll create YOUR personal branch to work on. We never work directly on main."
```

**Replace `YOUR_NAME` with their name (harsh or uday):**

```bash
# Get the latest from dev branch
git checkout dev
git pull origin dev

# Create YOUR personal branch
git checkout -b YOUR_NAME

# Connect your branch to GitHub
git push -u origin YOUR_NAME
```

**Verify:** `git branch` should show their name with a `*` next to it

---

## 🔑 Step 3: Set Up Environment Variables

```
"Now we need to add the secret API keys. I'll share these with you."
```

### Create the .env file:

**In the project root folder, create a new file called `.env` (not `.env.example`)**

```bash
# Copy the example file
copy .env.example .env
```

**Then open `.env` and replace the placeholder values:**

```env
# Database (keep as-is for local development)
DATABASE_URL=postgresql+asyncpg://truthlens:truthlens_secret@localhost:5432/truthlens

# API Keys (Shivam will share these privately)
GEMINI_API_KEY=your_actual_gemini_key
GOOGLE_FACTCHECK_API_KEY=your_actual_factcheck_key
GNEWS_API_KEY=your_actual_gnews_key

# JWT Secret (keep as-is for local development)
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

**⚠️ NEVER commit this file to GitHub!** (it's already in .gitignore)

---

## 🐳 Step 4: Start Docker Desktop

```
"Before we can run the app, Docker Desktop needs to be running."
```

1. Open **Docker Desktop** application
2. Wait until it says "Docker is running" (green indicator)
3. This runs our database and backend in containers

---

## 📦 Step 5: Install Frontend Dependencies

```
"Now let's install all the packages the frontend needs."
```

```bash
cd client
npm install
```

**Wait for it to complete. This might take 2-3 minutes.**

**If you see warnings (WARN), that's okay. Only errors (ERR) are problems.**

---

## 🏃 Step 6: Start the Application

```
"Now the exciting part - let's start everything!"
```

### Start Backend + Database (Docker):

```bash
docker-compose up -d
```

**Wait for all containers to be healthy. Check with:**

```bash
docker ps
```

You should see 3 containers running:
- `truthlens_backend`
- `truthlens_db`
- `truthlens_frontend`

### Start Frontend (Local - better for development):

```bash
# Stop the Docker frontend (we'll run it locally instead)
docker stop truthlens_frontend

# Start local frontend
cd client
npm run dev
```

---

## ✅ Step 7: Verify Everything Works

```
"Let's make sure everything is working properly!"
```

### Open Browser:

1. Go to **http://localhost:3000**
2. You should see the TruthLens landing page
3. Click **"Register"** → Create a test account
4. Click **"Verify Article"** → Paste any claim → Click Analyze

**If you see results, congratulations! 🎉 It's working!**

---

## 🔧 Common Problems & Solutions

### Problem: "Docker not running"
**Solution:** Open Docker Desktop app and wait for it to start

### Problem: "Port already in use"
**Solution:** 
```bash
docker-compose down
docker-compose up -d
```

### Problem: "CORS error" in browser console
**Solution:**
```bash
docker restart truthlens_backend
```

### Problem: "Cannot find module" error
**Solution:**
```bash
npm install
```

---

## 📝 Daily Workflow (After Initial Setup)

```
"This is what you'll do EVERY TIME you start working:"
```

### 1. Update your code:
```bash
git checkout YOUR_NAME
git pull origin dev
```

### 2. Start Docker:
```bash
docker-compose up -d
docker stop truthlens_frontend
```

### 3. Start Frontend:
```bash
npm run dev
```

### 4. Open browser:
Go to http://localhost:3000

### 5. When done working:
```bash
# Save your work
git add YOUR_FILES_HERE
git commit -m "what you did"
git push origin YOUR_NAME
```

---

## 🌳 Understanding Our Branch Structure

```
"This is how our code flows from development to production:"
```

```
main (production - Shivam manages)
  ↑
 dev (integration - where we combine work)
  ↑
├── shivam (Shivam's work)
├── harsh (Harsh's work)  
└── uday (Uday's work)
```

**Rules:**
- ❌ NEVER push directly to `main` or `dev`
- ✅ Always work on YOUR branch
- ✅ Create Pull Request when feature is done

---

## 🤖 Using AI Assistants (Gemini/Claude)

```
"When using AI to help you code, always start with this prompt:"
```

Copy this at the START of every AI session:

```
You are helping me (YOUR_NAME) work on TruthLens, a COLLABORATIVE project.

CRITICAL RULES:
1. NEVER delete or completely rewrite files - make small, incremental changes
2. ALWAYS preserve existing functionality
3. Add helpful comments for complex logic
4. Before making big changes, explain and wait for approval
5. When I say "checkpoint" or "commit", help me with git

PROTECTED FILES (ask before modifying):
- package.json
- docker-compose.yml
- backend/app/core/config.py
- src/lib/api.ts

PROJECT INFO:
- Frontend: React + Vite + TypeScript (client/src/)
- Backend: FastAPI + Python (backend/)
- My branch: YOUR_NAME
```

---

## 📁 Project Structure

```
"Here's where everything lives:"
```

| Folder | What's Inside |
|--------|---------------|
| `client/src/components/` | React pages and components |
| `client/src/lib/api.ts` | API functions (shared, be careful!) |
| `backend/app/api/` | Backend endpoints |
| `backend/app/services/` | Backend logic |
| `docs/` | Documentation |

---

## 🆘 Need Help?

1. **First:** Check the error message carefully
2. **Second:** Google the error
3. **Third:** Ask in the group chat
4. **Fourth:** Ask Shivam

---

## ✅ Onboarding Checklist

| Step | Completed? |
|------|------------|
| Git installed | ☐ |
| Node.js installed | ☐ |
| Docker Desktop installed | ☐ |
| Repository cloned | ☐ |
| Personal branch created | ☐ |
| .env file created with keys | ☐ |
| npm install completed | ☐ |
| Docker containers running | ☐ |
| Frontend running (localhost:3000) | ☐ |
| Can register and login | ☐ |
| Can analyze a claim | ☐ |

**Once all boxes are checked, they're ready to code! 🚀**
