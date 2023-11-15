import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "../app.component";
import { MainPageComponent } from "../pages/main-page/main-page.component";
import { ModificationMedecinComponent } from "../pages/modification-medecin/modification-medecin.component";
import { TableMedecinComponent } from "../pages/table-medecin/table-medecin.component";

const routes: Routes = [
  { path: "", redirectTo: "/main-page", pathMatch: "full"},
  { path: "app", component: AppComponent },
  { path: "main-page", component: MainPageComponent },
  { path: "modification-medecin", component: ModificationMedecinComponent },
  { path: "table-medecin", component: TableMedecinComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
