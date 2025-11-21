import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AporteService} from '../../service/aporte.service';
import { CommonModule } from '@angular/common';
import { Aporte} from '../../model/Aporte';
import {MatRadioModule} from '@angular/material/radio';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-vilca-crear',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatDatepickerModule, MatNativeDateModule,
    MatRadioModule, MatButtonModule, MatSnackBarModule, RouterLink],
  standalone: true,
  templateUrl: './vilca-crear.component.html',
  styleUrl: './vilca-crear.component.css'
})

export class VilcaCrearComponent {
  aporteForm: FormGroup;
  motivosAporte = ['Uno', 'Dos', 'Tres', 'Cuatro']

  constructor(
    private fb: FormBuilder,
    private aporteService: AporteService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.aporteForm = this.fb.group({
      nombre_fiel: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      motivo: ['Uno', Validators.required],
      correo_fiel: ['', [Validators.required]],
      fecha_aporte: [new Date(), [
        Validators.required,
        this.validarFechaNoFutura()
      ]],
      monto_soles: [0, [Validators.required, Validators.min(0)]],
      observaciones: ['', Validators.required]
    });
  }

  registrar() {
    if (this.aporteForm.valid) {
      const aporte: Aporte = {
        id: 0,
        ...this.aporteForm.value
      };
      this.aporteService.insertar(aporte).subscribe({
        next: () => {
          this.snackBar.open('Registro exitoso', 'Cerrar', {duration: 3000});
          this.aporteForm.reset({
            marca: 'Uno',

            fecha_aporte: new Date()
          });

        },
        error: (e) => {

          this.snackBar.open('Error al registrar', 'Cerrar', {duration: 3000});
        }
      });
    } else {
      this.aporteForm.markAllAsTouched();
    }
  }
  validarFechaNoFutura(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const fechaIngresada = new Date(control.value);
      const hoy = new Date();

      fechaIngresada.setHours(0, 0, 0, 0);
      hoy.setHours(0, 0, 0, 0);

      return fechaIngresada > hoy ? { fechaFutura: true } : null;
    };
  }
}
