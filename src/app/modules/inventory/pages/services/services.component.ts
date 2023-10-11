import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from 'src/app/shared/table/table.component';
import { FormArticlesComponent } from '../../components/form-articles/form-articles.component';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, TableComponent, FormArticlesComponent],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent {
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

  constructor(private servicesService: ServicesService) {
    this.getServices();
  }

  public getServices() {
    this.servicesService.getAllServices().then((data: any) => {
      this.rows = data;
    });
  }
}
