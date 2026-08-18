# 🗳️ Votix — Modern Online Voting System

Votix is a full-stack, secure, and modern electronic voting web application built using the **MERN** stack (MongoDB, Express, React, Node.js). It enables constituency-based voting, real-time aggregate election results, and secure admin management for political candidates and voter access.

---

## 🌟 Key Features

* **🔐 Secure Authentication:** User registration and login powered by **JWT** and **bcrypt.js** password hashing.
* **🗳️ Constituency-Based Voting:** Voters see candidates specific to their registered constituency (e.g., `NA-1`).
* **🛑 Single Vote Enforcement:** Strict database-level checks ensure each voter can cast only one ballot.
* **📊 Real-Time Global Dashboard:** Aggregate election results and live party-wise vote distribution with percentage visuals.
* **⚙️ Admin Dashboard:** Protected routes allowing administrators to add, view, update, and delete candidate profiles.
* **🛡️ Secret Key Admin Access:** Secure registration workflow using `ADMIN_SECRET` to grant administrative privileges.
* **✨ Modern UI:** Clean, glassmorphism interface built with **React**, **Tailwind CSS**, and **React Router v6**.

---

## 🛠️ Tech Stack

### Frontend

* **Framework:** React.js (Vite)
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM (`v6`)
* **HTTP Client:** Axios

### Backend

* **Runtime:** Node.js & Express.js
* **Database:** MongoDB Atlas (Mongoose ODM)
* **Security:** JSON Web Tokens (JWT), bcryptjs, CORS
* **Config:** dotenv

---

## 🚀 Getting Started

Follow these instructions to set up and run Votix on your local machine.

### Prerequisites

* [Node.js](https://nodejs.org/) (`v16.x` or higher)
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or local MongoDB server
* [Git](https://git-scm.com/)

---

### 📥 Installation & Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/your-username/votix.git
cd votix

```

---

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

```

Create a `.env` file in the `backend` directory and add the following environment variables:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/votix?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key
ADMIN_SECRET=your_super_secret_admin_passphrase

```

Start the backend development server:

```bash
npm start
# or with nodemon
npm run dev

```

The server should be running on `http://localhost:5000`.

---

#### 3. Frontend Setup

Open a new terminal tab and navigate to the frontend directory:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

```

Start the Vite development server:

```bash
npm run dev

```

The frontend application will be available at `http://localhost:5173`.

---

## 🔗 API Endpoints Overview

### Authentication (`/api/auth`)

* `POST /api/auth/register` — Register a new voter or admin (with `adminSecret`).
* `POST /api/auth/login` — Authenticate user and receive a JWT token.

### Elections & Voting (`/api/elections`)

* `GET /api/elections/candidates/:constituency` — Get candidates for a specific constituency. *(Auth required)*
* `POST /api/elections/vote` — Submit a vote for a candidate. *(Auth required)*
* `GET /api/elections/results` — Fetch global vote counts aggregated by party. *(Auth required)*

### Admin Routes (`/api/elections/admin`)

* `GET /api/elections/admin/candidates` — Fetch all candidates across constituencies. *(Admin only)*
* `POST /api/elections/candidates` — Add a new candidate. *(Admin only)*
* `PUT /api/elections/candidates/:id` — Update candidate information. *(Admin only)*
* `DELETE /api/elections/candidates/:id` — Remove a candidate. *(Admin only)*

---

## 📁 Project Structure

```text
votix/
├── backend/
│   ├── config/          # DB connection
│   ├── controllers/     # Controller logic (auth, election)
│   ├── middleware/      # Protect and Admin authorization middlewares
│   ├── models/          # User and Candidate Mongoose schemas
│   ├── routes/          # API Route handlers
│   ├── .env.example
│   └── server.js        # Express app entry point
│
└── frontend/
    ├── src/
    │   ├── components/  # VotingPanel, AdminPanel, ResultsPage
    │   ├── context/     # AuthContext for global user state
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json

```

---

## 🔐 Security Best Practices

* **`.env` Exclusion:** Ensure your `.env` file is listed inside `.gitignore` so your database credentials and secret keys are never exposed on GitHub.
* **Passwords:** Hashed using `bcryptjs` with salt rounds before saving to MongoDB.
* **Protected Middleware:** All sensitive routes require a valid JWT token passed in the `Authorization: Bearer <token>` header.

---

## 📜 License

This project is licensed under the **MIT License**.
