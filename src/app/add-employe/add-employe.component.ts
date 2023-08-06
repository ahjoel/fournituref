import { Component } from '@angular/core';
import { Employe } from '../model/employe.model';
import { EmployeService } from '../service/employe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employe',
  templateUrl: './add-employe.component.html',
  styleUrls: ['./add-employe.component.css']
})
export class AddEmployeComponent {
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
