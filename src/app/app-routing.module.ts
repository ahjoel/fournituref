import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
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
import { AddSortieComponent } from './add-sortie/add-sortie.component';
import { ListSortieComponent } from './list-sortie/list-sortie.component';
import { EditSortieComponent } from './edit-sortie/edit-sortie.component';
import { ListMouvementComponent } from './list-mouvement/list-mouvement.component';
import { EtatCommandeComponent } from './etat-commande/etat-commande.component';
import { EtatLivraisonComponent } from './etat-livraison/etat-livraison.component';
import { EtatSortieComponent } from './etat-sortie/etat-sortie.component';

const routes: Routes = [
  {path: "*", component: DashboardComponent},
  {path: "categorie", component: ListCategorieComponent},
  {path: "categorie/add_categorie", component: AddCategorieComponent},
  {path: "categorie/edit_categorie/:id", component: EditCategorieComponent},
  {path: "employe", component: ListEmployeComponent},
  {path: "employe/add_employe", component: AddEmployeComponent},
  {path: "employe/edit_employe/:id", component: EditEmployeComponent},
  {path: "fourniture", component: ListFournitureComponent},
  {path: "fourniture/add_fourniture", component: AddFournitureComponent},
  {path: "fourniture/edit_fourniture/:id", component: EditFournitureComponent},
  {path: "lignecommande", component: ListLigneCommandeComponent},
  {path: "lignecommande/add_lignecommande", component: AddLigneCommandeComponent},
  {path: "lignecommande/edit_lignecommande/:id", component: EditLigneCommandeComponent},
  {path: "lignelivraison", component: ListLigneLivraisonComponent},
  {path: "lignelivraison/add_lignelivraison", component: AddLigneLivraisonComponent},
  {path: "lignelivraison/edit_lignelivraison/:id", component: EditLigneLivraisonComponent},
  {path: "sortie", component: ListSortieComponent},
  {path: "sortie/add_sortie", component: AddSortieComponent},
  {path: "sortie/edit_sortie/:id", component: EditSortieComponent},
  {path: "situation", component: ListMouvementComponent},
  {path: "etatcommande", component: EtatCommandeComponent},
  {path: "etatlivraison", component: EtatLivraisonComponent},
  {path: "etatsortie", component: EtatSortieComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
