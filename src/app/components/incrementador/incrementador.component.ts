import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  @Input('nombre') leyenda : string = 'Leyenda';
  @Input() progreso : number = 50;

  incrementar( ){
    this.progreso += 5;
  }
  disminuir( ){
    this.progreso -= 5;
  }

  constructor() {
    console.log( 'leyenda = ', this.leyenda );
    console.log( 'progreso = ', this.progreso );
  }

  ngOnInit() {
    console.log( 'leyenda = ', this.leyenda );
    console.log( 'progreso = ', this.progreso );
  }

}
