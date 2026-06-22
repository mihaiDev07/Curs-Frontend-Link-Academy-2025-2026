## promtul :te rog sa imi generezi , in acest folder, o aplicatie simpla : html, css, javascript + nodejs care sa contina o simpla pagina html cu 2 butoane si la click pe butoane sa se salveze intr-un fisier de tip log numarul de clickuri pe butoanele respective : buton 1 - 100 click , buton 2 : 26click,dar doresc sa am urmatoarea structura: 2 foldere : frontend unde sa am partea de html css javascript iar requesturile se fie cu axios , ca modul instalat cu npm, iar folderul de backend cu nodejs ce primeste requesturlie si salveaza clickurile intrun fisier de log si returneaza si numarul de clickuri pentru fiecare buton, acest numar il afisam pe buton

# Aplicație Contador Clickuri

Aplicație simplă cu frontend și backend pentru numărarea clickurilor pe butoane.

## Structura

```
app_buttons/
├── frontend/
│   ├── index.html      # Pagina HTML cu 2 butoane
│   ├── style.css       # Stiluri CSS
│   └── script.js       # JavaScript cu axios
└── backend/
    ├── package.json    # Dependențe Node.js
    ├── server.js       # Server Express
    └── clicks.log      # Fișier log (creat automat)
```

## Funcționalități

✓ 2 butoane interactive  
✓ Click-uri salvate în fișier log JSON  
✓ Afișarea numărului de clickuri pe fiecare buton  
✓ Communicare Frontend-Backend via axios  
✓ CORS enabled pentru securitate  

## Instalare și Rulare

### 1. Backend - Instalează dependențele

```bash
cd backend
npm install
```

### 2. Rulează serverul

```bash
npm start
```

Serverul va rula pe `http://localhost:3000`

### 3. Frontend - Deschide fișierul HTML

Deschide `frontend/index.html` în browser sau servește cu un server local:

```bash
# Opțional: dacă ai python
cd frontend
python -m http.server 8000

# Opțional: dacă ai Node.js http-server
npx http-server frontend
```

Accesează `http://localhost:8000` în browser

## API Endpoints

| Endpoint | Metoda | Descriere |
|----------|--------|-----------|
| `/api/clicks` | GET | Obține numărul de clickuri pentru ambele butoane |
| `/api/click/button1` | POST | Înregistrează click pe buton 1 |
| `/api/click/button2` | POST | Înregistrează click pe buton 2 |
| `/api/reset` | POST | Resetează contoarele la 0 |

## Fișierul Log

Fișierul `backend/clicks.log` conține datele în format JSON:

```json
{
  "button1": 100,
  "button2": 26,
  "lastUpdated": "2026-05-11T10:30:00.000Z"
}
```

## Note

- Asigură-te că ambele servere (backend pe 3000, frontend pe 8000) rulează
- Axios este încărcat din CDN, nu este necesar npm pentru frontend
- Clickurile sunt persistente și se salvează în fișierul log
