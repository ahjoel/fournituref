import { Component } from '@angular/core';
import { Sortie } from '../model/sortie.model';
import { Employe } from '../model/employe.model';
import { Fourniture } from '../model/fourniture.model';
import { SortieService } from '../service/sortie.service';
import { EmployeService } from '../service/employe.service';
import { Router } from '@angular/router';
import { FournitureService } from '../service/fourniture.service';
import { MouvementService } from '../service/mouvement.service';

@Component({
  selector: 'app-add-sortie',
  templateUrl: './add-sortie.component.html',
  styleUrls: ['./add-sortie.component.css']
})
export class AddSortieComponent {
  newSortie = new Sortie();
  employes!: Employe[];
  fournitures!: Fourniture[];
  newIdEmp!: number;
  newIdFour!: number;
  newEmploye!: Employe;
  qteDispo!: number;
  message: string | null = null;
  isError: boolean = false;

  constructor(
    private sortieService: SortieService,
    private mouvementService: MouvementService,
    private employeService: EmployeService,
    private fournitureService: FournitureService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeService.listeEmploye().subscribe((emps) => {
      this.employes = emps;
    });
    
    this.fournitureService.listeFourniture().subscribe((fours) => {
      this.fournitures = fours;
    });

    this.newSortie.etatSort = "NON-VA";

    this.getNewCodeSortie();

  }

  getNewCodeSortie() {
    this.sortieService.listeSortie().subscribe((res) => {
      const currentDate = new Date();
      const day = currentDate.getDate().toString().padStart(2, '0');
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const year = currentDate.getFullYear().toString();
      const date_code = `OUTSTOCK${day}${month}${year}`;
      this.newSortie.codeSort = date_code + (res.length + 1);
    });
  }

    onChangeFourniture() {
      this.mouvementService
        .quantiteFournitureDispo(this.newIdFour)
        .subscribe((quantite:number) => {
          this.qteDispo = quantite;
        });
    }

  addSortie() {

    this.newSortie.fourniture = this.fournitures.find(
      (f) => f.id == this.newIdFour
    )!;
    
    this.newSortie.employe = this.employes.find(
      (e) => e.id == this.newIdEmp
    )!;
    
    this.sortieService.ajouterSortie(this.newSortie).subscribe(
      () => {
        this.showMessage(
          'Sortie ' + this.newSortie.codeSort + ' crée avec succès !',
          false
        );
        this.newSortie = new Sortie();
        this.newIdEmp = null;
        this.newIdFour = null;
        this.qteDispo = null;
        this.getNewCodeSortie();
        this.router.navigate(['/sortie/add_sortie']);
      },
      (error) => {
        const errorMessage = 
          error.error.message ||
          'Failed to save Sortie. Please try again later.';
        this.showMessage(errorMessage, true);
      }
    );

  }

  showMessage(message: string, isError: boolean = false) {
    this.message = message;
    this.isError = isError;
  }
}
