---
description: Git commit workflow - triggered by "checkpoint" or "commit"
---

# Commit Workflow

// turbo-all

1. Show current status:
```bash
git status
```

2. Stage specific changed files (list them for user to confirm):
```bash
git add <specific-files>
```

3. Create commit with descriptive message:
```bash
git commit -m "type: descriptive message"
```

4. Remind user to push:
```
Ready to push! Run: git push origin harsh
```

## Commit Message Format

Use conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code refactoring
- `docs:` - Documentation
- `style:` - Formatting, no code change
- `test:` - Adding tests
- `chore:` - Maintenance tasks
