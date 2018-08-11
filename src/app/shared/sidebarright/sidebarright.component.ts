import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";
import { SettingsService } from "../../services/service.index";

@Component({
  selector: 'app-sidebarright',
  templateUrl: './sidebarright.component.html',
  styles: []
})
export class SidebarrightComponent implements OnInit {

  constructor( @Inject(DOCUMENT) private _document,
                public _ajustes:SettingsService ) { }

  ngOnInit() {
    this.colocarCheck( );
    this.colocarCheck2( );
  }

  cambiarColor( tema:string, link:any ){
    this.aplicarCheck( link );
    this._ajustes.aplicarTema( tema ); 
  }

  cambiarColor2( tema:string, link:any ){
    this.aplicarCheck2( link );
    this._ajustes.aplicarTema2( tema ); 
  }

  aplicarCheck( link:any ){
    let selectores = this._document.getElementsByClassName( 'selector' );
    for (const ref of selectores) {
      ref.classList.remove( 'working' );
    }
    link.classList.add( 'working' );
  }

  aplicarCheck2( link:any ){
    let selectores = this._document.getElementsByClassName( 'selector2' );
    for (const ref of selectores) {
      ref.classList.remove( 'working' );
    }
    link.classList.add( 'working' );
  }

  colocarCheck( ){
    let selectores = this._document.getElementsByClassName( 'selector' );
    let tema = this._ajustes.ajustes.tema;
    for (const ref of selectores) {
      if ( ref.getAttribute( 'data-theme' ) === tema ) {
        ref.classList.add( 'working' );
        break;
      }
      // ref.classList.remove( 'working' );
    }
  }

  colocarCheck2( ){
    let selectores = this._document.getElementsByClassName( 'selector2' );
    let theme = this._ajustes.ajustes2.tema;
    for (const ref of selectores) {
      if ( ref.getAttribute( 'data-theme' ) === theme ) {
        ref.classList.add( 'working' );
        break;
      }
      // ref.classList.remove( 'working' );
    }
  }

}
