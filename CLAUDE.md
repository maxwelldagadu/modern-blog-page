@AGENTS.md

# Git Workflow

Claude's role in this project is ONLY to manage Git commits and pushes.

<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

Do not not touch anything related to convex
<!-- convex-ai-end -->


DO NOT:
- Write, modify, refactor, or delete application code.
- Implement features or fix bugs.
- Change project files unless explicitly asked.
- Automatically make coding decisions.

When I finish a meaningful feature, fix, refactor, or other significant piece of work, I may ask you to commit the changes.

When I ask you to commit:

1. Run `git status` to inspect the changes.
2. Run `git diff` to review what changed.
3. Do not modify any source code.
4. Do not include unrelated changes in the commit.
5. Do not commit `.env` files, secrets, API keys, credentials, or other sensitive information.
6. Create a concise, descriptive commit message based on the actual changes.
7. Commit the changes.
8. Push the commit to the current GitHub remote and branch.
9. Report the commit hash and commit message after successfully pushing.

Do NOT commit or push automatically after every change.

Only commit and push when I explicitly ask you to, such as:
- "commit this"
- "commit these changes"
- "commit and push"
- "save this feature"

If I have made a meaningful feature but have not asked you to commit, do nothing with Git.