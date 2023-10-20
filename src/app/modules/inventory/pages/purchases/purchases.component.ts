import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDocumentComponent } from '../../components/form-document/form-document.component';
import { TableComponent } from 'src/app/shared/table/table.component';
import { PusrchaseService } from 'src/app/services/pusrchase.service';

@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [CommonModule, FormDocumentComponent, TableComponent],
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent {
  public columnsList = ["date", "id"];
  public columnsDisplayList = ["Fecha", "Num"];
  public rowsList: any[] = [];

  public columnsDetails = ["reference", "description", "units", "value", "discount", "total"];
  public columnsDisplayDetails = ["Ref", "Descripcion", "Unidades", "Precio", "Descuento", "Total"];
  public rowsDetails:any[] = [];

  public columnsTotals = ["references", "units", "gross", "discount", "net"];
  public columnsDisplayTotals = ["Refernecias", "Unidades", "Bruto", "Descuento", "Neto"];
  public rowsTotals = [
    { references: "2", units: "4", raw: "15600", discount: "0", total: "4600" }];

  public factureActive: number = 0;
  constructor(private purchaseService: PusrchaseService) {
    this.getListFactures();
    this.getTotalsActive();
    
  }


  public getListFactures() {
    this.purchaseService.getAllPurchasesCab().then((data) => {
      this.rowsList = data!.map(function (obj) {
        return { id: obj.id, date: obj.date.substring(0, 10) };
      });
      this.factureActive = this.rowsList[0].id;
      this.getDeailsById();
    })

  }

  public getTotalsActive() {
    this.purchaseService.getAllPurchasesCab().then((data) => {
      this.rowsTotals = data!.filter((elem)=>{
        return elem.id == this.factureActive;
      });
    })
  }

  public getDeailsById(){
    this.purchaseService.getPurchasesLinById(this.factureActive).then((data) => {
      this.rowsDetails = data!;
    })
  }

  public selectFacture(event:any){
    this.factureActive = event.id;
    this.getTotalsActive();
    this.getDeailsById();
  }
}
