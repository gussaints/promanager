import { RouterModule, Routes } from "@angular/router";
// Componentes
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graph1Component } from "./graph1/graph1.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";

const pagesRoutes: Routes = [
    { 
        path: '',
        component: PagesComponent,
        children: [
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
            { path: 'graph1', component: Graph1Component, data: { titulo: 'Graficas' } },
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs Observables' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );