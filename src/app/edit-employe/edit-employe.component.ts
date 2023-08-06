import { Component } from '@angular/core';
import { Employe } from '../model/employe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeService } from '../service/employe.service';

@Component({
  selector: 'app-edit-employe',
  templateUrl: './edit-employe.component.html',
  styleUrls: ['./edit-employe.component.css']
})
export class EditEmployeComponent {
  currentEmploye = new Employe();
  employes!: Employe[];
  message: string | null = null;
  isError: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private employeService: EmployeService
  ) {}

  ngOnInit() {
    this.employeService
      .consulterEmploye(this.activatedRoute.snapshot.params['id'])
      .subscribe((emp) => {
        this.currentEmploye = emp;
      });
  }

  updateEmploye() {
    this.employeService.modifierEmploye(this.currentEmploye).subscribe(
      (emp) => {
        this.showMessage('Modification effectuée!', false);
        this.router.navigate(['/employe/edit_employe']);
      },
      (error) => {
        const errorMessage =
          error.error.message ||
          'Failed to Edit employee. Please try again later.';
        this.showMessage(errorMessage, true);
      }
    );
  }

  showMessage(message: string, isError: boolean = false) {
    this.message = message;
    this.isError = isError;
  }
}
