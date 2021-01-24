import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { DropdownItem } from '../matrix.interfaces';
import { selectMatrixTopicsDropdownItems } from '../matrix.selectors';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent implements OnInit {
  @Input() topic!: FormGroup;
  @Input() selectedId = -1;
  @Input() formName = '';
  @Output() selection = new EventEmitter<number>();
  options$: Observable<DropdownItem[]> = of([]);

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.options$ = this.store.pipe(select(selectMatrixTopicsDropdownItems));
  }
}
