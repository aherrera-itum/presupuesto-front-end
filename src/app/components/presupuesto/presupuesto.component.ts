import { Component } from '@angular/core';
import { PresupuestoFormComponent } from '../presupuesto-form/presupuesto-form.component';
import { PresupuestoListComponent } from '../presupuesto-list/presupuesto-list.component';


@Component({
  selector: 'app-presupuesto',
  standalone: true,
  imports: [PresupuestoFormComponent, PresupuestoListComponent],
  templateUrl: './presupuesto.component.html',
  styleUrl: './presupuesto.component.css'
})
export class PresupuestoComponent {
  selectedPresupuesto: any = null
  refrescarLista = false

  refreshPresupuestoList(){
    this.refrescarLista = !this.refrescarLista
  }

  onEditPresupuesto(presupuesto: any){
    console.log(presupuesto)
    this.selectedPresupuesto = presupuesto
  }
}
