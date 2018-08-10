import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  @Input('nombre') leyenda : string = 'Leyenda';
  @Input() progreso : number;
  @Input() total : number;
  theLast: number;

  @Output('updateVal') CambioValor : EventEmitter<number> = new EventEmitter( );

  @ViewChild('txtProgreso') txtProgreso:ElementRef;

  onChanges( newValue:number ){

    this.theLast = this.total%5 > 0 ? this.total%5 : 5;

    if ( newValue >= this.total-this.theLast ) {
      this.progreso = this.total-this.theLast;
    } else if ( newValue <= 0 ) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }

    this.txtProgreso.nativeElement.value = this.progreso;
    this.CambioValor.emit( this.progreso );
  }

  incrementar( ){

    this.theLast = this.total%5 > 0 ? this.total%5 : 5;

    let pro = this.progreso+5;
    let newTotal = this.total-this.theLast;
    
    if (pro > newTotal){
      this.progreso = newTotal;
      this.emitting();
    } else if ( this.progreso < newTotal ) {
      this.progreso += 5;
      this.emitting();
    }
  }
  disminuir( ){

    this.theLast = this.total%5 > 0 ? this.total%5 : 5;

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
