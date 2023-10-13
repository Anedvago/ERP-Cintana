import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-accordion-categori',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatCardModule],
  templateUrl: './accordion-categori.component.html',
  styleUrls: ['./accordion-categori.component.css'],
})
export class AccordionCategoriComponent {
  @Input()
  public departaments!: any[];
  @Input()
  public sections!: any[];
  @Input()
  public families!: any[];
  @Output()
  public editCategory: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  public deleteCategory: EventEmitter<void> = new EventEmitter<void>();

  public emitEditCategory() {
    this.editCategory.emit();
  }

  public emitDeleteCategory() {
    this.deleteCategory.emit();
  }
}
