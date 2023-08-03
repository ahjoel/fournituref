import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategorieComponent } from './categorie/categorie.component';
import { AddcategorieComponent } from './categorie/addcategorie/addcategorie.component';

const routes: Routes = [
  {path: "*", component: DashboardComponent},
  {path: "categorie", component: CategorieComponent},
  {path: "categorie/add_categorie", component: AddcategorieComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
