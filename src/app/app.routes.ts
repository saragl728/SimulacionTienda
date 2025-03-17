import { Routes } from '@angular/router';
import { NuevoProdComponent } from './componentes/nuevo-prod/nuevo-prod.component';
import { NuevaCatComponent } from './componentes/nueva-cat/nueva-cat.component';
import { ConfProdComponent } from './componentes/conf-prod/conf-prod.component';
import { ConfCatComponent } from './componentes/conf-cat/conf-cat.component';
import { NuevoCatProdComponent } from './componentes/nuevo-cat-prod/nuevo-cat-prod.component';
import { ConfCatProdComponent } from './componentes/conf-cat-prod/conf-cat-prod.component';

export const routes: Routes = [
  { path: 'nuevo-prod', component: NuevoProdComponent },
  { path: 'nueva-cat', component: NuevaCatComponent },
  { path: 'conf-prod', component: ConfProdComponent },
  { path: 'conf-cat', component: ConfCatComponent },
  { path: 'nuevo-cat-prod', component: NuevoCatProdComponent },
  { path: 'conf-cat-prod', component: ConfCatProdComponent },
  { path: '', redirectTo: 'nuevo-prod', pathMatch: 'full' },
  { path: '**', redirectTo: 'nuevo-prod', pathMatch: 'full' },
];
