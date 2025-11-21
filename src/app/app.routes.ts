import { Routes } from '@angular/router';
import {VilcaListarComponent} from './component/vilca-listar/vilca-listar.component';
import {VilcaCrearComponent} from './component/vilca-crear/vilca-crear.component';

export const routes: Routes = [
  { path: '', redirectTo: 'listado', pathMatch: 'full' },
  { path: 'listado', component: VilcaListarComponent },
  { path: 'registrar', component: VilcaCrearComponent }
];
