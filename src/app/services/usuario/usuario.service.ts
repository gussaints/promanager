import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Usuario } from "../../models/usuario.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { URL_SERVICIOS } from "../../config/config";
import swal from "sweetalert";
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry  } from "rxjs/operators";
// import "rxjs/add/operator/map";
// Services
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[ ] = [ ];

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
      this.menu = JSON.parse( localStorage.getItem( 'menu' ) );
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [ ];
    }
  }

  estaLogueado( ){
    return ( this.token.length ) ? true : false;
  }

  guardarStorage( id: string, token: string, usuario: Usuario, menu: any ){
    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify( usuario ) );
    localStorage.setItem( 'menu', JSON.stringify( menu ) );

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout( ){
    this.usuario = null;
    this.token = '';
    this.menu = [ ];

    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'usuario' );
    localStorage.removeItem( 'menu' );
    
    this.router.navigate( [ '/login' ] );
  }

  loginGoogle( token: string ){
    let url = URL_SERVICIOS + '/login/google';
    return this.http.post( url, { token } )
               .pipe( map( ( resp: any ) => {
                 this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu );
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
               .pipe(
                 map( ( resp: any ) => {
                      this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu );
                      return true;
                 }),
                 catchError( (error: HttpErrorResponse) => {
                  // return an observable with a user-facing error message
                  swal( 'Error en el login', error.error.mensaje, 'error' );
                  return throwError( error );
                 })
               );
  }

  crearUsuario( usuario: Usuario ){
    let url = URL_SERVICIOS + '/usuario';
    return this.http.post( url, usuario )
               .pipe(
                 map( ( resp: any ) => {
                    swal( 'Usuario creado', usuario.email, 'success' );
                    return resp.usuario;
                 }),
                 catchError( (error: HttpErrorResponse) => {
                  // return an observable with a user-facing error message
                  console.log( error );
                  
                  swal( error.error.message, error.error.errors.message, 'error' );
                  return throwError( error );
                 })
                );
  }

  actualizarUsuario( usu: Usuario ){
    let url = URL_SERVICIOS + '/usuario/' + usu._id;
    url += '?token=' + this.token;
    
    return this.http.patch( url, usu )
                    .pipe( map( ( resp: any ) => {

                      if ( usu._id === this.usuario._id ) {
                        // solo si el usuario actualizado es igual al que esta logueado
                        let user: Usuario = resp.usuario;
                        this.guardarStorage( user._id, this.token, user, this.menu );
                        console.log( 'se guardo en el localStorage' );
                        
                      }
                      swal( 'Usuario actualizado', usu.nombre, 'success' );
                      return true;
                    }),
                    catchError( (error: HttpErrorResponse) => {
                      // return an observable with a user-facing error message
                      console.log( error );
                      
                      swal( error.error.message, error.error.errors.message, 'error' );
                      return throwError( error );
                    })
            );
  }


  cambiarImagen( archivo: File, id: string ){

    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
        .then( ( resp: any ) => {
          this.usuario.img = resp.usuario.img;
          swal( 'Imagen actualizada', this.usuario.nombre, 'success' );
          this.guardarStorage( id, this.token, this.usuario, this.menu );
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

  borrarUsuario( id: string ){
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete( url )
               .pipe( map( ( resp: any ) => {
                 swal( 'Usuario borrado', resp.nombre + ' ha sido borrado correctamente', 'success' );
                 return true;
               }));
  }


}
