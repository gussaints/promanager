import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes:Ajustes = {
    temaUrl:'assets/css/colors/default.css',
    tema:'default'
  }

  ajustes2:Ajustes = {
    temaUrl:'assets/prebuilt-themes/purple-green.css',
    tema:'purple-green'
  }

  constructor( @Inject(DOCUMENT) private _document ) {
    this.cargarAjustes();
    this.cargarAjustes2();
  }

  guardarAjustes(){
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  guardarAjustes2(){
    localStorage.setItem('ajustes2', JSON.stringify(this.ajustes2));
  }

  cargarAjustes(){
    if ( localStorage.getItem('ajustes') ) {
      this.ajustes = JSON.parse( localStorage.getItem('ajustes') );
      this.aplicarTema( this.ajustes.tema );
    } else {
      console.log( 'usando valores por defecto' );
    }
  }

  cargarAjustes2(){
    if ( localStorage.getItem('ajustes2') ) {
      this.ajustes2 = JSON.parse( localStorage.getItem('ajustes2') );
      this.aplicarTema2( this.ajustes2.tema );
    } else {
      this.aplicarTema2( this.ajustes2.tema );
      console.log( 'usando valores por defecto' );
    }
  }

  aplicarTema( tema:string ){
    let url : string = `assets/css/colors/${ tema }.css`;
    this._document.getElementById('tema').setAttribute( 'href', url );

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    this.guardarAjustes( );
  }

  aplicarTema2( tema:string ){
    let url : string = `assets/prebuilt-themes/${ tema }.css`;
    this._document.getElementById('theme').setAttribute( 'href', url );

    this.ajustes2.tema = tema;
    this.ajustes2.temaUrl = url;

    this.guardarAjustes2( );
  }

}

interface Ajustes{
  temaUrl:string;
  tema:string;
}
