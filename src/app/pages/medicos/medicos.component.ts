import { Component, OnInit } from '@angular/core';
import { Medico } from "../../models/medico.model";
import { MedicoService } from "../../services/service.index";
import { ModalUploadService } from "../../components/modal-upload/modal-upload.service";

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
    public _medicoService: MedicoService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarMedicos( );
    this._modalUploadService.notificacion
        .subscribe( ( resp: any ) => {
          this.cargarMedicos( );
        })
  }

  cargarMedicos( ){
    this.cargando = true;
    this._medicoService.cargarMedicos( this.desde )
        .subscribe( ( medicos: Medico[] ) => {
            this.medicos = medicos;
            this.totalRegistros = this._medicoService.totalMedicos;
            this.cargando = false;
            // this.desde = 0;
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
      console.log( num );
      
      this.desde = num;
      this.cargarMedicos( );
    } else {
      console.log( 'Es el mismo anterior' );
    }
  }

  actualizarImagen( medico: any ){
    // console.log( dato );
    this._modalUploadService.mostrarModal( 'medicos', medico._id )
  }

}
