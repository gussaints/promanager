import { Component, OnInit } from '@angular/core';
import { Medico } from "../../models/medico.model";
import { Hospital } from "../../models/hospital.model";
import { MedicoService, HospitalService } from "../../services/service.index";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[ ] = [ ];
  medico: Medico = new Medico( );

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService
  ) { }

  ngOnInit() {
    this.cargarHospitales( );
  }

  guardarMedico( f: NgForm ){
    console.log( f.valid );
    console.log( f.value );
    if ( f.invalid ) {
      return;
    }

    this._medicoService.guardarMedico( this.medico )
        .subscribe( ( medico: any ) => {
          console.log( medico );
          this.cargarHospitales( );
        })
  }

  cargarHospitales( ){
    this._hospitalService.cargarHospitales( )
        .subscribe( ( hospitales: Hospital[ ] ) => {
          this.medico.nombre = '';
          this.medico.hospital = '';
          this.hospitales = hospitales
        });
  }

}
