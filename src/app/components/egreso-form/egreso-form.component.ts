import { Component, Input, Output, EventEmitter, signal } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators, Validator} from '@angular/forms'
import { EgresoTsService } from '../../services/egreso.ts.service'
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-egreso-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule ],
  templateUrl: './egreso-form.component.html',
  styleUrl: './egreso-form.component.css'
})
export class EgresoFormComponent {
  @Output() refreshEgreso = new EventEmitter<void>()
  @Input() egreso: any  
  
    showError = false;
    
    constructor ( private egresoService: EgresoTsService ) { }
    
    egresoForm = signal<FormGroup>(
      new FormGroup({
        _id: new FormControl(''),
        monto: new FormControl('',[Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
        fecha: new FormControl('',[Validators.required]),
        descripcion: new FormControl(''),      
      })
    )
  
    validForm(){
      return this.egresoForm().invalid
    }
  
    saveForm(){
      this.showError = false;
      if (this.egresoForm().get('_id')?.value){
        this.egresoService.updateEgreso(this.egresoForm().value).subscribe({
          next: () => {
            this.egresoForm().reset()
            this.refreshEgreso.emit()
          }, 
          error: (error)=>{
            this.showError = true;
          }
        })
      }else{
        this.egresoService.saveEgreso(this.egresoForm().value).subscribe({
          next: () => {
            this.egresoForm().reset()
            this.refreshEgreso.emit()
          },
          error: (error)=>{
            this.showError = true;
          }
        })
      }  
    }
  
    ngOnChanges(){
      if (this.egreso){
        this.egresoForm().patchValue(this.egreso)
      }
    }
}
