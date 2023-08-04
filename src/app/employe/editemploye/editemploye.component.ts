import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employe } from 'src/app/model/employe.model';
import { EmployeService } from 'src/app/service/employe.service';

@Component({
  selector: 'app-editemploye',
  templateUrl: './editemploye.component.html',
  styleUrls: ['./editemploye.component.css']
})
export class EditemployeComponent {
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
