import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { UsuarioService } from "../services/service.index";
import { Usuario } from "../models/usuario.model";

declare function init_plugins( );
declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  rememberme: boolean = false;
  auth2: any;
  showGoogleBtn: boolean = false;

  constructor(
    public router:Router,
    public _usuarioService: UsuarioService
    ) {

    }

  ngOnInit( ) {
    init_plugins( );
    this.googleInit( );
    this.checkUrl( );
    this.email = localStorage.getItem( 'email' ) || '';
    if ( this.email.length > 1 ) {
      this.rememberme = true;
    }
  }

  checkUrl( ){
    console.log( window.location );
    if ( window.location.hostname == 'localhost' ) {
      this.showGoogleBtn = true;
    } else {
      this.showGoogleBtn = false;
    }
  }

  googleInit( ){
    gapi.load( 'auth2', ( ) => {
      this.auth2 = gapi.auth2.init({
        client_id: '98934665845-1sfsuav19ojancmhbv833riln54jnj4e.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin( document.getElementById( 'btnGoogle' ) );
    })
  }

  attachSignin( elem ){
    this.auth2.attachClickHandler( elem, { }, ( googleUser ) => {
      let profile = googleUser.getBasicProfile( );
      let token = googleUser.getAuthResponse( );

      this._usuarioService.loginGoogle( token.id_token )
                          .subscribe( correcto => {
                            window.location.href = '#/dashboard';
                            // this.router.navigate( ['/dashboard'] );
                          });
      console.log( profile );
      console.log( token );
      
      
    })
  }

  ingresar( forma: NgForm ){
    if ( forma.invalid ) {
      return;
    }
    let usuario = new Usuario( null, forma.value.email, forma.value.password );
    this._usuarioService.login( usuario, forma.value.rememberme )
                        .subscribe( correcto => this.router.navigate( ['/dashboard'] ) );
    console.log( forma.valid );
    console.log( forma.value );
    // ;
  }
}
