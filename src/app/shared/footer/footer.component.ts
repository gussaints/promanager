import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: []
})
export class FooterComponent implements OnInit {

  anio : date = new Date( ).getFullYear( );
  name : string = "Gustavo";
  total : number = 0;

  sumar1(){
    this.total+=1;
  } 
  // function sumar1( ){
  //   total = total + 1;
  // }

  constructor() { }

  ngOnInit() {
  }

}
