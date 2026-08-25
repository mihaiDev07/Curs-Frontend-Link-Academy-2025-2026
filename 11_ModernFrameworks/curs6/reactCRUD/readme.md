# reactCRUD - Frontend React TypeScript

Aplicatie CRUD pentru produse Fashion, cu aceleasi functionalitati ca in varianta Angular si Vue, dar implementata in React + TypeScript.

## Backend folosit

- Backend-ul ramane in angularCRUD/backend.
- Endpoint API folosit de frontend: http://localhost:3000/clothes
- In acest folder exista doar frontend-ul React.

## Functionalitati frontend

- Home page cu acelasi layout si buton catre produse.
- Lista produse cu incarcare API, paginare, rating, vizualizare, editare si stergere.
- Formular produs in 3 moduri:
  - Create: /products/new
  - View: /products/:id
  - Edit: /products/:id/edit
- Preview imagine in formular.
- Mesaje de eroare pentru request-uri esuate.

## Tehnologii

- React + Vite
- TypeScript
- Bootstrap 5
- Axios
- React Router

## Comenzi si pasi folositi

### 1) Creare frontend React

```bash
cd curs6/reactCRUD
npm create vite@latest frontend
sau
npm create vite@latest frontend -- --template react
```

### 2) Schimbare port
```bash
server: {
    port: 5180,
  },
```


### 3) Instalare dependinte frontend

```bash
cd curs6/reactCRUD/frontend
npm install
npm install bootstrap axios react-router-dom
npm install -D typescript

mkdir -p src/components src/pages src/services src/utils
touch src/App.tsx src/main.tsx src/App.css src/index.css src/vite-env.d.ts
touch src/components/Header.tsx src/components/Footer.tsx src/components/Rating.tsx
touch src/pages/HomePage.tsx src/pages/ProductsListPage.tsx src/pages/ProductFormPage.tsx
touch src/services/productsApi.ts src/utils/images.ts
touch tsconfig.json tsconfig.app.json

```

### 4) Copiere assets din angularCRUD/frontend

```bash
cd curs6/reactCRUD
mkdir -p frontend/public
cp -R ../../angularCRUD/frontend/src/assets frontend/public/assets
```

### 5) Rulare backend (din angularCRUD)

```bash
cd angularCRUD/backend
npm install
node server.js
```

Server backend: http://localhost:3000

### 6) Rulare frontend

```bash
cd curs6/reactCRUD/frontend
npm run dev
```

Frontend: http://localhost:5180

### 7) Verificare TypeScript si build

```bash
cd curs6/reactCRUD/frontend
npm run typecheck
npm run build
```

## Rute frontend

- / -> Home
- /products -> lista produse
- /products/new -> creare produs
- /products/:id -> vizualizare produs
- /products/:id/edit -> editare produs

# Continuare - Register si Login

### 8) Frontend Register/Login - creare fisiere (pas cu pas)

```bash
cd reactCRUD/frontend

mkdir -p src/context src/services src/pages

touch src/context/AuthContext.tsx
touch src/services/authApi.ts
touch src/services/authStorage.ts
touch src/pages/RegisterPage.tsx
touch src/pages/LoginPage.tsx
```

### 9) Frontend Register/Login - integrare in aplicatie

Actualizeaza fisierele de mai jos:

- src/main.tsx
  - importeaza AuthProvider
  - inveleste <App /> in <AuthProvider>

- src/App.tsx
  - adauga rutele:
    - /register
    - /login

- src/components/Header.tsx
  - adauga link-uri Register si Login in meniu
  - dupa autentificare afiseaza Logout si numele userului

### 10) Frontend Register/Login - rulare si verificare

```bash
cd reactCRUD/frontend
npm run typecheck
npm run dev
```

Testeaza in browser:

- http://localhost:5180/register
- http://localhost:5180/login

## Continuare - Backend Register si Login

copiem angularCRUD/backend in reactCRUD/backend si 
facem modificarile necesare pentru a avea un backend separat pentru React.

### 11) Instalare dependinte backend

```bash
cd /backend
npm install cors bcryptjs jsonwebtoken multer
```

### 12) Creare fisiere/foldere necesare backend

```bash
cd /backend
touch users.json
echo "[]" > users.json
mkdir -p uploads/users
```

### 13) Scripturi recomandate in package.json (backend)

Adauga scripturi:

```json
"scripts": {
  "start": "node server.js",
  "dev": "node --watch server.js"
}
```

### 14) Implementare API auth in server.js (manual)

Rute necesare:

- POST /auth/register
  - request de tip multipart/form-data
  - campuri: name, surname, email, password, repeatPassword
  - fisier: photo (input file)
  - valideaza datele
  - hash parola cu bcryptjs
  - salveaza fisierul in uploads/users
  - in users.json salveaza doar numele fisierului pentru photo
  - returneaza JWT + date user (fara parola)

- POST /auth/login
  - primeste: email, password
  - cauta userul in users.json
  - verifica parola hash cu bcryptjs.compare
  - returneaza JWT + date user

- GET /auth/health
  - endpoint simplu de verificare server

Pe backend, expune static folderul uploads ca sa poti afisa poza din frontend.

### 15) Pornire backend

```bash
cd angularCRUD/backend
npm run dev
```

Backend auth ruleaza pe:

- http://localhost:3000

### 16) Test rapid endpoint-uri (optional)

Register cu upload de fisier:

```bash
curl -X POST http://localhost:3000/auth/register \
  -F "name=Ion" \
  -F "surname=Popescu" \
  -F "email=ion@example.com" \
  -F "password=parola123" \
  -F "repeatPassword=parola123" \
  -F "photo=@/cale/catre/poza.jpg"
```

Login:

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"ion@example.com",
    "password":"parola123"
  }'
```
