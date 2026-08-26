# Vue CRUD cu Vite

Pasi pentru a recrea aplicatia in folderul `vueCRUD`, folosind backendul existent din `angularCRUD/backend`:

1. Deschide un terminal in folderul proiectului:

```bash
cd /Users/adrianadiaconitei/Desktop/linkacademy/9_modern_web_app/vueCRUD
```

2. Creeaza folderul frontend si initializeaza aplicatia Vue 3 + TypeScript cu Vite:

```bash
mkdir frontend
cd frontend
npm create vite@latest . -- --template vue-ts
```

3. Instaleaza dependintele necesare pentru aplicatie:

```bash
npm install
npm install vue-router pinia bootstrap
```

4. Copiaza asset-urile folosite de designul din Angular in `public/assets`:

```bash
mkdir -p public/assets
cp -R /Users/adrianadiaconitei/Desktop/linkacademy/9_modern_web_app/angularCRUD/frontend/src/assets/. public/assets/
```

5. Porneste backendul reutilizat din proiectul Angular:

```bash
cd /Users/adrianadiaconitei/Desktop/linkacademy/9_modern_web_app/angularCRUD/backend
npm install
node server.js
```

6. Porneste frontendul Vue intr-un al doilea terminal:

```bash
cd /Users/adrianadiaconitei/Desktop/linkacademy/9_modern_web_app/vueCRUD/frontend
npm run dev
```

7. Verifica buildul de productie al frontendului:

```bash
cd /Users/adrianadiaconitei/Desktop/linkacademy/9_modern_web_app/vueCRUD/frontend
npm run build
```

Aplicatia Vue foloseste:

- Vue 3 cu Vite
- Vue Router pentru navigare
- Pinia pentru starea partajata si comunicarea intre componente
- Bootstrap pentru acelasi aspect vizual ca frontendul Angular
- Backendul existent din `angularCRUD/backend` pe `http://localhost:3000/clothes`