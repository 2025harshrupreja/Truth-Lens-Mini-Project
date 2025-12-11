---
description: Core rules and guidelines for working on TruthLens project
---

# TruthLens Development Rules

## 🛡️ DEFENSIVE CODING PRINCIPLES

1. **NEVER delete or completely rewrite files** - make small, incremental changes
2. **ALWAYS preserve existing functionality** - don't break what works
3. **Add helpful comments** for complex logic
4. **Before making big changes**, explain what you'll modify and wait for approval

## 🔒 PROTECTED FILES (Ask Before Modifying)

These files require explicit approval before any changes:
- `package.json`
- `docker-compose.yml`
- `backend/app/core/config.py`
- `src/lib/api.ts` (shared API functions)

## 📁 PROJECT STRUCTURE

| Component | Technology | Location |
|-----------|------------|----------|
| Frontend | React + Vite + TypeScript | `client/` |
| Backend | FastAPI + Python | `backend/` |

## 🌿 GIT BRANCHES

| Branch | Purpose | Owner |
|--------|---------|-------|
| `shivam` | Shivam's development | Shivam |
| `harsh` | Harsh's development | Harsh |
| `uday` | Uday's development | Uday |
| `dev` | Integration branch | Team |
| `main` | Production | Shivam manages |

**Current user: Shivam → use `origin shivam`**

## 🤖 AI MODEL

- Use **gemini-2.5-flash** (NOT gemini-1.5-flash)

## 📝 COMMIT WORKFLOW

When user says "checkpoint" or "commit":
1. Run `git status` to show changes
2. Create commit with descriptive message
3. Remind about push command

After completing features, remind user:
```bash
git add <specific files> && git commit -m "descriptive message" && git push origin shivam
```
