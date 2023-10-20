import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDocumentComponent } from '../../components/form-document/form-document.component';

@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [CommonModule, FormDocumentComponent],
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent {

}
