import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDocumentComponent } from '../../components/form-document/form-document.component';
import { TableComponent } from 'src/app/shared/table/table.component';

@Component({
  selector: 'app-discharges',
  standalone: true,
  imports: [CommonModule, FormDocumentComponent, TableComponent],
  templateUrl: './discharges.component.html',
  styleUrls: ['./discharges.component.css']
})
export class DischargesComponent {
  public columnsList = ["date", "number"];
  public columnsDisplayList = ["Fecha", "Num"];
  public rowsList = [
    { date: "2023-03-09", number: "1" },
    { date: "2023-03-09", number: "2" },
    { date: "2023-03-09", number: "3" },
    { date: "2023-03-09", number: "4" },
    { date: "2023-03-09", number: "1" },
    { date: "2023-03-09", number: "2" },
    { date: "2023-03-09", number: "3" },
    { date: "2023-03-09", number: "4" },
    { date: "2023-03-09", number: "2" },
    { date: "2023-03-09", number: "3" },
    { date: "2023-03-09", number: "4" },
    { date: "2023-03-09", number: "1" },
    { date: "2023-03-09", number: "2" },
    { date: "2023-03-09", number: "3" },
    { date: "2023-03-09", number: "4" }];

  public columnsDetails = ["ref", "desc", "uni", "value", "discount", "total"];
  public columnsDisplayDetails = ["Ref", "Descripcion", "Unidades", "Precio", "Descuento", "Total"];
  public rowsDetails = [
    { ref: "A001", desc: "Arroz Por Libra", uni: "2", value: "2300", discount: "0", total: "4600" },
    { ref: "A001", desc: "Arroz Por Libra", uni: "2", value: "2300", discount: "0", total: "4600" },
    { ref: "A001", desc: "Arroz Por Libra", uni: "2", value: "2300", discount: "0", total: "4600" }];

  public columnsTotals = ["references", "units", "raw", "discount", "total"];
  public columnsDisplayTotals = ["Refernecias", "Unidades", "Bruto", "Descuento", "Neto"];
  public rowsTotals = [
    { references: "2", units: "4", raw: "15600", discount: "0", total: "4600" }];
}
