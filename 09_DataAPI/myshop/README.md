# MyShop

Aplicatie tip magazin online cu frontend + backend.

## Structura

- `frontend/html` pagini (lista produse, detalii produs, login, cos, admin)
- `frontend/css` stiluri
- `frontend/javascript` logica JS + Axios
- `backend` server Node.js + Express + date JSON

## Functionalitati

- Lista de produse livrata de backend din `backend/products.json`
- Pagina de detalii produs
- Cos de cumparaturi functional, salvat in `localStorage`
- Login pe baza de email + parola din `backend/users.json`
- Sesiune login in cookie `auth_token`
- Dupa login, admin poate adauga si edita produse (persistenta in `products.json`)
- Daca nu esti logat, poti vedea produse si adauga in cos

## Pornire

1. Intra in backend:
   - `cd myshop/backend`
2. Instaleaza dependintele:
   - `npm install`
3. Ruleaza serverul:
   - `npm start`
4. Deschide in browser:
   - `http://localhost:3000/html/index.html`

## Utilizatori demo

- `ana.popescu@myshop.ro` / `ana123`
- `mihai.ionescu@myshop.ro` / `mihai123`
