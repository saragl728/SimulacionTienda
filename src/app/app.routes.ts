import { Routes } from '@angular/router';
import { NuevoProdComponent } from './componentes/nuevo-prod/nuevo-prod.component';
import { NuevaCatComponent } from './componentes/nueva-cat/nueva-cat.component';
import { ConfProdComponent } from './componentes/conf-prod/conf-prod.component';
import { ConfCatComponent } from './componentes/conf-cat/conf-cat.component';
import { NuevoCatProdComponent } from './componentes/nuevo-cat-prod/nuevo-cat-prod.component';
import { ConfCatProdComponent } from './componentes/conf-cat-prod/conf-cat-prod.component';
import { NuevoUsuarioComponent } from './componentes/nuevo-usuario/nuevo-usuario.component';
import { MiCuentaComponent } from './componentes/mi-cuenta/mi-cuenta.component';
import { ErrorComponent } from './componentes/error/error.component';

export const routes: Routes = [
  { path: 'nuevo-prod', component: NuevoProdComponent },
  { path: 'nueva-cat', component: NuevaCatComponent },
  { path: 'conf-prod', component: ConfProdComponent },
  { path: 'conf-cat', component: ConfCatComponent },
  { path: 'nuevo-cat-prod', component: NuevoCatProdComponent },
  { path: 'conf-cat-prod', component: ConfCatProdComponent },
  { path: 'nuevo-usuario', component: NuevoUsuarioComponent},
  { path: 'mi-cuenta', component: MiCuentaComponent },
  { path: 'error', component: ErrorComponent },
  { path: '', redirectTo: 'mi-cuenta', pathMatch: 'full' },
  { path: '**', redirectTo: 'error', pathMatch: 'full' },
];
