import { Component } from '@angular/core';
import { EgresoFormComponent } from '../egreso-form/egreso-form.component';
import { EgresoListComponent } from '../egreso-list/egreso-list.component';

@Component({
  selector: 'app-egreso',
  standalone: true,
  imports: [EgresoFormComponent, EgresoListComponent],
  templateUrl: './egreso.component.html',
  styleUrl: './egreso.component.css'
})
export class EgresoComponent {
  selectEgreso: any = null
  refrescarLista = false
  refreshEgresoList(){
    this.refrescarLista = !this.refrescarLista;
  }
  onEditEgreso(egreso:any){
    this.selectEgreso = egreso
  }
}
