import { RouterModule, Routes } from "@angular/router";
// Componentes
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graph1Component } from "./graph1/graph1.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { ProfileComponent } from "./profile/profile.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { HospitalesComponent } from "./hospitales/hospitales.component";
import { MedicosComponent } from "./medicos/medicos.component";
import { MedicoComponent } from "./medicos/medico.component";
import { ForbiddenComponent } from "./forbidden/forbidden.component";
import { HomeComponent } from "./home/home.component";
import { BusquedaComponent } from './busqueda/busqueda.component';
// Guards
import { LoginGuardGuard, AdminGuard, VerificaTokenGuard } from "../services/service.index";

const pagesRoutes: Routes = [
    // { 
    //     path: '',
    //     component: PagesComponent,
    //     canActivate: [ LoginGuardGuard ],
    //     children: [
            { path: '', redirectTo: '/home', pathMatch: 'full' },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
            { path: 'graph1', component: Graph1Component, data: { titulo: 'Graficas' } },
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs Observables' } },
            {
                path: 'home',
                component: HomeComponent,
                canActivate: [ VerificaTokenGuard ],
                data: { titulo: 'Inicio' }
            },
            { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
            { path: 'denegado', component: ForbiddenComponent, data: { titulo: 'Acceso denegado' } },
            { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },
            // Mantenimientos
            {
                path: 'usuarios',
                component: UsuariosComponent,
                canActivate: [ AdminGuard ],
                data: { titulo: 'Mantenimiento de usuarios' } 
            },
            { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de hospitales' } },
            { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de medicos' } },
            { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar medico' } }
    //     ]
    // }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );