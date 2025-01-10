import { Component } from '@angular/core';
import { IngresoFormComponent } from '../ingreso-form/ingreso-form.component';
import { IngresoListComponent } from '../ingreso-list/ingreso-list.component';


@Component({
  selector: 'app-ingreso',
  standalone: true,
  imports: [IngresoFormComponent, IngresoListComponent],
  templateUrl: './ingreso.component.html',
  styleUrl: './ingreso.component.css'
})
export class IngresoComponent {
  selectIngreso: any = null
  refrescarLista = false
  refreshIngresoList(){
    this.refrescarLista = !this.refrescarLista;
  }

  onEditIngreso(ingreso:any){
    this.selectIngreso = ingreso
  }
}
