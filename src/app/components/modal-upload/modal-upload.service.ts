import { Injectable } from '@angular/core';
import { EventEmitter } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;
  public oculto: string = 'oculto';
  public notificacion = new EventEmitter<any>( );

  constructor() {
    console.log( 'modal upload service listo' );
  }

  ocultarModal( ){
    this.oculto = 'oculto';
    this.tipo = null;
    this.id = null;
  }

  mostrarModal( tipo_in: string, id_in: string ){
    this.oculto = '';
    this.tipo = tipo_in;
    this.id = id_in;
  }
}
