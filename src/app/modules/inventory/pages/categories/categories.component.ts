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
  public familiesArticles: any[] = [];
  public newCategory = { type: "", category: "", departament: "", section: "", name: "" };

  constructor(private categoryService: CategoryService,
    public dialog: MatDialog,
    private departamentService: DepartamentService,
    private sectionService: SectionService,
    private familyService: FamilyService) {
    this.getAllDepartaments();
    this.getAllSections();
    this.getAllFamilies();
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
      console.log(this.sectionsArticles);

    });
  }

  public getAllFamilies() {
    this.categoryService.getAllFamilies().then((data: any) => {
      this.familiesArticles = Object.values(
        data.reduce((acc: any, objeto: any) => {
          const section = objeto.section;
          if (!acc[section]) {
            acc[section] = [];
          }
          acc[section].push(objeto);
          return acc;
        }, {})
      );
      console.log(this.familiesArticles);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalNewCategoryComponent, {
      data: { newCategory: this.newCategory },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      if (result != undefined) {
        this.newCategory = result;
        this.insertCategory();

      } else {
        this.newCategory = { type: "", category: "", departament: "", section: "", name: "" };
      }
    });
  }

  public insertCategory() {
    if (this.newCategory.category === "DEPARTAMENTO") {
      this.departamentService.insertDepartament(this.newCategory.type, this.newCategory.name).then((data) => {
        this.getAllDepartaments();
      })
    }
    if (this.newCategory.category === "SECCION") {
      this.sectionService.insertSection(this.newCategory.type, this.newCategory.departament, this.newCategory.name).then((data) => {
        this.getAllSections();
      })
    }
    if (this.newCategory.category === "FAMILIA") {
      console.log(this.newCategory);
      this.familyService.insertFamily(this.newCategory.type, this.newCategory.departament, this.newCategory.section, this.newCategory.name).then((data) => {
        this.getAllFamilies();
      })
    }


  }
}
