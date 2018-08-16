import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "../../config/config";
import { UsuarioService } from "../usuario/usuario.service";

import { Router } from "@angular/router";
import { Hospital } from "../../models/hospital.model";

import swal from "sweetalert";
import { map } from "rxjs/operators";
// import "rxjs/add/operator/map";
// Services
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarHospitales( desde: number = 0 ){
    let url = URL_SERVICIOS + '/hospital?desde=' + desde;
    
    return this.http.get( url )
               .pipe( map( ( resp: any ) => {
                 this.totalHospitales = resp.total;
                 return resp.hospitales;
               }));
  }

  obtenerHospital( id: string ){
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get( url )
               .pipe( map( ( resp: any ) => {
                 return resp.hospital;
               }));
  }

  borrarHospital( id: string ){
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
               .pipe( map( ( resp: any ) => swal( 'Hospital Borrado', 'Eliminado correctamente', 'success' ) ));
  }

  crearHospital( nombre: string ){
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, { nombre: nombre } )
               .pipe( map( (resp: any)  => resp.hospital ));
  }

  buscarHospitales( termino: string ){
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get( url )
               .pipe( map( ( resp: any ) => resp.hospitales ));
  }

  actualizarHospital( hospital: Hospital ){
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, hospital )
               .pipe( map( ( resp: any ) => {
                 swal( 'Hospital Actualizado', hospital.nombre, 'success' );
                 return resp.hospital;
               }));
  }
}






