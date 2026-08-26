
## Comenzi: Vue 3 + Vite (pas cu pas, de la zero)

1. Creeaza folderul proiectului si intra in el:

```bash
mkdir vueCRUD
cd vueCRUD
```

2. Genereaza frontend-ul Vue 3 cu TypeScript folosind Vite:

```bash
npm create vite@latest frontend -- --template vue-ts
```

3. Intra in proiectul frontend:

```bash
cd frontend
```

4. Instaleaza dependintele de baza:

```bash
npm install
```

5. Instaleaza modulele folosite in aplicatie:

```bash
npm install pinia vue-router bootstrap
```

6. (Optional) Daca ai nevoie de iconite Bootstrap:

```bash
npm install bootstrap-icons
```

7. Creeaza structura de directoare folosita in proiect:

```bash
mkdir -p src/router
mkdir -p src/components/layout
mkdir -p src/components/products
mkdir -p src/views/products
mkdir -p src/stores
mkdir -p src/types
mkdir -p src/utils
```

8. Creeaza fisierele principale:

```bash
touch src/router/index.ts
touch src/stores/products.ts
touch src/types/product.ts
touch src/utils/http.ts
touch src/utils/products.ts
touch src/components/layout/HeaderNav.vue
touch src/components/layout/FooterBar.vue
touch src/components/products/StarRating.vue
touch src/components/products/ProductToolbar.vue
touch src/components/products/ProductGrid.vue
touch src/components/products/ProductPagination.vue
touch src/components/products/ProductImagePreview.vue
touch src/components/products/ProductFormPanel.vue
touch src/views/HomeView.vue
touch src/views/products/ProductsListView.vue
touch src/views/products/ProductFormView.vue
```

9. Ruleaza proiectul in development:

```bash
npm run dev
```

10. Verifica build-ul de productie:

```bash
npm run build
```

## Comenzi backend (reutilizare din angularCRUD/backend)

In alt terminal:

```bash
cd /angularCRUD/backend
npm install
node server.js
```

Backend-ul va rula pe:

```text
http://localhost:3000
```