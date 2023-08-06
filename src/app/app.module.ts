import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ListCategorieComponent } from './list-categorie/list-categorie.component';
import { AddCategorieComponent } from './add-categorie/add-categorie.component';
import { EditCategorieComponent } from './edit-categorie/edit-categorie.component';
import { ListEmployeComponent } from './list-employe/list-employe.component';
import { AddEmployeComponent } from './add-employe/add-employe.component';
import { EditEmployeComponent } from './edit-employe/edit-employe.component';
import { ListFournitureComponent } from './list-fourniture/list-fourniture.component';
import { AddFournitureComponent } from './add-fourniture/add-fourniture.component';
import { EditFournitureComponent } from './edit-fourniture/edit-fourniture.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    ListCategorieComponent,
    AddCategorieComponent,
    EditCategorieComponent,
    ListEmployeComponent,
    AddEmployeComponent,
    EditEmployeComponent,
    ListFournitureComponent,
    AddFournitureComponent,
    EditFournitureComponent,
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
