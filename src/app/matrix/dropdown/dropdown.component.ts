import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropdownItem } from '../matrix.interfaces';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent {
  @Input() options: DropdownItem[] = [];
  @Input() selected = -1;
  @Input() formControlName = '';
  @Output() selection = new EventEmitter<number>();

  constructor() {}
}
