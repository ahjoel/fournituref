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
import { ListLigneCommandeComponent } from './list-ligne-commande/list-ligne-commande.component';
import { AddLigneCommandeComponent } from './add-ligne-commande/add-ligne-commande.component';
import { EditLigneCommandeComponent } from './edit-ligne-commande/edit-ligne-commande.component';
import { ListLigneLivraisonComponent } from './list-ligne-livraison/list-ligne-livraison.component';
import { AddLigneLivraisonComponent } from './add-ligne-livraison/add-ligne-livraison.component';
import { EditLigneLivraisonComponent } from './edit-ligne-livraison/edit-ligne-livraison.component';
import { ListSortieComponent } from './list-sortie/list-sortie.component';
import { AddSortieComponent } from './add-sortie/add-sortie.component';
import { EditSortieComponent } from './edit-sortie/edit-sortie.component';
import { ListMouvementComponent } from './list-mouvement/list-mouvement.component';
import { EtatCommandeComponent } from './etat-commande/etat-commande.component';
import { EtatLivraisonComponent } from './etat-livraison/etat-livraison.component';
import { EtatSortieComponent } from './etat-sortie/etat-sortie.component';
import { LoginComponent } from './login/login.component';
import { EtatMensuelStockComponent } from './etat-mensuel-stock/etat-mensuel-stock.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

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
    ListLigneCommandeComponent,
    AddLigneCommandeComponent,
    EditLigneCommandeComponent,
    ListLigneLivraisonComponent,
    AddLigneLivraisonComponent,
    EditLigneLivraisonComponent,
    ListSortieComponent,
    AddSortieComponent,
    EditSortieComponent,
    ListMouvementComponent,
    EtatCommandeComponent,
    EtatLivraisonComponent,
    EtatSortieComponent,
    LoginComponent,
    EtatMensuelStockComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
