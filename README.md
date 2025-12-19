# MyShelf

MyShelf is a small full‑stack app for tracking a personal book library. Books are split between a main library and a wishlist. You can add books (from OpenLibrary search results), move them between lists, remove them, and rate them 0–5 stars.

## Features
- Search for books using the OpenLibrary API
- Add search results to either "Library" (main) or "Wishlist"
- Move books between lists
- Delete books
- Rate books 0–5 stars
- Book cover images served from OpenLibrary (with a fallback cover)

## Tech stack & languages
- Frontend
  - React (JSX)
  - Vite (dev server / build)
  - CSS
  - Browser Fetch API
- Backend
  - Node.js
  - Express
  - PostgreSQL (via the `pg` package)
  - body-parser / express.json for request bodies
- Data: book search and cover data comes from the OpenLibrary API

## Project layout
- /client — React app (Vite)
- /server — Express API
- Server serves built client from `/client/dist` when the client is built

## API (server)
- GET /library/main — get main library
- GET /library/wish — get wishlist
- GET /library/:id — get a single book
- POST /library — add book
  - Body: { book_data: <object>, shelf: 'main'|'wish' }
- PUT /library/shelf/:id — change shelf
  - Body: { shelf: 'main'|'wish' }
- PUT /library/rating/:id — update rating
  - Body: { rating: 0-5 }
- DELETE /library/:id — remove book

Responses are JSON arrays / objects returned from PostgreSQL rows.

## Database
- PostgreSQL is required. Example table schema:

```sql
CREATE TABLE library (
  id SERIAL PRIMARY KEY,
  book_data JSONB NOT NULL,
  rating INTEGER DEFAULT 0,
  shelf TEXT NOT NULL CHECK (shelf IN ('main','wish'))
);
```

The `book_data` column stores the OpenLibrary search result data for each book.

## Local development / quick start
Prerequisites: Node.js, npm, PostgreSQL.

1. Clone repository
2. Server
   - cd server
   - npm install
   - Create a `.env` or set `DATABASE_URL` environment variable (e.g. `postgres://user:pass@host:5432/dbname`)
   - Ensure the `library` table exists (see schema above)
   - Start server: `node index.js` (server listens on port 3002)
3. Client
   - cd client
   - npm install
   - Start dev server: `npm run dev` (Vite default port, typically 5173)
   - Or build for production: `npm run build` -> output to `client/dist` (server serves this folder)

Open http://localhost:3002 (server) or the Vite dev URL while developing the client.

## Notes & troubleshooting
- Book images are retrieved from OpenLibrary (covers.openlibrary.org). If you need to access raw image bytes (canvas/fetch), OpenLibrary must provide appropriate CORS headers, otherwise proxy the image through your server.
- If changes to database don't show in the UI, verify that the client re-fetches lists after operations and check the browser Network tab and server logs for errors.

## Contributing
Open a PR or issue with reproduction steps. Keep changes focused and include tests where applicable.

## License
MIT (or replace with your preferred license)