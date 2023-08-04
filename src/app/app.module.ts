import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CategorieComponent } from './categorie/categorie.component';
import { AddcategorieComponent } from './categorie/addcategorie/addcategorie.component';
import { EditcategorieComponent } from './categorie/editcategorie/editcategorie.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EmployeComponent } from './employe/employe.component';
import { AddemployeComponent } from './employe/addemploye/addemploye.component';
import { EditemployeComponent } from './employe/editemploye/editemploye.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    CategorieComponent,
    AddcategorieComponent,
    EditcategorieComponent,
    EmployeComponent,
    AddemployeComponent,
    EditemployeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
