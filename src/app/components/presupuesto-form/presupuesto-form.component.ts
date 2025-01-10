import { Component, Input, Output, EventEmitter, signal } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators, Validator} from '@angular/forms'
import { PresupuestoTsService } from '../../services/presupuesto.ts.service'
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-presupuesto-form',
  standalone: true,
  imports: [ ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule,],
  templateUrl: './presupuesto-form.component.html',
  styleUrl: './presupuesto-form.component.css'
})
export class PresupuestoFormComponent {
  @Output() refreshPresupuestos = new EventEmitter<void>()
  @Input() presupuesto: any

  meses: string[] = [
    'Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio',
    'Agosto','Septiembre','Nombiembre','Diciembre'
  ]

  showError = false;
  constructor ( private presupuestoService: PresupuestoTsService ) { }

  presupuestoForm = signal<FormGroup>(
    new FormGroup({
      _id: new FormControl(''),
      comentario: new FormControl(''),
      mes: new FormControl('',[Validators.required]),
      monto: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)])
    })
  )

  validForm(){
    return this.presupuestoForm().invalid
  }

  saveForm(){
    this.showError = false;
    if (this.presupuestoForm().get('_id')?.value){
      this.presupuestoService.updatePresupuesto(this.presupuestoForm().value).subscribe({
        next: () => {
          this.presupuestoForm().reset()
          this.refreshPresupuestos.emit()
        }, 
        error: (error)=>{
          this.showError = true;
        }
      })
    }else{
      this.presupuestoService.savePresupuesto(this.presupuestoForm().value).subscribe({
        next: () => {
          this.presupuestoForm().reset()
          this.refreshPresupuestos.emit()
        },
        error: (error)=>{
          this.showError = true;
        }
      })
    }  
  }


  ngOnChanges(){
    if (this.presupuesto){
      this.presupuestoForm().patchValue(this.presupuesto)
    }
  }
}
