import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Componentes
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarrightComponent } from './sidebarright/sidebarright.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
    declarations: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        SidebarrightComponent,
        FooterComponent
    ],
    imports: [ CommonModule ],
    exports: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        SidebarrightComponent,
        FooterComponent
    ],
    providers: [],
})
export class SharedModule {}