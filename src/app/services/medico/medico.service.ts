import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import swal from "sweetalert";
import { map } from "rxjs/operators";

import { URL_SERVICIOS } from "../../config/config";
import { UsuarioService } from "../usuario/usuario.service";

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos( ){
    let url = URL_SERVICIOS + '/medico';
    return this.http.get( url )
               .pipe( map( ( resp: any ) => {
                 console.log( resp );
                 this.totalMedicos = resp.total;
                 return resp.medicos;
               }))
  }

  buscarMedicos( termino: string ){
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get( url )
               .pipe( map( ( resp: any ) => resp.medicos ) );
  }

  borrarMedico( id: string ){
    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
               .pipe( map( ( resp: any ) => {
                 swal( "Medico borrado", "Nombre: " + resp.nombre, 'success' );
                 return resp;
               }));
  }

  guardarMedico( medico: Medico ){
    let url = URL_SERVICIOS + '/medico';
    url += '?token=' + this._usuarioService.token;
    return this.http.post( url, medico )
        .pipe( map( ( resp: any ) => {
          console.log( resp );
          
          swal( "Medico creado", "Nombre: " + medico.nombre, 'success' );
          return resp.medico;
        }))
  }


}
