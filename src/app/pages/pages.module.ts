import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// Plugins
import { ChartsModule } from "ng2-charts";
// Temporal
import { IncrementadorComponent } from "../components/incrementador/incrementador.component";
import { GraficoDonaComponent } from "../components/grafico-dona/grafico-dona.component";
// Rutas
import { PAGES_ROUTES } from "./pages.routes";
// Modulos
import { SharedModule } from "../shared/shared.module";
// Componentes
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Graph1Component } from "./graph1/graph1.component";
import { PagesComponent } from "./pages.component";
import { ProgressComponent } from "./progress/progress.component";
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
// Pipes
import { PipesModule } from "../pipes/pipes.module";

@NgModule({
    declarations: [
        DashboardComponent,
        Graph1Component,
        PagesComponent,
        ProgressComponent,
        IncrementadorComponent,
        GraficoDonaComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule
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