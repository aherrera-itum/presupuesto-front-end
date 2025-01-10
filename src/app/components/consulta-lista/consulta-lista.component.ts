import { Component } from '@angular/core';
import { ConsultaService } from '../../services/consulta.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table'; 
import { MatToolbar } from '@angular/material/toolbar';

interface Movimientos {
  id: string; 
  fecha: string;
  monto: number;
  descripcion: string;
  tipo: string;
}

@Component({
  selector: 'app-consulta-lista',
  standalone: true,
  imports: [MatIcon, MatTableModule, MatToolbar, CurrencyPipe, DatePipe],
  templateUrl: './consulta-lista.component.html',
  styleUrl: './consulta-lista.component.css'
})
export class ConsultaListaComponent {
  displayedColumns: string[] = ['fecha', 'descripcion', 'egreso','ingreso'];
  movimientosDataSource: MatTableDataSource<Movimientos> = new MatTableDataSource<Movimientos>();


  constructor ( private consultaService : ConsultaService ){}

  loadMovimientos() {
    this.consultaService.getConsulta().subscribe((data: Movimientos[]) => {
      this.movimientosDataSource.data = data;
    });
  }
  ngOnInit(){
    this.loadMovimientos()
  }

  // Cálculo del total de los egresos
  getTotalEgreso() {
    return this.movimientosDataSource.data
      .filter(mov => mov.tipo === 'egreso')
      .reduce((acc, mov) => acc + (Number(mov.monto) || 0), 0);
  }

  // Cálculo del total de los ingresos
  getTotalIngreso() {
    return this.movimientosDataSource.data
      .filter(mov => mov.tipo === 'ingreso')
      .reduce((acc, mov) => acc + (Number(mov.monto) || 0), 0);
  }

  // Generar la fila de totales
  getTotalRow(): Movimientos {
    return {
      id: 'total',
      descripcion: 'Total',
      fecha: '',
      tipo: '',
      monto: 0
    };
  }

  // Devuelve los datos con la fila total añadida al final
  get displayedDataSource() {
    const totalRow = this.getTotalRow();
    totalRow.monto = this.getTotalEgreso() + this.getTotalIngreso();
    return [...this.movimientosDataSource.data, totalRow];
  }
}
