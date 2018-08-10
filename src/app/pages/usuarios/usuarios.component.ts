import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

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
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.cargarUsuarios( );
  }

  cargarUsuarios( ){

    this.cargando = true;

    this._usuarioService.cargarUsuarios( this.desde )
        .subscribe( ( resp: any ) => {
          this.totalRegistros = resp.total;
          this.usuarios = resp.usuarios;
          this.cargando = false;
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

}
