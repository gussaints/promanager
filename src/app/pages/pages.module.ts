import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Rutas
import { PAGES_ROUTES } from "./pages.routes";
// Modulos
import { SharedModule } from "../shared/shared.module";
// Componentes
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Graph1Component } from "./graph1/graph1.component";
import { PagesComponent } from './pages.component';
import { ProgressComponent } from "./progress/progress.component";

@NgModule({
    declarations: [
        DashboardComponent,
        Graph1Component,
        PagesComponent,
        ProgressComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES
    ],
    exports: [
        DashboardComponent,
        Graph1Component,
        PagesComponent,
        ProgressComponent
    ],
    providers: [],
})
export class PagesModule {}