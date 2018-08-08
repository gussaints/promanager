import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { Observable } from 'rxjs';
// Servicios
// import { UsuarioService } from "../service.index";
import { UsuarioService } from "../usuario/usuario.service";

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ){}
  // canActivate( ): Observable<boolean> | Promise<boolean> | boolean {
  canActivate( ): boolean {

    console.log( 'Paso por el Login Guard' );

    if ( this._usuarioService.estaLogueado( ) ) {
      console.log( 'Paso el Guard' );
      return true;
    } else {
      console.log( 'Bloqueado por el Guard' );
      this.router.navigate( [ '/login' ] );
      return false;
    }    
    
  }
}
