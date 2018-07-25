import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  @Input('nombre') leyenda : string = 'Leyenda';
  @Input() progreso : number = 50;

  @Output('updateVal') CambioValor : EventEmitter<number> = new EventEmitter( );

  @ViewChild('txtProgreso') txtProgreso:ElementRef;

  onChanges( newValue:number ){

    if ( newValue >= 100 ) {
      this.progreso = 100;
    } else if ( newValue <= 0 ) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }

    this.txtProgreso.nativeElement.value = this.progreso;
    this.CambioValor.emit( this.progreso );
  }

  incrementar( ){
    if ( this.progreso < 96 ) {
      this.progreso += 5;
      this.emitting();
    } else {
      this.progreso = 100;
      this.emitting();
    }
  }
  disminuir( ){
    if ( this.progreso > 4 ) {
      this.progreso -= 5;
      this.emitting();
    } else {
      this.progreso = 0;
      this.emitting();
    }
    
  }

  emitting(){
    this.CambioValor.emit( this.progreso );
    this.txtProgreso.nativeElement.focus();
  }

  constructor() {
  }

  ngOnInit() {
  }

}
