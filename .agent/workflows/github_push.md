---
description: How to push the ESAT Evaluation App to GitHub
---

# Pushing to GitHub

Follow these steps to upload your project to a GitHub repository.

## Prerequisites
- You must have a GitHub account.
- You must have `git` installed on your machine.

## Steps

1.  **Create a Repository on GitHub**
    - Go to [github.com/new](https://github.com/new).
    - Name your repository (e.g., `esat-eval-app`).
    - Do **not** initialize with README, .gitignore, or License (we already have them).
    - Click **Create repository**.

2.  **Initialize Git Locally**
    Open your terminal in the project folder (`esat-eval-app`) and run:
    ```bash
    git init
    git add .
    git commit -m "Initial commit: ESAT Evaluation App"
    ```

3.  **Link to GitHub**
    Copy the commands shown on your empty GitHub repository page under "…or push an existing repository from the command line". They will look like this:
    ```bash
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/esat-eval-app.git
    git push -u origin main
    ```
    *Replace `YOUR_USERNAME` with your actual GitHub username.*

4.  **Verify**
    Refresh your GitHub repository page to see your code.

## Deploying to GitHub Pages (Optional)

To host the app online for free:

1.  Update `vite.config.ts`:
    ```typescript
    export default defineConfig({
      plugins: [react()],
      base: '/esat-eval-app/', // Replace with your repo name
    })
    ```
2.  Run `npm run build`.
3.  Push the changes.
4.  Go to Repo Settings > Pages > Select `gh-pages` branch (you might need to set up a workflow for this, or use the `gh-pages` npm package).
