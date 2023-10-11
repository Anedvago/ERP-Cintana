import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from 'src/app/shared/table/table.component';
import { ArticleService } from 'src/app/services/article.service';
import { FormArticlesComponent } from '../../components/form-articles/form-articles.component';
@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, TableComponent, FormArticlesComponent],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent {
  public columnsDisplay = [
    'Cod',
    'Ref',
    'Nombre',
    'Precio',
    'Stock',
    'Dpto',
    'Seccion',
    'Familia',
  ];
  public columns = [
    'id',
    'ref',
    'name',
    'value',
    'stock',
    'dpto',
    'section',
    'family',
  ];

  public rows: any[] = [];
  public filterRows: any[] = [];

  constructor(private articlesService: ArticleService) {
    this.getArticles();
  }

  public getArticles(): void {
    this.articlesService.getAllArticles().then((data: any) => {
      this.rows = data;
      this.filterRows = data;
    });
  }

  public filterByCode(event: any) {
    this.filterRows = this.rows.filter((elem) => elem.id == event).slice();
  }

  public filterByRef(event: any) {
    this.filterRows = this.rows.filter((elem) => elem.ref == event).slice();
  }

  public filterByName(event: any) {
    this.filterRows = this.rows.filter(function (objeto) {
      function cleanString(text: string): string {
        return text
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase();
      }
      return cleanString(objeto.name)
        .toLowerCase()
        .includes(cleanString(event.toLowerCase()));
    });
  }

  public quitFilters() {
    this.filterRows = this.rows.slice();
  }
}
