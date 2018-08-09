import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public _usuarioService: UsuarioService
  ) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar( user: Usuario ){
    console.log( user );
    this.usuario.nombre = user.nombre;
    if ( !this.usuario.google ) {
      this.usuario.email = user.email;
    }
    console.log( this.usuario );
    
    this._usuarioService.actualizarUsuario( this.usuario )
                        .subscribe( ( resp: any ) => {
                          console.log( resp );
                        });
  }

  seleccionImagen( eva: File ){
    if ( !eva ) {
      this.imagenSubir = null;
      console.log( this.imagenSubir );
      return ;
    }

    if ( eva.type.indexOf( 'image' ) < 0 ) {
      swal( 'Solo imagenes', 'El archivo seleccionado no es una imagen', 'error' );
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = eva;

    let reader = new FileReader( );
    let urlImagenTemp = reader.readAsDataURL( eva );
    reader.onloadend = ( ) => {
      this.imagenTemp = reader.result;
      console.log( reader.result );
      
    }


    console.log( this.imagenSubir );
    
  }

  cambiarImagen( ){
    console.log( 'habilitado' );
    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id );
  }



}
