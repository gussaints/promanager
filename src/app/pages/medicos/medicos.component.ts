import { Component, OnInit } from '@angular/core';
import { Medico } from "../../models/medico.model";
import { MedicoService } from "../../services/service.index";

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[ ] = [ ];
  totalRegistros: number = 0;
  desde: number = 0;
  cargando: boolean = true;

  constructor(
    public _medicoService: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos( );
  }

  cargarMedicos( ){
    this.cargando = true;
    this._medicoService.cargarMedicos( )
        .subscribe( ( medicos: Medico ) => {
            this.medicos = medicos;
            this.totalRegistros = this._medicoService.totalMedicos;
            this.cargando = false;
          });
  }

  buscarMedico( termino: string ){
    if ( termino.length <= 0 ) {
      this.cargarMedicos( );
      return ;
    }
    this._medicoService.buscarMedicos( termino )
        .subscribe( ( medicos: Medico[ ] ) => this.medicos = medicos );
  }

  borrarMedico( medico: Medico ){
    swal({
      title: 'Esta seguro?',
      text: 'Esta a punto de borrar a ' + medico.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then( borrar => {
      console.log( borrar );
      if ( borrar ) {
        this._medicoService.borrarMedico( medico._id )
            .subscribe( ( ) => this.cargarMedicos( ) );
      }
    });
    
  }

  cambiarDesde( num: number ){
    if ( num != this.desde ) {
      this.desde = num;
      this.cargarHospitales( );
    } else {
      console.log( 'Es el mismo anterior' );
    }
  }

}
