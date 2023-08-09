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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
