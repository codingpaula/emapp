import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CanvasMockComponent } from './canvas/canvas.component.mock';
import { MatrixComponent } from './matrix.component';
import { SidebarMockComponent } from './sidebar/sidebar.component.mock';

describe('MatrixComponent', () => {
  let component: MatrixComponent;
  let fixture: ComponentFixture<MatrixComponent>;
  let matrix: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MatrixComponent,
        SidebarMockComponent,
        CanvasMockComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MatrixComponent);
    component = fixture.componentInstance;
    matrix = fixture.debugElement.componentInstance;
  }));

  it('should create the matrix', () => {
    expect(matrix).toBeTruthy();
  });
});
