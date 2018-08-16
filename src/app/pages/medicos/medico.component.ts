import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Medico } from "../../models/medico.model";
import { Hospital } from "../../models/hospital.model";
import { MedicoService, HospitalService } from "../../services/service.index";
import { ModalUploadService } from "../../components/modal-upload/modal-upload.service";


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[ ] = [ ];
  medico: Medico = new Medico( '', '', '', '', '' );
  hospital: Hospital = new Hospital( '' );
  saveButton: boolean = false;

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe( ( params: any ) => {
      let id = params['id'];
      if ( id !== 'nuevo' ) {
        this.cargarMedico( id );
        this.saveButton = false;
      } else {
        this.saveButton = true;
      }
    });
  }

  ngOnInit() {
    this.cargarHospitales( );
    this._modalUploadService.notificacion
        .subscribe( ( resp: any ) => {
          this.medico.img = resp.medico.img;
        });
  }

  cambiarHospital( id ){
    this._hospitalService.obtenerHospital( id )
        .subscribe( ( hospital: any ) => this.hospital = hospital );
  }

  guardarMedico( f: NgForm ){
    if ( f.invalid ) {
      return;
    }

    this._medicoService.guardarMedico( this.medico )
        .subscribe( ( medico: any ) => {
          this.cargarHospitales( );
          this.medico._id = medico._id;
          this.router.navigate( [ '/medico', medico._id ] );
        })
  }

  cargarHospitales( ){
    this._hospitalService.cargarHospitales( )
        .subscribe( ( hospitales: Hospital[ ] ) => {
          this.hospitales = hospitales
        });
  }

  cargarMedico( id: string ){
    this._medicoService.cargarMedico( id )
        .subscribe( ( medico: any ) => {
          this.medico = medico;
          this.medico.hospital = medico.hospital._id;
          this.cambiarHospital( this.medico.hospital );
        })
  }

  cambiarFoto( ){
    this._modalUploadService.mostrarModal( 'medicos', this.medico._id );
  }

}
