---
description: Best practices for git staging and committing
---

# Git Best Practices

## Recommended Workflow

1. **Check status first:**
```bash
git status
```

2. **Stage specific files** (preferred over `git add .`):
```bash
git add <specific-files>
```

3. **For interactive staging** (review each change):
```bash
git add -p
```

4. **Verify staged changes:**
```bash
git status
```

5. **Commit with descriptive message:**
```bash
git commit -m "type: description"
```

6. **Push to your branch:**
```bash
git push origin harsh
```

## Why Specific Files Over `git add .`

- Prevents accidental commits of debug code
- Creates atomic, focused commits
- Cleaner git history
- Easier code reviews
