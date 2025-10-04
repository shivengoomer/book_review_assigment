# 📚 Book Review Platform

A full-stack Book Review Platform built with **MERN (MongoDB, Express, React, Node.js)**.
Users can sign up, log in, add books, and post reviews. This project demonstrates authentication, CRUD operations, API integration, and frontend-backend communication.

## 🎯 Objective

Build a Book Review Platform where users can:

- Sign up and log in
- Add, edit, and delete books
- Post, edit, and delete reviews
- View all books with pagination
- See average ratings and review details

The goal is to showcase proficiency in **MERN stack, authentication, RESTful APIs, and frontend integration**.

## 🔹 Features

### User Authentication

- Sign up with **Name, Email (unique), Password (hashed)**
- Login with **Email & Password**
- JWT-based authentication
- Protected API routes using middleware

### Book Management

- Add books: **Title, Author, Description, Genre, Published Year**
- Only book creator can **edit/delete** their books
- All users can **view books**
- Pagination: **5 books per page**

### Review System

- Add reviews: **Rating (1-5 stars), Review Text**
- Users can **edit/delete their own reviews**
- Show **all reviews** and **average rating** on book details

## 🔹 Technical Stack

### Backend

- Node.js + Express
- MongoDB + Mongoose
- Authentication: bcrypt + JWT
- MVC folder structure
- RESTful API design

### Frontend

- React + React Router
- Context API for state management
- Axios/Fetch for API calls
- Tailwind CSS / Bootstrap for styling

### Database

- MongoDB Atlas
- Schemas:

  - **User:** `{ name, email, password }`
  - **Book:** `{ title, author, description, genre, year, addedBy }`
  - **Review:** `{ bookId, userId, rating, reviewText }`

## 🔹 Frontend Pages

- **Signup Page:** Register new users
- **Login Page:** Authenticate users and store JWT
- **Book List Page (Home):** View all books with pagination
- **Book Details Page:** Book info, reviews, and average rating
- **Add/Edit Book Page:** Form for logged-in users
- **Profile Page :** Show user's added books and reviews

## 🔹 Folder Structure

```
/backend
  ├─ src/
    ├─ controllers/
    ├─ models/
    ├─ routes/
    ├─ middleware/
    ├─ server.js
/frontend
  ├─ src/
      ├─ components/
      ├─ pages/
      ├─ context/
      ├─ api/
      ├─ App.jsx
      └─ main.jsx
```

## 🔹 Setup Instructions

### Backend

1. Navigate to backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` with:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

4. Run server:

```bash
npm run dev
```

### Frontend

1. Navigate to frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run React app:

```bash
npm run dev
```

4. Access at `http://localhost:5173` (Vite default port)

## 🔹 API Endpoints

### Auth

- `POST /api/auth/signup` – Register user
- `POST /api/auth/login` – Login user

### Books

- `GET /api/books` – Get paginated list
- `POST /api/books` – Add book (protected)
- `GET /api/books/:id` – Get book details
- `PUT /api/books/:id` – Edit book (owner only)
- `DELETE /api/books/:id` – Delete book (owner only)

### Reviews

- `POST /api/reviews/:bookId` – Add review (protected)
- `PUT /api/reviews/:id` – Edit review (owner only)
- `DELETE /api/reviews/:id` – Delete review (owner only)

## - Shiven Goomer
