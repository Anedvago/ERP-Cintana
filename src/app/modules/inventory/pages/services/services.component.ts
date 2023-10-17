import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from 'src/app/shared/table/table.component';
import { FormArticlesComponent } from '../../components/form-articles/form-articles.component';
import { ServicesService } from 'src/app/services/services.service';
import { Service } from 'src/app/models/Service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalCreateNewComponent } from '../../components/modal-create-new/modal-create-new.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, TableComponent, FormArticlesComponent, MatDialogModule, ModalCreateNewComponent],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent {
  public columnsDisplay = [
    'Cod',
    'Nombre',
    'Precio',
    'Dpto',
    'Seccion',
    'Familia',
  ];
  public columns = [
    'id',
    'name',
    'value',
    'dpto',
    'section',
    'family',
  ];

  public rows: any[] = [];
  public filterRows: any[] = [];
  public newArticle?: Service = {  name: "", value: 0, dpto: 0, section: 0, family: 0 };

  constructor(private servicesService: ServicesService,public dialog: MatDialog) {
    this.getServices();
  }

  public getServices() {
    this.servicesService.getAllServices().then((data: any) => {
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

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalCreateNewComponent, {
      data: { newArticle: this.newArticle },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.newArticle = result;
        if (this.newArticle!.id == 0 || this.newArticle!.id == undefined) {
          this.insertnewArticle();
        } else {
          this.updateArticle();
        }
      } else {
        this.cleanArticle();
      }
    });
  }

  editArticle(article: Service) {
    this.newArticle = article;
    console.log(this.newArticle);

    this.openDialog()
  }

  cleanArticle() {
    this.newArticle = { name: "", value: 0, dpto: 0, section: 0, family: 0 };
  }

  insertnewArticle() {
    this.servicesService.insertNewService(this.newArticle!).then(() => { this.getServices() })

  }

  updateArticle() {
    this.servicesService.updateService(this.newArticle!).then(() => { this.getServices() })
  }
}
