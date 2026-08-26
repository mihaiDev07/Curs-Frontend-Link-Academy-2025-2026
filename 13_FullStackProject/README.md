# Fashion Catalog — Full-Stack Course Project

Full-stack fashion catalog with a React frontend and an Express API. Users can browse products, create an account, sign in, manage a shopping cart, and place orders. Administrators can manage products, users, and orders.

## Project status

The archive includes the complete backend source code and a compiled production build of the frontend. The original React/Vite source files are not included, so the frontend can be run and tested but cannot be developed normally until its `src` directory and original Vite configuration are recovered.

## Structure

```text
13_FullStackProject/
├── BACKEND/   # Express API and JSON data storage
├── FRONTEND/  # Compiled React production build
└── README.md
```

## Features

- Product catalog with pagination and product details
- Shopping cart
- User registration with profile image upload
- JWT authentication
- User profile management
- Order creation and order history
- Role-based administrator access
- Product, user, and order administration endpoints
- CORS configuration for local and deployed frontends

## Technologies

- React and React Router
- Vite production build
- JavaScript
- Node.js and Express
- JSON file storage
- JWT and bcrypt
- Multer
- Axios

## Run locally

### 1. Backend

Open a terminal in `BACKEND`, create `.env` from `.env.example`, and set a strong `JWT_SECRET`.

```bash
npm install
npm run dev
```

The API runs at `http://localhost:3000` by default.

### 2. Frontend

Open another terminal in `FRONTEND`:

```bash
npm start
```

The frontend runs at `http://localhost:5173`. Its local build automatically connects to the API at `http://localhost:3000`.

## API routes

| Route | Purpose |
| --- | --- |
| `GET /auth/health` | API health check |
| `POST /auth/register` | Register a user |
| `POST /auth/login` | Authenticate a user |
| `GET /clothes` | Paginated product list |
| `GET /clothes/:id` | Product details |
| `POST /clothes` | Create a product (admin) |
| `PUT /clothes/:id` | Update a product (admin) |
| `DELETE /clothes/:id` | Delete a product (admin) |
| `GET /users` | List users (admin) |
| `GET /users/:id` | Read an allowed user profile |
| `PUT /users/:id` | Update an allowed user profile |
| `DELETE /users/:id` | Delete a user (admin) |
| `POST /orders` | Create an order |
| `GET /orders/mine` | Current user's orders |
| `GET /orders/all` | All orders (admin) |

## Environment variables

```env
PORT=3000
JWT_SECRET=replace_with_a_long_random_secret
CORS_ORIGINS=https://your-frontend.example.com
```

Multiple deployed frontend origins can be separated with commas.

## Security notes

- Never commit `.env` files or real JWT secrets.
- Do not publish real user data, password hashes, orders, or uploaded profile photographs.
- The included sample data files have been sanitized in this repaired copy.
- Replace JSON file storage with a database before using the application in production.

## Important frontend limitation

The frontend folder is a minified production artifact. Recover the original frontend project before making feature or design changes. The missing project should normally include files such as:

```text
src/
public/
package.json
vite.config.js
```

Do not treat edits to the compiled JavaScript bundle as a replacement for the original source code.
