import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from "../../components/modal-upload/modal-upload.service";

// import swal from 'sweetalert';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios( );
    this._modalUploadService.notificacion
        .subscribe( resp => this.cargarUsuarios( ) );
  }

  mostrarModal( id: string ){
    console.log( 'id', id );
    this._modalUploadService.mostrarModal( 'usuarios', id );
  }

  cargarUsuarios( ){

    this.cargando = true;

    this._usuarioService.cargarUsuarios( this.desde )
        .subscribe( ( resp: any ) => {
          this.totalRegistros = resp.total;
          this.usuarios = resp.usuarios;
          this.cargando = false;
          this.desde = 0;
        });
  }

  cambiarDesde( num: number ){
    if ( num != this.desde ) {
      this.desde = num;
      this.cargarUsuarios( );
    } else {
      console.log( 'Es el mismo anterior' );
    }
  }

  buscarUsuario( termino: string ){
    console.log( termino );
    if ( termino.length <= 0 ) {
      this.cargarUsuarios( );
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuarios( termino )
        .subscribe( ( users: Usuario[] ) => {
          console.log( users );
          this.usuarios = users;
          this.cargando = false;
        });
    
  }

  borrarUsuario( user: Usuario ){
    console.log( user );
    if ( user._id === this._usuarioService.usuario._id ) {
      swal( 'No puede borrar usuario', 'No se puede borrar a si mismo', 'error' );
      return;
    }

    swal({
      title: 'Esta seguro?',
      text: 'Esta a punto de borrar a ' + user.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then( borrar => {
      console.log( borrar );
      if ( borrar ) {
        this._usuarioService.borrarUsuario( user._id )
            .subscribe( ( borrado: boolean ) => {
              this.cargarUsuarios( );
            });
      }
    });

  }

  guardarUsuario( user: Usuario ){
    // console.log( user );
    this._usuarioService.actualizarUsuario( user )
        .subscribe( );
  }

}
