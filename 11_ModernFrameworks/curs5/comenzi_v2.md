```` 
    npm create vite@latest react-app -- --template react-ts
    cd react-app
    npm install
    npm run dev
```

``` //vite.config.ts
    server: {
        port: 5180,
},
```

### structrua
```
mkdir -p src/components
mkdir -p src/pages
mkdir -p src/context
touch src/components/Salut.tsx
touch src/components/Car.tsx
touch src/components/Form.tsx
touch src/components/Masina.tsx
touch src/components/MyForm.tsx
````

### Adauga rutele
```
npm i -D react-router-dom@latest
```

```
touch src/pages/Layout.tsx
touch src/pages/Home.tsx
touch src/pages/Blogs.tsx
touch src/pages/Contact.tsx
touch src/context/AutorContext.tsx
touch src/pages/Articole.tsx
touch src/pages/NoPage.tsx
```

### Modificam main.tsx si adaugam rutele
```tsx