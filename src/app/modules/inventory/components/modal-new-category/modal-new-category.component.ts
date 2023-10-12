import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartamentService } from 'src/app/services/departament.service';
import { SectionService } from 'src/app/services/section.service';
import { FamilyService } from 'src/app/services/family.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ModalCreateNewComponent } from '../modal-create-new/modal-create-new.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ButtonBlueComponent } from 'src/app/shared/button-blue/button-blue.component';

@Component({
  selector: 'app-modal-new-category',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
     FormsModule,
      ButtonBlueComponent, MatDialogModule],
  templateUrl: './modal-new-category.component.html',
  styleUrls: ['./modal-new-category.component.css']
})
export class ModalNewCategoryComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalCreateNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private departamentService: DepartamentService,
    private sectionService: SectionService,
    private familyService: FamilyService
  ) {
    this.getAllDepartaments();
    this.getAllSections();
    this.getAllfamilies();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public types = [{name:"Articulos",value:"A"}, {name:"Servicios",value:"S"}];
  public categories = ["DEPARTAMENTO", "SECCION", "FAMILIA"];
  public departaments: any[] = [];
  public sections: any[] = [];
  public families: any[] = [];

  public getAllDepartaments() {
    this.departamentService.getAllDepartaments().then((data: any) => {
      this.departaments = data;
    })
  }

  public getAllSections() {
    this.sectionService.getAllSections().then((data: any) => {
      this.sections = data;
    })
  }

  public getAllfamilies() {
    this.familyService.getAllFamilies().then((data: any) => {
      this.families = data;
    })
  }

}
