Backend (Express + MongoDB)

Setup
- Create a `.env` file in `backend/` with:
  - `PORT=5000`
  - `MONGO_URI=your_mongodb_atlas_connection_string`
  - `JWT_SECRET=your_long_random_secret`

Install & Run
```bash
cd backend
npm install
npm run dev
```

Health
- GET `/api/health` -> `{ status: "ok" }`

Auth
- POST `/api/auth/signup` { name, email, password } -> `{ token, user }`
- POST `/api/auth/login` { email, password } -> `{ token, user }`
- GET `/api/auth/me` (Bearer token) -> `{ user }`

Books
- GET `/api/books?page=1` -> `{ items, page, totalPages, total }`
- GET `/api/books/:id` -> `{ book, reviews }`
- POST `/api/books` (auth) { title, author, description, genre, year }
- PUT `/api/books/:id` (owner only)
- DELETE `/api/books/:id` (owner only)

Reviews
- POST `/api/reviews/:bookId` (auth) { rating:1-5, reviewText? } (upsert)
- DELETE `/api/reviews/:bookId` (auth, own review)

Notes
- Ownership enforced on book update/delete via `addedBy`.
- Average rating and review count updated on review create/update/delete.


