Here's a ready-to-use `CONTRIBUTING.md` file for your Django-based **TheaStream** project. It includes:

* Folder structure
* Branch/commit naming conventions
* Setup and run instructions
* Contribution rules

---

### 📄 `CONTRIBUTING.md`

```markdown
# Contributing to TheaStream

Thank you for contributing to TheaStream! This guide will help you understand the project structure, naming conventions, and how to set up your local development environment.

---

## 📁 Project Folder Structure

Below is the default folder structure for the project:

```

theastream/
├── manage.py
├── requirements.txt
├── util/               # Helper modules, APIs, and logic unrelated to frontend or views
│   └── ...
├── project/            # Main Django project settings
│   ├── **init**.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── app1/               # Django app (e.g., livestream, tickets, etc.)
│   ├── models.py
│   ├── views.py
│   ├── urls.py
│   └── ...
├── app2/
│   └── ...

```

---

## 🌱 Branch Naming Convention

Please use the following format for naming your branches:

- `feature/<name>` – New features  
- `fix/<name>` – Bug fixes  
- `docs/<name>` – Documentation updates  
- `refactor/<name>` – Code refactoring (no behavior change)

Examples:
```

feature/livestream-ui
fix/ticket-checkout-bug
docs/update-readme
refactor/auth-cleanup

````

---

## ✅ Commit Message Guidelines

Keep your commit messages simple and clear:

- Use imperative tone: `Add`, `Fix`, `Update`, `Refactor`
- Example: `Add AI assistant for livestream`, `Fix QR code link bug`

---

