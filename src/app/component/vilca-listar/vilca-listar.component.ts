import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Aporte} from '../../model/Aporte';
import { AporteService } from '../../service/aporte.service';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-vilca-listar',
  imports: [MatTableModule, MatPaginatorModule, MatIconModule,
    MatButtonModule, MatInputModule, MatFormFieldModule,
    CommonModule, MatSnackBarModule, MatDialogModule],
  standalone: true,
  templateUrl: './vilca-listar.component.html',
  styleUrl: './vilca-listar.component.css'
})
export class VilcaListarComponent {
  dataSource = new MatTableDataSource<Aporte>();
  DisplayedColumns: string[] = ['id', 'nombre_fiel', 'correo_fiel', 'motivo', 'monto_soles', 'fecha_aporte', 'observaciones', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private aporteService: AporteService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }
  cargarDatos()
  {
    this.aporteService.listar().subscribe({
      next: (aportes) => {
        this.dataSource.data = aportes;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error("error al cargar los aportes", err);
      }
    });
  }
  eliminar(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.aporteService.eliminar(id).subscribe(() => {
          this.cargarDatos();
          this.snackBar.open('Se eliminó correctamente', 'Cerrar', { duration: 3000 });
        });
      }
    });
  }
}
