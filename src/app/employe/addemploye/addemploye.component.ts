import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employe } from 'src/app/model/employe.model';
import { EmployeService } from 'src/app/service/employe.service';

@Component({
  selector: 'app-addemploye',
  templateUrl: './addemploye.component.html',
  styleUrls: ['./addemploye.component.css']
})
export class AddemployeComponent {
  newEmploye = new Employe();
  message: string | null = null;
  isError: boolean = false;

  constructor(
    private empployeService: EmployeService,
    private router: Router
  ) {}

  addEmploye() {
    this.empployeService.ajouterEmploye(this.newEmploye).subscribe(
      (emp) => {
        this.showMessage(
          'Employe ' + this.newEmploye.nomEmp + ' crée avec succès!',
          false
        );
        this.newEmploye = new Employe();
        this.router.navigate(['/employe/add_employe']);
      },
      (error) => {
        const errorMessage = error.error.message || 'Unknown error occurred.';
        this.showMessage(errorMessage, true);
      }
    );
  }

  showMessage(message: string, isError: boolean = false) {
    this.message = message;
    this.isError = isError;
  }
}
