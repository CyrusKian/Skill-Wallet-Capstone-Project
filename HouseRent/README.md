# House Rent Management System

## Requirements
Make sure the following are installed:

- Node.js
- npm
- MongoDB
- Git

---

# Installation

## 1. Clone the Project

```bash
git clone <repository-link>
```

---

# Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs at:

```bash
http://localhost:5173
```

---

# Backend Setup

Open another terminal:

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm start
```

Backend runs at:

```bash
http://localhost:5000
```

---

# Important Notes

- Make sure MongoDB is running before starting the backend.
- Run both frontend and backend at the same time.
- If there are missing packages, run:

```bash
npm install
```

again inside both `client` and `server`.

```
