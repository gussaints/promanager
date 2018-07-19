import { RouterModule, Routes } from "@angular/router";

import { PagesComponent } from "./pages/pages.component";

import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { ProgressComponent } from "./pages/progress/progress.component";
import { Graph1Component } from "./pages/graph1/graph1.component";

import { LoginComponent } from "./login/login.component";

import { RegisterComponent } from './login/register.component';

import { NopagefoundComponent } from "./pages/nopagefound/nopagefound.component";

const appRoutes: Routes = [
    { 
        path: '',
        component: PagesComponent,
        children: [
            { path: 'progress', component: ProgressComponent },
            { path: 'graph1', component: Graph1Component },
            { path: 'dashboard', component: DashboardComponent },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', component: NopagefoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );