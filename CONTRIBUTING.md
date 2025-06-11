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

## 🛠️ Setup & Run Instructions

1. **Clone the repo**
   ```bash
   git clone <repo-url>
   cd theastream
````

2. **Create a virtual environment**

   ```bash
   python -m venv venv
   source venv/bin/activate    # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Run the development server**

   ```bash
   python manage.py runserver
   ```

---

## 🚫 Don't Push to `main`

* **DO NOT push directly to the `main` branch.**
* Always create a **new branch**, commit your work there, and then:

  * Open a **Pull Request (PR)**
  * Request at least **one team member to review** it before merging

---

## 🙌 Need Help?

Feel free to ask questions in the team chat or open a discussion thread in the repo.

Thank you for helping make TheaStream better!

```

Let me know if you’d like this in Markdown file format or want to generate a `.gitignore`, `README.md`, or CI config as well.
```

