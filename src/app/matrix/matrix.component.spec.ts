import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CanvasMockComponent } from './canvas/canvas.component.mock';
import { DetailMockComponent } from './detail/detail.component.mock';
import { MatrixComponent } from './matrix.component';
import { MatrixService } from './matrix.service';
import { MatrixMockService } from './matrix.service.mock';
import { SidebarMockComponent } from './sidebar/sidebar.component.mock';

describe('MatrixComponent', () => {
  let component: MatrixComponent;
  let fixture: ComponentFixture<MatrixComponent>;
  let matrix: any;
  let service: MatrixService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        MatrixComponent,
        SidebarMockComponent,
        CanvasMockComponent,
        DetailMockComponent,
      ],
      providers: [
        {
          provide: MatrixService,
          useClass: MatrixMockService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MatrixComponent);
    component = fixture.componentInstance;
    matrix = fixture.debugElement.componentInstance;
    service = TestBed.get(MatrixService);
  }));

  it('should create the matrix', () => {
    expect(matrix).toBeTruthy();
  });

  it('should get matrix data via service on init', () => {
    const matrixServiceSpy = spyOn(service, 'getData');
    component.ngOnInit();
    expect(matrixServiceSpy).toHaveBeenCalled();
  });
});
