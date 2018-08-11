import { Injectable } from '@angular/core';
import { EventEmitter } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;
  public oculto: string = '';
  public notificacion = new EventEmitter<any>( );

  constructor() {
    console.log( 'modal upload service listo' );
    
  }

  ocultarModal( ){

  }

  mostrarModal( ){
    
  }
}
