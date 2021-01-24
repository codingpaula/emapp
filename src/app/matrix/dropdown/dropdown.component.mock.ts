import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DropdownItem } from '../matrix.interfaces';

@Component({
  selector: 'app-dropdown',
  template: '<div>DropdownMockComponent</div>',
})
export class DropdownMockComponent {
  @Input() topic!: FormGroup;
  @Input() selectedId = -1;
  @Input() formName = '';
  @Output() selection = new EventEmitter<number>();
}
