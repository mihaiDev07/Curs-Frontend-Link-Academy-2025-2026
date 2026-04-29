# Shop JS-OOP

Un proiect de tip magazin online construit cu TypeScript și arhitectură OOP, fără framework extern (React/Vue/Angular).

---

## Tehnologii folosite

### Limbaje
- **TypeScript 5.x** — tot codul sursă, compilat la ES2017/ES2020
- **HTML5** — template-uri pagini
- **SCSS/Sass** — stilizare cu preprocesare CSS

### Framework-uri & Librării UI
- **Bootstrap 5.3** — grid, componente UI, utilitare CSS
- **Bootstrap Icons 1.11** — iconițe
- **jQuery 3.7** — manipulare DOM / utilitar
- **@popperjs/core** — tooltips/dropdowns (dependință Bootstrap)

### Arhitectură
- **OOP custom** — sistem de componente propriu cu o clasă de bază `Component<P>` care expune metodele `render()` și `mount()`
- **Context pattern** — `CartContext` gestionează starea coșului de cumpărături folosind observer pattern cu `listeners`
- **Multi-page app** — 3 entry points independente: `index.ts`, `about.ts`, `product.ts`

### Componente
| Componentă | Rol |
|---|---|
| `App` | Container principal, determină pagina curentă |
| `Header` | Navigație și afișare coș |
| `Footer` | Footer site |
| `ProductList` | Lista de produse |
| `ProductItem` | Card individual produs |
| `ProductDetails` | Pagina de detaliu produs |
| `CartList` | Lista produselor din coș |
| `CartItem` | Element individual din coș |
| `About` | Pagina About |

### Build Tools
- **Webpack 5** — bundler principal, configurație multi-entry
- **ts-loader** — compilare TypeScript → JavaScript
- **sass-loader / css-loader / style-loader / postcss-loader** — procesare stiluri
- **mini-css-extract-plugin** — extrage CSS în fișiere separate la build
- **html-webpack-plugin** — generează `index.html`, `about.html`, `product.html`
- **copy-webpack-plugin** — copiază assets statice în `dist/`
- **autoprefixer** — adaugă vendor prefixes CSS automat

### Date
- **`products.json`** — sursă de date locală pentru produse (fără backend)

---

## Structura proiectului

```
src/
├── index.ts              # Entry point pagina principală
├── about.ts              # Entry point pagina About
├── product.ts            # Entry point pagina produs
├── index.html            # Template HTML principal
├── assets/
│   ├── images/
│   └── scss/
│       └── styles.scss
├── js/
│   ├── main.ts
│   ├── nav_sticky.ts
│   ├── components/       # Componente UI (OOP)
│   │   ├── Component.ts  # Clasa de bază
│   │   ├── App.ts
│   │   ├── Header.ts
│   │   ├── Footer.ts
│   │   ├── ProductList.ts
│   │   ├── ProductItem.ts
│   │   ├── ProductDetails.ts
│   │   ├── CartList.ts
│   │   └── CartItem.ts
│   └── contexts/
│       └── CartContext.ts  # Gestionare stare coș
└── types/
    └── global.d.ts
```

---

## Scripturi disponibile

```bash
# Build development
npm run dev

# Build production
npm run build

# Verificare tipuri TypeScript
npm run typecheck
```

---

## Instalare & rulare

```bash
npm install
npm run dev
```

Fișierele generate se află în folderul `dist/`.
