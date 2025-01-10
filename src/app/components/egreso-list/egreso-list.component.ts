import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EgresoTsService } from '../../services/egreso.ts.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table'; 
import { MatToolbar } from '@angular/material/toolbar';

interface Egreso {
  id: string; 
  fecha: string;
  monto: number;
  comentario: string;
}

@Component({
  selector: 'app-egreso-list',
  standalone: true,
  imports: [MatIcon, MatTableModule, MatToolbar, CurrencyPipe, DatePipe],
  templateUrl: './egreso-list.component.html',
  styleUrl: './egreso-list.component.css'
})
export class EgresoListComponent {
  @Input() refrescarLista: boolean = false
  @Output() editEgresoEvent = new EventEmitter<any>()

  displayedColumns: string[] = ['monto', 'fecha', 'descripcion', 'acciones'];
  egresoDataSource: MatTableDataSource<Egreso> = new MatTableDataSource<Egreso>();

  constructor ( private egresoService : EgresoTsService ){}

  loadegresos() {
    this.egresoService.getEgresos().subscribe((data: Egreso[]) => {
      this.egresoDataSource.data = data;
    });
  }

  ngOnInit(){
    this.loadegresos()
  }
  ngOnChanges(){
    this.loadegresos()
  }

  editEgreso(egreso:any){
    this.editEgresoEvent.emit(egreso)
  }

  deleteEgreso(id:string){
    this.egresoService.deleteEgreso(id).subscribe(()=>this.loadegresos())
  }
}
