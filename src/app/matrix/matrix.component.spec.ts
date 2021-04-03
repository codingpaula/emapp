import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CanvasMockComponent } from './canvas/canvas.component.mock';
import { DetailMockComponent } from './detail/detail.component.mock';
import { MatrixComponent } from './matrix.component';
import { initialState, MatrixState } from './matrix.reducers';
import { MatrixService } from './matrix.service';
import { MatrixMockService } from './matrix.service.mock';
import { SidebarMockComponent } from './sidebar/sidebar.component.mock';

describe('MatrixComponent', () => {
  let component: MatrixComponent;
  let fixture: ComponentFixture<MatrixComponent>;
  let matrix: any;
  let service: MatrixService;
  let store: MockStore<MatrixState>;

  beforeEach(
    waitForAsync(() => {
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
          [provideMockStore({ initialState })],
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(MatrixComponent);
      component = fixture.componentInstance;
      matrix = fixture.debugElement.componentInstance;
      service = TestBed.get(MatrixService);
      store = TestBed.inject(MockStore);
    }),
  );

  it('should create the matrix', () => {
    expect(matrix).toBeTruthy();
  });

  // TODO
  it('should get matrix data via store on init', () => {
    expect(true).toBeTrue();
  });
});
