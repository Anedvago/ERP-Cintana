import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ButtonBlueComponent } from 'src/app/shared/button-blue/button-blue.component';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-modal-create-new-service',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ButtonBlueComponent,
    MatDialogModule],
  templateUrl: './modal-create-new-service.component.html',
  styleUrls: ['./modal-create-new-service.component.css']
})
export class ModalCreateNewServiceComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalCreateNewServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService, private serviceService:ServicesService
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
    this.categoryService.getAllArticlesDepartaments().then((data: any) => {
      this.departaments = data;
      console.log(this.departaments);

    })
  }

  public getAllSections() {
    this.categoryService.getAllArticlesSections().then((data: any) => {
      this.sections = data;
    })
  }

  public getAllfamilies() {
    this.categoryService.getAllArticlesFamilies().then((data: any) => {
      this.families = data;
    })
  }

  public deleteArticle() {
    this.serviceService.deleteService(this.data.newService.id).then(() => { })
  }

}
