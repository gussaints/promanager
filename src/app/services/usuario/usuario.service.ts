import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Usuario } from "../../models/usuario.model";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "../../config/config";
import swal from "sweetalert";
import { map } from "rxjs/operators";
// import "rxjs/add/operator/map";
// Services
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage( );
  }

  cargarStorage( ){
    if ( localStorage.getItem( 'token' ) ) {
      this.token = localStorage.getItem( 'token' );
      this.usuario = JSON.parse( localStorage.getItem( 'usuario' ) );
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  estaLogueado( ){
    return ( this.token.length ) ? true : false;
  }

  guardarStorage( id: string, token: string, usuario: Usuario ){
    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify( usuario ) );

    this.usuario = usuario;
    this.token = token;
  }

  logout( ){
    this.usuario = null;
    this.token = '';

    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'usuario' );
    
    this.router.navigate( [ '/login' ] );
  }

  loginGoogle( token: string ){
    let url = URL_SERVICIOS + '/login/google';
    return this.http.post( url, { token } )
               .pipe( map( ( resp: any ) => {
                 this.guardarStorage( resp.id, resp.token, resp.usuario );
                 return true;
               }));
  }

  login( usuario: Usuario, recordar: boolean = false ){

    if ( recordar ) {
      localStorage.setItem( 'email', usuario.email );
    } else {
      localStorage.removeItem( 'email' );
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario )
               .pipe( map( ( resp: any ) => {
                //  localStorage.setItem( 'id', resp.id );
                //  localStorage.setItem( 'token', resp.token );
                //  localStorage.setItem( 'usuario', JSON.stringify( resp.usuario ) );

                this.guardarStorage( resp.id, resp.token, resp.usuario );

                 return true;
               }));
  }

  crearUsuario( usuario: Usuario ){
    let url = URL_SERVICIOS + '/usuario';
    return this.http.post( url, usuario )
               .pipe( map( ( resp: any ) => {
                  swal( 'Usuario creado', usuario.email, 'success' );
                  return resp.usuario;
                }));
  }

  actualizarUsuario( usuario: Usuario ){
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    
    return this.http.patch( url, usuario )
                    .pipe( map( ( resp: any ) => {

                      let user: Usuario = resp.usuario;

                      this.guardarStorage( user._id, this.token, user );
                      swal( 'Usuario actualizado', usuario.nombre, 'success' );

                      return true;

                    }));
  }


  cambiarImagen( archivo: File, id: string ){

    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
        .then( ( resp: any ) => {
          this.usuario.img = resp.usuario.img;
          swal( 'Imagen actualizada', this.usuario.nombre, 'success' );
          this.guardarStorage( id, this.token, this.usuario );
        })
        .catch( errCatch => {
          console.log( errCatch );
        });

  }

  cargarUsuarios( desde: number = 0 ){
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;

    return this.http.get( url );
  }

  buscarUsuarios( termino: string ){
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get( url )
               .pipe( map( ( resp: any ) => resp.usuarios ) );
  }


}
