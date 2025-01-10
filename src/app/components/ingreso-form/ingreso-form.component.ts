import { Component, Input, Output, EventEmitter, signal } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators, Validator} from '@angular/forms'
import { IngresoTsService } from '../../services/ingreso.ts.service'
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule } from '@angular/material/datepicker'; 

@Component({
  selector: 'app-ingreso-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule],
  templateUrl: './ingreso-form.component.html',
  styleUrl: './ingreso-form.component.css'
})
export class IngresoFormComponent {
  @Output() refreshIngresos = new EventEmitter<void>()
  @Input() ingreso: any


  showError = false;
  
  constructor ( private ingresoService: IngresoTsService ) { }
  
  ingresoForm = signal<FormGroup>(
    new FormGroup({
      _id: new FormControl(''),
      monto: new FormControl('',[Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
      fecha: new FormControl('',[Validators.required]),
      descripcion: new FormControl(''),      
    })
  )

  validForm(){
    return this.ingresoForm().invalid
  }

  saveForm(){
    this.showError = false;
    if (this.ingresoForm().get('_id')?.value){
      this.ingresoService.updateIngreso(this.ingresoForm().value).subscribe({
        next: () => {
          this.ingresoForm().reset()
          this.refreshIngresos.emit()
        }, 
        error: (error)=>{
          this.showError = true;
        }
      })
    }else{
      this.ingresoService.saveIngreso(this.ingresoForm().value).subscribe({
        next: () => {
          this.ingresoForm().reset()
          this.refreshIngresos.emit()
        },
        error: (error)=>{
          this.showError = true;
        }
      })
    }  
  }

  ngOnChanges(){
    if (this.ingreso){
      this.ingresoForm().patchValue(this.ingreso)
    }
  }
}

