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
import { ResenyaComponent } from './componentes/resenya/resenya.component';
import { HacerCompraComponent } from './componentes/hacer-compra/hacer-compra.component';
import { LoteriaComponent } from './componentes/loteria/loteria.component';

export const routes: Routes = [
  { path: 'nuevo-prod', component: NuevoProdComponent },
  { path: 'nueva-cat', component: NuevaCatComponent },
  { path: 'ver-prod', component: ConfProdComponent },
  { path: 'ver-cat', component: ConfCatComponent },
  { path: 'nuevo-cat-prod', component: NuevoCatProdComponent },
  { path: 'ver-cat-prod', component: ConfCatProdComponent },
  { path: 'nuevo-usuario', component: NuevoUsuarioComponent },
  { path: 'mi-cuenta', component: MiCuentaComponent },
  { path: 'resenya', component: ResenyaComponent },
  { path: 'comprar', component: HacerCompraComponent },
  { path: 'loteria', component: LoteriaComponent },
  { path: 'error', component: ErrorComponent },
  { path: '', redirectTo: 'mi-cuenta', pathMatch: 'full' },
  { path: '**', redirectTo: 'error', pathMatch: 'full' },
];
