import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonBlueComponent } from 'src/app/shared/button-blue/button-blue.component';
import { AccordionCategoriComponent } from '../../components/accordion-categori/accordion-categori.component';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ModalNewCategoryComponent } from '../../components/modal-new-category/modal-new-category.component';
import { DepartamentService } from 'src/app/services/departament.service';
import { SectionService } from 'src/app/services/section.service';
import { FamilyService } from 'src/app/services/family.service';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule,
    ButtonBlueComponent,
    AccordionCategoriComponent,
    MatDialogModule,
    ModalNewCategoryComponent],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  public departamentsArticles: any[] = [];
  public sectionsArticles: any[] = [];
  public newCategory= {type:"", name:""};

  constructor(private categoryService: CategoryService,
    public dialog: MatDialog,
    private departamentService: DepartamentService,
    private sectionService: SectionService,
    private familyService: FamilyService) {
    this.getAllDepartaments();
    this.getAllSections();
  }

  public getAllDepartaments() {
    this.categoryService.getAllDepartaments().then((data: any) => {
      this.departamentsArticles = data;
    });
  }
  public getAllSections() {
    this.categoryService.getAllSections().then((data: any) => {
      this.sectionsArticles = Object.values(
        data.reduce((acc: any, objeto: any) => {
          const departament = objeto.departament;
          if (!acc[departament]) {
            acc[departament] = [];
          }
          acc[departament].push(objeto);
          return acc;
        }, {})
      );
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ModalNewCategoryComponent, {
      data: {newCategory:this.newCategory},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.newCategory = result;
      console.log(result);
      this.insertCategory()
      
    });
  }

  public insertCategory() {
    if (this.newCategory.type === "DEPARTAMENTO") {
      this.departamentService.insertDepartament(this.newCategory.name).then((data) => {
        console.log("Data ",data);
        this.getAllDepartaments();
        this.getAllSections();
      })
    }
  }
}
