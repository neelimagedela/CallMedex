# CallMedex

Healthcare platform built using a modular monolith architecture.

---

# First-Time Setup

Clone the repository:

```bash
git clone <repo-url>
cd CallMedex
```

Install all dependencies and setup the repo:

```bash
npm run setup
npm run docker:start
npm run db:migrate
```

---

# Environment Variables

Create a `.env` file inside `server/` according to `.env.example`

---

# Running The Project

Start backend:

```bash
npm run server
```

Start frontend:

```bash
npm run client
```