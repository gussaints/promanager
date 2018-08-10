import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progreso0: number = 20;
  progreso1: number = 30;
  total0: number = 100;
  total1: number = 100;

  dividir( divisor: number, dividendo: number ){
    return ( divisor / dividendo )*100 + '%';
  }

  constructor() { }

  ngOnInit() {
  }

}
