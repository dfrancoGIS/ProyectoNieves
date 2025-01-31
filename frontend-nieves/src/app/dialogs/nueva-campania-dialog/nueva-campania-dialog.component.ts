import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nueva-campania-dialog',
  templateUrl: './nueva-campania-dialog.component.html',
  styleUrls: ['./nueva-campania-dialog.component.scss']
})
export class NuevaCampaniaDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NuevaCampaniaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      fechaInicio: ['', Validators.required]
    });
  }

  guardar() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
