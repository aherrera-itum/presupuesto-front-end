import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IngresoTsService } from '../../services/ingreso.ts.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table'; 
import { MatToolbar } from '@angular/material/toolbar';


interface Ingreso {
  id: string; 
  fecha: string;
  monto: number;
  comentario: string;
}

@Component({
  selector: 'app-ingreso-list',
  standalone: true,
  imports: [MatIcon, MatTableModule, MatToolbar, CurrencyPipe, DatePipe],
  templateUrl: './ingreso-list.component.html',
  styleUrl: './ingreso-list.component.css'
})

export class IngresoListComponent {
  @Input() refrescarLista: boolean = false
  @Output() editIngresoEvent = new EventEmitter<any>()

  displayedColumns: string[] = ['monto', 'fecha', 'descripcion', 'acciones'];
  ingresoDataSource: MatTableDataSource<Ingreso> = new MatTableDataSource<Ingreso>();

  constructor ( private ingresoService : IngresoTsService ){}

  loadIngresos() {
    this.ingresoService.getIngresos().subscribe((data: Ingreso[]) => {
      this.ingresoDataSource.data = data;
    });
  }

  ngOnInit(){
    this.loadIngresos()
  }
  ngOnChanges(){
    this.loadIngresos()
  }

  editIngreso(ingreso:any){
    this.editIngresoEvent.emit(ingreso)
  }

  deleteIngreso(id:string){
    this.ingresoService.deleteIngreso(id).subscribe(()=>this.loadIngresos())
  }

}
