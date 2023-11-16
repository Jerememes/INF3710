import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./modules/app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./services/communication.service";
import { AppMaterialModule } from './modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { TableMedecinComponent } from './pages/table-medecin/table-medecin.component';
import { CreationMedecinComponent } from './pages/creation-medecin/creation-medecin.component';
import { DoctorFormComponent } from './components/doctor-form/doctor-form.component';
import { ModifyMedecinComponent } from './pages/modify-medecin/modify-medecin.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TableMedecinComponent,
    CreationMedecinComponent,
    DoctorFormComponent,
    ModifyMedecinComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppMaterialModule
  ],
  providers: [CommunicationService],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
