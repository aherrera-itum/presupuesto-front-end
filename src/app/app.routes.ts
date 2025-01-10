import { Routes } from '@angular/router';
import { PresupuestoComponent } from './components/presupuesto/presupuesto.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { EgresoComponent } from './components/egreso/egreso.component';
import { HomeComponent } from './components/home/home.component';
import { ConsultaListaComponent } from './components/consulta-lista/consulta-lista.component';


export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path: 'presupuesto', component:PresupuestoComponent},
    {path: 'ingreso', component:IngresoComponent},
    {path: 'egreso', component:EgresoComponent},
    {path: 'consulta', component:ConsultaListaComponent },
    {path: '**', redirectTo: '/'}
];
