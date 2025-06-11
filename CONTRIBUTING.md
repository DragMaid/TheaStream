## This file convers:

* Folder structure
* Branch/commit naming conventions
* Setup and run instructions
* Contribution rules

---

## Folder Structure
```text

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

```

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
   ```

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
If you get stuck or need guidance:

Join our Discord server: https://discord.gg/x8DrG9YH9f

View our task board on Trello: https://trello.com/b/KTO7KFUV/theastream

Don't hesitate to reach out—we’re here to help!
