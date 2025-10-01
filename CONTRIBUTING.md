
# 🤝 Contributing to AlumConnect

First off, thank you for considering contributing to **AlumConnect**! We're thrilled you're here. 🎉 Every contribution, whether it's fixing a typo, implementing a feature, or improving our documentation, helps make our community better.

This document provides a set of guidelines to help you get started.

---

## 📜 Code of Conduct

Before you begin, please read our [**Code of Conduct**](CODE_OF_CONDUCT.md). We expect all contributors to adhere to it to ensure our community remains a welcoming, respectful, and inclusive space for everyone.

---

## 🚀 Getting Started: Your First Contribution

Ready to contribute? Here’s the path to getting your changes merged.

### 1. Prerequisites

* [Git](https://git-scm.com/) installed on your machine.
* A code editor (e.g., [VS Code](https://code.visualstudio.com/)).
* [Node.js](https://nodejs.org/) and npm (or your project's package manager).

### 2. Fork & Clone the Repository

You'll be working on your own copy of the project.

```bash
# Fork the repository on GitHub first, then clone your fork
git clone [https://github.com/](https://github.com/)<your-username>/SIH2024.git
cd SIH2024

### 3\. Set Up Your Local Environment

To run the project on your machine, follow these steps:

```bash
# Install all the project dependencies
npm install

# Create your own environment file from the example
# (You might need to fill in some keys)
cp .env.example .env

# Start the local development server
npm run dev
```

Now you should have a running instance of AlumConnect on your local machine\!

-----

## 🔧 The Contribution Workflow

### 4\. Create a New Branch

Never work directly on the `main` branch. Create a descriptive branch name based on the work you're doing.

**Branch Naming Prefixes:**

  * `feat/`: for a new feature (e.g., `feat/user-profile-picture`)
  * `fix/`: for a bug fix (e.g., `fix/login-button-alignment`)
  * `docs/`: for documentation changes (e.g., `docs/update-readme`)
  * `chore/`: for maintenance tasks (e.g., `chore/update-dependencies`)

<!-- end list -->

```bash
# Example for a new feature
git checkout -b feat/add-event-reminders
```

### 5\. Make Your Changes

Write your code, fix the bug, or improve the documentation. Remember to follow the existing code style to maintain consistency.

### 6\. Commit Your Changes

We follow the [**Conventional Commits**](https://www.conventionalcommits.org/en/v1.0.0/) standard for our commit messages. This makes our project history clean and easy to read.

**Commit Message Format:** `<type>: <subject>`

```bash
# Good commit message examples
git commit -m "feat: Add password reset functionality"
git commit -m "fix: Correct typo in alumni login error message"
git commit -m "docs: Update contributing guidelines with testing info"
```

### 7\. Push to Your Fork

Push your committed changes to your forked repository on GitHub.

```bash
git push origin feat/add-event-reminders
```

### 8\. Open a Pull Request (PR)

Go to the original AlumConnect repository on GitHub. You should see a prompt to create a pull request from your new branch. Click it and fill out the PR template.

-----

## ✅ Pull Request Guidelines

  * **Keep PRs focused.** Each PR should address a single issue or feature.
  * **Provide a clear description.** Explain *what* your PR does and *why* it's needed.
  * **Reference related issues.** If your PR fixes an open issue, use a keyword like `Closes #123` in the description.
  * **Ensure all checks pass.** Your PR must pass any automated checks (like linting or tests) before it can be merged.

To help you, we use a pull request template. Please fill it out as completely as possible.

-----

## 🧪 Testing Your Changes

Before submitting your pull request, please test your changes thoroughly.

#### Manual Testing

You can use the provided dummy account to log in and test features from an alumni perspective.

  * **Email**: `alumni@example.com`
  * **Password**: `alumni123`

Please verify that your changes work as expected and do not introduce any new bugs.

#### Automated Tests

If your changes involve logic that is covered by our test suite, please run the tests to ensure you haven't broken anything.

```bash
# Run all automated tests
npm test
```

-----

✨ Thank you again for your contribution\! Your effort helps **AlumConnect** grow. We can't wait to see your work\!
