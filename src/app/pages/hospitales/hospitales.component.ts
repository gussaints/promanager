import { Component, OnInit } from '@angular/core';
import { HospitalService } from "../../services/service.index";
import { Hospital } from "../../models/hospital.model";
import { ModalUploadService } from "../../components/modal-upload/modal-upload.service";

// import swal from 'sweetalert';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales( );
    this._modalUploadService.notificacion
        .subscribe( ( ) => this.cargarHospitales( ) );
  }

  mostrarModal( id: string ){
    console.log( 'id', id );
    this._modalUploadService.mostrarModal( 'hospitales', id );
  }

  cargarHospitales( ){

    this.cargando = true;

    this._hospitalService.cargarHospitales( this.desde )
        .subscribe( ( hospitales: Hospital[] ) => {
          console.log( hospitales );
          console.log(this._hospitalService.totalHospitales);
          
          this.totalRegistros = this._hospitalService.totalHospitales;
          this.hospitales = hospitales;
          this.cargando = false;
          // this.desde = 0;
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

  buscarHospital( termino: string ){
    console.log( termino );
    if ( termino.length <= 0 ) {
      this.cargarHospitales( );
      return;
    }

    this.cargando = true;

    this._hospitalService.buscarHospitales( termino )
        .subscribe( ( hospitales: Hospital[] ) => {
          console.log( hospitales );
          this.hospitales = hospitales;
          this.cargando = false;
        });
  }

  actualizarImagen( hospital: Hospital ){
    console.log( hospital );
    this.mostrarModal( hospital._id );
  }

  guardarHospital( hospital: Hospital ){
    console.log(hospital);
    this._hospitalService.actualizarHospital( hospital )
        .subscribe( ( ) => this.cargarHospitales( ) );
  }

  borrarHospital( hospital: Hospital ){
    console.log(hospital);
    swal({
      title: 'Esta seguro?',
      text: 'Esta a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then( borrar => {
      console.log( borrar );
      if ( borrar ) {
        this._hospitalService.borrarHospital( hospital._id )
            .subscribe( ( ) => this.cargarHospitales( ) );
      }
    });
    
  }

  crearHospital( ){
    console.log( 'Presionaste crear hospital' );
    swal({
      icon: 'info',
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital ',
      content: 'input',
      buttons: true,
      dangerMode: true,
      allowOutsideClick: () => !swal.isLoading()
    }).then((valor: string) => {
      if ( !valor || valor.length === 0 ) {
        return;
      }
      console.log( 'otra vez' );
      
      
      this._hospitalService.crearHospital( valor )
          .subscribe( ( ) => this.cargarHospitales( ) );

    })
  }

}
