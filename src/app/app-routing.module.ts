import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategorieComponent } from './categorie/categorie.component';
import { AddcategorieComponent } from './categorie/addcategorie/addcategorie.component';
import { EditcategorieComponent } from './categorie/editcategorie/editcategorie.component';
import { EmployeComponent } from './employe/employe.component';
import { AddemployeComponent } from './employe/addemploye/addemploye.component';
import { EditemployeComponent } from './employe/editemploye/editemploye.component';

const routes: Routes = [
  {path: "*", component: DashboardComponent},
  {path: "categorie", component: CategorieComponent},
  {path: "categorie/add_categorie", component: AddcategorieComponent},
  {path: "categorie/edit_categorie/:id", component: EditcategorieComponent},
  {path: "employe", component: EmployeComponent},
  {path: "employe/add_employe", component: AddemployeComponent},
  {path: "employe/edit_employe/:id", component: EditemployeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
