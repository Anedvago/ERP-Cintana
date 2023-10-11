import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DepartamentService } from 'src/app/services/departament.service';
import { SectionService } from 'src/app/services/section.service';
import { FamilyService } from 'src/app/services/family.service';
@Component({
  selector: 'app-modal-create-new',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './modal-create-new.component.html',
  styleUrls: ['./modal-create-new.component.css']
})
export class ModalCreateNewComponent {
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

  public foods: any[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

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
