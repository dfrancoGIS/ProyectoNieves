import { Component } from '@angular/core';

@Component({
  selector: 'app-documentos-informes',
  templateUrl: './documentos-informes.component.html',
  styleUrls: ['./documentos-informes.component.scss']
})
export class DocumentosInformesComponent {

   generarDocumentoVialidad() {
    console.log("Generando informe de Vialidad Invernal...");
    // Aquí podemos llamar a un servicio para generar el documento en el futuro.
  }

  generarDocumentoRetenes() {
    console.log("Generando informe de Retenes...");
    // Aquí podemos llamar a un servicio para generar el documento en el futuro.
  }
}
