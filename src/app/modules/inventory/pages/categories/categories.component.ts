import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonBlueComponent } from 'src/app/shared/button-blue/button-blue.component';
import { AccordionCategoriComponent } from '../../components/accordion-categori/accordion-categori.component';
import { CategoryService } from 'src/app/services/category.service';
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ButtonBlueComponent, AccordionCategoriComponent],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  public departamentsArticles: any[] = [];
  public sectionsArticles: any[] = [];

  constructor(private categoyService: CategoryService) {
    this.getAllDepartaments();
    this.getAllSections();
  }

  public getAllDepartaments() {
    this.categoyService.getAllDepartaments().then((data: any) => {
      this.departamentsArticles = data;
    });
  }
  public getAllSections() {
    this.categoyService.getAllSections().then((data: any) => {
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
      /* const groupedObjetos = data.reduce((acc: any, objeto: any) => {
        const departament = objeto.departament;
        if (!acc[departament]) {
          acc[departament] = [];
        }
        acc[departament].push(objeto); 
        return acc;
      }, {});

      // Convertir el objeto en un array de arrays
      const resultado = Object.values(groupedObjetos);
      console.log(resultado); */
    });
  }
}
