import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialState, MatrixState } from '../matrix.reducers';
import { MatrixService } from '../matrix.service';
import { MatrixMockService } from '../matrix.service.mock';
import { TopicButtonMockComponent } from '../topic-button/topic-button.component.mock';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let sidebar: any;
  let store: MockStore<MatrixState>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SidebarComponent, TopicButtonMockComponent],
        providers: [
          {
            provide: MatrixService,
            useClass: MatrixMockService,
          },
          [provideMockStore({ initialState })],
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(SidebarComponent);
      component = fixture.componentInstance;
      sidebar = fixture.debugElement.componentInstance;
      store = TestBed.inject(MockStore);
    }),
  );

  it('should create the sidebar', () => {
    expect(sidebar).toBeTruthy();
  });
});
