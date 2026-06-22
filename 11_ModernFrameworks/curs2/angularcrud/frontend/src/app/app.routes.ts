import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductFormComponent } from './pages/products/product-form.component';
import { ProductsListComponent } from './pages/products/products-list.component';

export const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
	},
	{
		path: 'products',
		component: ProductsListComponent,
	},
	{
		path: 'products/new',
		component: ProductFormComponent,
	},
	{
		path: 'products/:id',
		component: ProductFormComponent,
	},
	{
		path: 'products/:id/edit',
		component: ProductFormComponent,
	},
	{
		path: '**',
		redirectTo: '',
	},
];
