import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from "rxjs";
import { retry, map, filter } from 'rxjs/operators';
// import { Observable } from 'rxjs/Observable';
// import { Subject } from 'rxjs/Subject';
// import { Subscriber } from 'rxjs/Subscriber';
// Error with
// import { Observable } from "rxjs/Rx";
// https://github.com/ReactiveX/rxjs/issues/3654
// It almost sounds like somewhere in your own code, you're importing from 'rxjs/Rx'.
// If that's the case, simply find where that import is,
// and replace it with an import from the new improved index (e.g. import {Observable} from 'rxjs';).

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription:Subscription;

  constructor() {

    this.subscription = this.regresaObservable( )
    // .pipe( retry( 2 ) )
    .subscribe(
      numero => console.log( 'Subs ', numero ),
      error => console.error( 'Error en el obs', error ),
      ( ) => console.log( 'El observador terminó !' )
     );

  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log( 'leaving the page' );
    this.subscription.unsubscribe( );
  }

  regresaObservable( ):Observable<any>{
    return new Observable( ( observer: Subscriber<any> ) => {
      let contador = 0;
      let intervalo = setInterval( ( ) => {
        contador += 1;
        const salida = {
          valor: contador
        };
        observer.next( salida );

        // if ( contador === 3 ) {
        //   clearInterval( intervalo );
        //   observer.complete( );
        // } 

        // if ( contador === 2 ) {
        //   // clearInterval( intervalo );
        //   observer.error( 'Auxilio !' );
        // }
      }, 1000 );
    })
    .pipe(
      map( resp => {return resp.valor} ),
      filter( ( valor, index ) => {
        console.log( 'Filter ', valor, index );
        if ( ( valor % 2 ) === 1 ) {
          // impar
          return true;
        } else {
          // par
          return false;
        }
        // return true;
      })
    );
    
  }

}
