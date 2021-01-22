import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownComponent } from './dropdown.component';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
  }));

  it('should create dropdown', () => {
    expect(component).toBeTruthy();
  });
});
