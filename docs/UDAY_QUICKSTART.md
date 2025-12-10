# 🚀 Uday's Quick Start Cheatsheet

## 1️⃣ First Time Setup (Only Once)

```bash
# Clone the repo
git clone https://github.com/2025harshrupreja/Truth-Lens-Mini-Project.git
cd Truth-Lens-Mini-Project

# Switch to dev and create your branch
git checkout dev
git checkout -b uday
git push -u origin uday

# Install dependencies
npm install
```

### Create `.env` file (ask Shivam for API keys):
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/truthlens
GEMINI_API_KEY=ask_shivam
GOOGLE_FACTCHECK_API_KEY=ask_shivam
GNEWS_API_KEY=ask_shivam
JWT_SECRET=ask_shivam
```

---

## 2️⃣ Every Work Session

```bash
# Switch to your branch
git checkout uday

# Get latest changes
git pull origin dev

# Start the backend (Docker must be running)
docker-compose up -d

# Start frontend
npm run dev
```

---

## 3️⃣ While Working

### After completing something that works:
```bash
git add .
git commit -m "feat: what you added"
git push origin uday
```

### Commit message examples:
- `feat: add dark mode toggle`
- `fix: login button not working`
- `style: improve card shadows`

---

## 4️⃣ When Your Feature is Done

1. Go to GitHub: https://github.com/2025harshrupreja/Truth-Lens-Mini-Project
2. Click "Pull requests" → "New pull request"
3. Select: `base: dev` ← `compare: uday`
4. Click "Create pull request"
5. Write what you added
6. Notify team in group chat

---

## 🤖 AI Prompt (Copy This!)

**START every AI session with:**

```
You are helping me (Uday) work on TruthLens, a COLLABORATIVE project with 2 other teammates (Shivam, Harsh).

CRITICAL RULES:
1. NEVER delete or completely rewrite files - make small, incremental changes
2. ALWAYS preserve existing functionality - don't break what works
3. Add helpful comments for complex logic
4. Before making big changes, explain what you'll modify and wait for my approval
5. When I say "checkpoint" or "commit", create a git commit with descriptive message
6. NEVER directly modify these shared files without asking:
   - package.json
   - docker-compose.yml
   - backend/app/core/config.py
   - src/lib/api.ts (be careful with shared API functions)

PROJECT INFO:
- Frontend: React + Vite + TypeScript (src/)
- Backend: FastAPI + Python (backend/)
- My branch: uday
- Integration branch: dev
- Production branch: main (Shivam manages)

After completing features, remind me to: git add . && git commit -m "message" && git push origin uday
```

---

## 🆘 Help!

### "I messed something up"
```bash
# Reset your branch to match dev
git checkout dev
git pull origin dev
git checkout uday
git reset --hard dev
```

### "I have merge conflicts"
Ask in group chat, Shivam will help!

---

## 📁 Quick Reference

| Location | What's There |
|----------|--------------|
| `src/components/` | React pages & components |
| `src/lib/api.ts` | API functions |
| `backend/app/api/v1/` | Backend endpoints |
| `backend/app/services/` | Backend logic |

---

**Questions? Ask in the group chat!**
