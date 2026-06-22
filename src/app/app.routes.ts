import { Routes } from '@angular/router';
import { List } from './pages/list/list';
import { Details } from './pages/details/details.component';

export const routes: Routes = [
    { path: '', component: List },
    { path: 'card/:id', component: Details }
];
