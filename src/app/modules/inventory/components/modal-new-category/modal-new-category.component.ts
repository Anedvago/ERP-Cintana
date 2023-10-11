import { Component,Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartamentService } from 'src/app/services/departament.service';
import { SectionService } from 'src/app/services/section.service';
import { FamilyService } from 'src/app/services/family.service';
import { ModalCreateNewComponent } from '../modal-create-new/modal-create-new.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-new-category',
  standalone: true,
  imports: [CommonModule],
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


  public departaments: any[] = [];
  public sections: any[] = [];
  public families: any[] = [];

  public getAllDepartaments() {
    this.departamentService.getAllDepartaments().then((data: any) => {
      this.departaments = data;
      console.log(this.departaments);

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