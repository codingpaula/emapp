import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialState, MatrixState } from '../matrix.reducers';
import { MatrixService } from '../matrix.service';
import { MatrixMockService } from '../matrix.service.mock';
import { TaskDotMockComponent } from '../task-dot/task-dot.component.mock';
import { XPositionMockPipe } from '../x-position.pipe.mock';
import { YPositionMockPipe } from '../y-position.pipe.mock';
import { CanvasComponent } from './canvas.component';

describe('CanvasComponent', () => {
  let component: CanvasComponent;
  let fixture: ComponentFixture<CanvasComponent>;
  let canvas: any;
  let store: MockStore<MatrixState>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          CanvasComponent,
          TaskDotMockComponent,
          XPositionMockPipe,
          YPositionMockPipe,
        ],
        providers: [
          {
            provide: MatrixService,
            useClass: MatrixMockService,
          },
          [provideMockStore({ initialState })],
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(CanvasComponent);
      component = fixture.componentInstance;
      canvas = fixture.debugElement.componentInstance;
    }),
  );

  it('should create the canvas', () => {
    expect(canvas).toBeTruthy();
  });
});
