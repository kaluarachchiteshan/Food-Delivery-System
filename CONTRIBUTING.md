# Contributing

This project uses two long-lived branches. Nobody pushes to them directly; every change goes through a pull request.

| Branch    | Purpose                                     | Changes come from        |
| --------- | ------------------------------------------- | ------------------------ |
| `main`    | Released, working code                      | `develop` or `hotfix/*`  |
| `develop` | Integration branch for the next release     | `feature/*`, `fix/*`, `docs/*` |

## Day-to-day workflow

1. Start from the latest `develop`:

   ```bash
   git switch develop
   git pull
   git switch -c feature/short-description
   ```

2. Commit your work in small, focused commits.
3. Push your branch:

   ```bash
   git push -u origin feature/short-description
   ```

4. On GitHub, open a pull request with **base: `develop`**.
5. The other contributor reviews it. After approval, merge it and delete the branch.
6. Before starting the next task, update your local `develop` again with `git pull`.

If `develop` changed while you were working, bring those changes into your branch before merging:

```bash
git switch develop
git pull
git switch feature/short-description
git merge develop
```

## Branch names

| Prefix      | Use for                         | Example                     |
| ----------- | ------------------------------- | --------------------------- |
| `feature/`  | New functionality               | `feature/order-history`     |
| `fix/`      | Bug fixes on `develop`          | `fix/cart-total-rounding`   |
| `docs/`     | Documentation only              | `docs/atlas-setup`          |
| `chore/`    | Tooling, Docker, dependencies   | `chore/update-node-image`   |
| `hotfix/`   | Urgent fix to released `main`   | `hotfix/login-500-error`    |

Use lowercase words separated by hyphens.

## Releases

When `develop` is stable and tested, open a pull request from `develop` into `main`. Merging it is the release.

## Hotfixes

For an urgent bug in `main`, branch `hotfix/...` from `main`, open a pull request into `main`, then merge `main` back into `develop` so the fix is not lost.

## Commit messages

Write a short summary in the imperative mood, such as `Add order history page` or `Fix cart total rounding`. Add a body when the reason for the change is not obvious.

## Never commit

- `.env` files or any password, connection string or API key
- `node_modules/` or `dist/`

Both are covered by `.gitignore`. Check `git status` before every commit.
