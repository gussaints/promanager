import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Temporal
import { IncrementadorComponent } from "../components/incrementador/incrementador.component";
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
        ProgressComponent,
        IncrementadorComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule
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