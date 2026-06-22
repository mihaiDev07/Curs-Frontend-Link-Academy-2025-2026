# Frontend Angular CRUD

Acest frontend este o aplicatie Angular standalone care consuma API-ul Node.js din `backend/server.js` si afiseaza un catalog de produse fashion.

Documentul de mai jos descrie pas cu pas cum poate fi refacut frontend-ul, inclusiv comenzile pentru componente, interfete, servicii si pachetele folosite.

## 1. Crearea proiectului Angular

Din folderul `curs2/angularcrud` proiectul poate fi creat cu Angular CLI astfel:

```bash
npm install -g @angular/cli
ng new frontend
cd frontend
```

Structura actuala arata ca proiectul foloseste Angular standalone, fara `AppModule`, cu bootstrapping din `src/main.ts` si configurare in `src/app/app.config.ts`.

## 2. Instalarea dependintelor folosite in proiect

Pachetele vizibile in proiect sunt Angular, Bootstrap, PrimeNG si tema Aura.

```bash
npm install bootstrap primeng @primeuix/themes @angular/animations
```

Dupa instalare, stilurile globale au fost completate in `src/styles.css` cu importul Bootstrap:

```css
@import 'bootstrap/dist/css/bootstrap.min.css';
```

## 3. Pornirea structurii de baza a aplicatiei

Aplicatia porneste din aceste fisiere:

- `src/main.ts` pentru `bootstrapApplication(App, appConfig)`
- `src/app/app.config.ts` pentru `provideHttpClient`, `provideRouter`, `provideAnimationsAsync`, `providePrimeNG`
- `src/app/app.routes.ts` pentru rutele aplicatiei
- `src/app/app.ts` pentru componenta radacina

Aceasta combinatie inlocuieste modulul clasic `AppModule`.

## 4. Generarea componentelor principale

Pe baza structurii existente, comenzile Angular CLI folosite pentru scaffold pot fi recreate astfel:

```bash
ng generate component app/layout/header
ng generate component app/layout/footer
ng generate component app/pages/home
ng generate component app/pages/products/products-list --skip-tests
ng generate component app/pages/products/product-form --skip-tests
```

Rezultatul din proiect este:

- `src/app/layout/header`
- `src/app/layout/footer`
- `src/app/pages/home`
- `src/app/pages/products/products-list.component.*`
- `src/app/pages/products/product-form.component.*`

Observatie: pentru componentele de produse nu exista fisiere `spec`, ceea ce sugereaza folosirea lui `--skip-tests` sau stergerea lor ulterioara.

## 5. Generarea serviciului pentru comunicarea cu backend-ul

Serviciul actual este `src/app/services/products.service.ts` si poate fi generat astfel:

```bash
ng generate service app/services/products --skip-tests
```

In acest serviciu s-au implementat manual metodele CRUD:

- `getProducts(page, perPage)`
- `getProductById(id)`
- `createProduct(payload)`
- `updateProduct(id, payload)`
- `deleteProduct(id)`

Serviciul foloseste `HttpClient` si endpointul backend:

```ts
private readonly apiUrl = 'http://localhost:3000/clothes';
```

## 6. Generarea interfetelor pentru modelul de date

Fisierul existent este `src/app/models/product.model.ts`. El poate fi creat cu Angular CLI astfel:

```bash
ng generate interface app/models/product --type=model
```

Apoi au fost adaugate manual cele 3 tipuri folosite in proiect:

- `Product`
- `ProductsResponse`
- `ProductPayload`

Rolul lor:

- `Product` descrie un produs venit din backend
- `ProductsResponse` descrie raspunsul paginat pentru lista
- `ProductPayload` descrie datele trimise la create/update

## 7. Configurarea rutelor aplicatiei

In `src/app/app.routes.ts` au fost definite manual rutele:

```ts
'' -> HomeComponent
'products' -> ProductsListComponent
'products/new' -> ProductFormComponent
'products/:id' -> ProductFormComponent
'products/:id/edit' -> ProductFormComponent
```

Practic, `ProductFormComponent` este reutilizata in 3 moduri:

- creare
- vizualizare
- editare

## 8. Conectarea componentelor in componenta radacina

In `src/app/app.ts`, componenta principala importa:

- `RouterOutlet`
- `HeaderComponent`
- `FooterComponent`

Astfel, layout-ul general este compus din antet, continut de ruta si footer.

## 9. Implementarea paginii Home

Componenta `HomeComponent` este simpla si foloseste `RouterLink` pentru navigarea catre pagina de produse.

- `src/app/pages/home/home.component.ts`
- `src/app/pages/home/home.component.html`
- `src/app/pages/home/home.component.css`

## 10. Implementarea listei de produse

In `ProductsListComponent` s-au adaugat urmatoarele responsabilitati:

- incarcare produse la `ngOnInit()`
- paginare cu `page` si `perPage`
- stari pentru `loading`, `error`, `deletingId`
- stergere produs
- conversie URL pentru imagini prin `resolveImageUrl()`

Biblioteci importate in componenta:

- `CommonModule`
- `RouterLink`
- `FormsModule`
- `RatingModule`

Comportamentul principal este:

1. Apeleaza `productsService.getProducts(...)`
2. Populeaza `products`, `total`, `totalPages`
3. Afiseaza carduri Bootstrap pentru fiecare produs
4. Afiseaza rating-ul cu PrimeNG

## 11. Implementarea formularului de produs

In `ProductFormComponent` s-au adaugat manual:

- `ReactiveFormsModule`
- formular cu `FormBuilder`
- validari cu `Validators`
- determinarea modului `create | view | edit`
- incarcare produs dupa `id` din ruta
- salvare prin `createProduct` sau `updateProduct`
- preview pentru imagine

Campurile formularului sunt:

- `image`
- `name`
- `price`
- `rating`

Acesta este pasul in care frontend-ul devine efectiv CRUD.

## 12. Configurarea PrimeNG

PrimeNG este initializat in `src/app/app.config.ts`.

Configurarea actuala este compatibila cu Angular standalone:

```ts
providePrimeNG({
	theme: {
		preset: Aura,
	},
})
```

Pentru animatii se foloseste:

```ts
provideAnimationsAsync()
```

## 13. Configurarea imaginilor din assets

Pentru ca imaginile din `src/assets` sa fie servite corect, in `angular.json` a fost adaugata copierea folderului assets:

```json
{
	"glob": "**/*",
	"input": "src/assets",
	"output": "assets"
}
```

Produsele din backend folosesc cai de forma:

```text
assets/images/products/image1.jpg
```

## 14. Pornirea aplicatiei in dezvoltare

Pentru rulare locala, backend-ul si frontend-ul trebuie pornite separat.

Backend:

```bash
cd ../backend
npm install
node server.js
```

Frontend:

```bash
cd ../frontend
npm install
npm start
```

Aplicatia frontend ruleaza implicit pe:

```text
http://localhost:4200
```

Backend-ul ruleaza pe:

```text
http://localhost:3000
```



## 15. Build si verificare

Pentru build de productie:

```bash
npm run build
```

Pentru testare unitara:

```bash
npm test
```

## 16. Rezumat scurt al ordinii de dezvoltare

O ordine corecta de construire a acestui frontend este:

1. Creezi proiectul Angular.
2. Instalezi Bootstrap, PrimeNG si animatiile Angular.
3. Generezi layout-ul: header, footer, home.
4. Generezi modelul `product.model.ts`.
5. Generezi `products.service.ts` pentru API.
6. Generezi componentele `products-list` si `product-form`.
7. Definesti rutele in `app.routes.ts`.
8. Configurezi `HttpClient`, router-ul si PrimeNG in `app.config.ts`.
9. Implementezi lista, formularul si paginarea.
10. Configurezi `src/assets` pentru imagini.
11. Rulezi backend-ul si frontend-ul impreuna.

