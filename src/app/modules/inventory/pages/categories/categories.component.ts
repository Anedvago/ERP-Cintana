import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonBlueComponent } from 'src/app/shared/button-blue/button-blue.component';
import { AccordionCategoriComponent } from '../../components/accordion-categori/accordion-categori.component';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ModalNewCategoryComponent } from '../../components/modal-new-category/modal-new-category.component';


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
  public articlesDepartaments: any[] = [];
  public articlesSections: any[] = [];
  public articlesFamilies: any[] = [];
  public servicesDepartaments: any[] = [];
  public servicesSections: any[] = [];
  public servicesFamilies: any[] = [];
  public newCategory = { id: 0, type: "", category: "", departament: "", section: "", name: "" };

  constructor(private categoryService: CategoryService,
    public dialog: MatDialog) {
    this.getAllArticlesDepartaments();
    this.getAllServicesDepartaments();
    this.getAllArticlesSections();
    this.getAllServicesSections();
    this.getAllArticlesFamilies();
    this.getAllServicesFamilies();
  }

  public getAllArticlesDepartaments() {
    this.categoryService.getAllArticlesDepartaments().then((data: any) => {
      this.articlesDepartaments = data;
    });
  }
  public getAllServicesDepartaments() {
    this.categoryService.getAllServicesDepartaments().then((data: any) => {
      this.servicesDepartaments = data;
    });
  }
  public getAllArticlesSections() {
    this.categoryService.getAllArticlesSections().then((data: any) => {
      this.articlesSections = Object.values(
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

  public getAllServicesSections() {
    this.categoryService.getAllServicesSections().then((data: any) => {
      this.servicesSections = Object.values(
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

  public getAllArticlesFamilies() {
    this.categoryService.getAllArticlesFamilies().then((data: any) => {
      this.articlesFamilies = Object.values(
        data.reduce((acc: any, objeto: any) => {
          const section = objeto.section;
          if (!acc[section]) {
            acc[section] = [];
          }
          acc[section].push(objeto);
          return acc;
        }, {})
      );
    });
  }
  public getAllServicesFamilies() {
    this.categoryService.getAllServicesFamilies().then((data: any) => {
      this.servicesFamilies = Object.values(
        data.reduce((acc: any, objeto: any) => {
          const section = objeto.section;
          if (!acc[section]) {
            acc[section] = [];
          }
          acc[section].push(objeto);
          return acc;
        }, {})
      );
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalNewCategoryComponent, {
      data: { newCategory: this.newCategory },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.newCategory = result;
        if (this.newCategory.id == 0) {
          this.insertCategory();
        } else {
          this.updateCategory()
        }

      } else {
        this.newCategory = { id: 0, type: "", category: "", departament: "", section: "", name: "" };
      }
    });
  }

  public insertCategory() {
    if (this.newCategory.category === "DEPARTAMENTO") {
      this.categoryService.insertDepartament(this.newCategory.type, this.newCategory.name).then((data) => {
        this.getAllArticlesDepartaments();
        this.getAllServicesDepartaments();
      })
    }
    if (this.newCategory.category === "SECCION") {
      this.categoryService.insertSection(this.newCategory.type, this.newCategory.departament, this.newCategory.name).then((data) => {
        this.getAllArticlesSections();
        this.getAllServicesSections();
      })
    }
    if (this.newCategory.category === "FAMILIA") {
      console.log(this.newCategory);
      this.categoryService.insertFamily(this.newCategory.type, this.newCategory.departament, this.newCategory.section, this.newCategory.name).then((data) => {
        this.getAllArticlesFamilies();
        this.getAllServicesFamilies();
      })
    }
    this.newCategory = { id: 0, type: "", category: "", departament: "", section: "", name: "" };
  }

  public updateCategory() {
    if (this.newCategory.category === "DEPARTAMENTO") {
      this.categoryService.updateDepartament(this.newCategory.id, this.newCategory.type, this.newCategory.name).then((data) => {
        this.getAllArticlesDepartaments();
        this.getAllServicesDepartaments();
      })
    }
    if (this.newCategory.category === "SECCION") {
      this.categoryService.updateSection(this.newCategory.id, this.newCategory.type, this.newCategory.departament, this.newCategory.name).then((data) => {
        this.getAllArticlesSections();
        this.getAllServicesSections();
      })
    }
    if (this.newCategory.category === "FAMILIA") {
      console.log(this.newCategory);
      this.categoryService.insertFamily(this.newCategory.type, this.newCategory.departament, this.newCategory.section, this.newCategory.name).then((data) => {
        this.getAllArticlesFamilies();
        this.getAllServicesFamilies();
      })
    }
    this.newCategory = { id: 0, type: "", category: "", departament: "", section: "", name: "" };
  }

  public editCategory(event: any) {
    switch (event.type) {
      case "DEPARTAMENTO":
        const dpto = this.articlesDepartaments.filter((elem) => {
          return elem.id == event.id
        })[0]
        this.newCategory.id = dpto.id;
        this.newCategory.name = dpto.name;
        this.newCategory.category = event.type;
        this.newCategory.type = dpto.type;
        this.openDialog();
        break;
      case "SECCION":
        let section;
        for (let i = 0; i < this.articlesSections.length; i++) {
          const gSection = this.articlesSections[i];
          for (let j = 0; j < gSection.length; j++) {
            const scc = this.articlesSections[i][j];
            if (scc.id == event.id) {
              section = scc
            }
          }
        }
        this.newCategory.id = section.id;
        this.newCategory.name = section.name;
        this.newCategory.category = event.type;
        this.newCategory.type = section.type;
        this.newCategory.departament = section.departament;
        this.openDialog();
        break;
      case "FAMILIA":

        break;
    }
  }

  public deleteCategory(event: any) {
    switch (event.type) {
      case "DEPARTAMENTO":
        const dpto = this.articlesDepartaments.filter((elem) => {
          return elem.id == event.id
        })[0]
        this.newCategory.id = dpto.id;
        this.newCategory.name = dpto.name;
        this.newCategory.category = event.type;
        this.newCategory.type = dpto.type;
        this.openDialog();
        break;
      case "SECCION":

        break;
      case "FAMILIA":

        break;
    }
  }
}
