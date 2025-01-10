import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PresupuestoTsService  } from '../../services/presupuesto.ts.service';
import { MatIcon } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table'; 
import { MatToolbar } from '@angular/material/toolbar';
import { CurrencyPipe } from '@angular/common';

interface Presupuesto {
  id: string; 
  mes: string;
  monto: number;
  comentario: string;
}

@Component({
  selector: 'app-presupuesto-list',
  standalone: true,
  imports: [MatIcon, MatTableModule, MatToolbar, CurrencyPipe],
  templateUrl: './presupuesto-list.component.html',
  styleUrl: './presupuesto-list.component.css'
})
export class PresupuestoListComponent {
  @Input() refrescarLista: boolean = false
  @Output() editPresupuestoEvent = new EventEmitter<any>()

  displayedColumns: string[] = ['mes', 'monto', 'comentario', 'acciones'];
  presupuestoDataSource: MatTableDataSource<Presupuesto> = new MatTableDataSource<Presupuesto>();


  constructor ( private presupuestoService : PresupuestoTsService ){}

  loadPresupuestos() {
    this.presupuestoService.getPresupuestos().subscribe((data: Presupuesto[]) => {
      this.presupuestoDataSource.data = data;
    });
  }

  ngOnInit(){
    this.loadPresupuestos()
  }
  ngOnChanges(){
    this.loadPresupuestos()
  }

  editPresupuesto(presupuesto:any){
    this.editPresupuestoEvent.emit(presupuesto)
  }

  deletePresupuesto(id:string){
    this.presupuestoService.deletePresupuesto(id).subscribe(()=>this.loadPresupuestos())
  }

  getMonthName(month: number): string {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return months[month - 1] || 'Mes desconocido';
  }
}
