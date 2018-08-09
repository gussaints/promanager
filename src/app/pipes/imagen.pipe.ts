import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from "../config/config";

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: string = 'usuarios' ): any {
    let url = URL_SERVICIOS + '/img';
    if ( !img ) {
      // Por si no trae imagen, o sea: imagen = null
      return url + '/usuarios/gus';
    }

    if ( img.indexOf( 'https' ) >= 0 ) {
      // Por si es de login con Google
      return img;
    }

    url += '/' + tipo + '/' + img ;
    return url;

    // return value + ': Funciona el PIPE';
  }

}
