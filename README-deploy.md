Deployment helpers
==================

1. Install git hooks (run once):

```sh
sh scripts/install-git-hooks.sh
```

2. Create `.coolify.env` in the repo root (do NOT commit it). Use `.coolify.env.example` as a template.

3. After committing, the `post-commit` hook will push to the remote and trigger the Coolify webhook.

Notes:
- The hook does a best-effort `git push` and a `curl` POST to the webhook; adjust as needed.
- Ensure the repo has a remote named `origin` or set `GIT_REMOTE` in `.coolify.env`.
