import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "../../config/config";
// modelos
import { Hospital } from "../../models/hospital.model";
import { Medico } from "../../models/medico.model";
import { Usuario } from "../../models/usuario.model";

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios:   Usuario[ ]   = [ ];
  hospitales: Hospital[ ]  = [ ];
  medicos:    Medico[ ]    = [ ];

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public http: HttpClient
  ) {
    activatedRoute.params.subscribe( ( params: any ) => {
      console.log( params );
      let termino = params['termino'];
      this.buscar( termino );
    });
  }

  ngOnInit() {
  }

  buscar( termino: string ){
    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    console.log( url );
    this.http.get( url )
        .subscribe( ( ans: any ) => {
          console.log( ans );
          this.hospitales = ans.hospitales;
          this.medicos = ans.medicos;
          this.usuarios = ans.usuarios;
        });
  }

}
