import { Component } from '@angular/core';
import { Sortie } from '../model/sortie.model';
import { Fourniture } from '../model/fourniture.model';
import { Employe } from '../model/employe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FournitureService } from '../service/fourniture.service';
import { EmployeService } from '../service/employe.service';
import { SortieService } from '../service/sortie.service';

@Component({
  selector: 'app-edit-sortie',
  templateUrl: './edit-sortie.component.html',
  styleUrls: ['./edit-sortie.component.css']
})
export class EditSortieComponent {
  currentSortie = new Sortie();
  fournitures!: Fourniture[];
  employes!: Employe[];
  updatedFourId!: number;
  updatedEmpId!: number;
  message: string | null = null;
  isError: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fournitureService: FournitureService,
    private employeService: EmployeService,
    private sortieService: SortieService
  ) {}

  ngOnInit(): void {
    this.fournitureService.listeFourniture().subscribe((fs) => {
      this.fournitures = fs;
    });
    
    this.employeService.listeEmploye().subscribe((e) => {
      this.employes = e;
    });
    // this.currentFourniture.dateModification = new Date();
    this.sortieService
      .consulterSortie(this.activatedRoute.snapshot.params['id'])
      .subscribe(
        (so) => {
          this.currentSortie = so;
          this.updatedFourId = this.currentSortie.fourniture.id;
          this.updatedEmpId = this.currentSortie.employe.id;
        },
        (error) => {
          const errorMessage =
            error.error.message ||
            'Failed to Load Sortie Fourniture. Please try again later.';
          this.showMessage(errorMessage, true);
        }
      );
  }

  updateSortie() {
    this.currentSortie.fourniture = this.fournitures.find(
      (f) => f.id == this.updatedFourId
    )!;
    this.currentSortie.employe = this.employes.find(
      (e) => e.id == this.updatedEmpId
    )!;
    this.sortieService.modifierSortie(this.currentSortie).subscribe(
      (sort) => {
        this.showMessage('Modification effectuée!', false);
        this.router.navigate(['/sortie/edit_sortie']);
      },
      (error) => {
        const errorMessage =
          error.error.message ||
          'Failed to Edit Sortie Fourniture. Please try again later.';
        this.showMessage(errorMessage, true);
      }
    );
  }

  showMessage(message: string, isError: boolean = false) {
    this.message = message;
    this.isError = isError;
  }
}
