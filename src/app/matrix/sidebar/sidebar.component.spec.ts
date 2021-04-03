import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Color } from 'src/app/shared/color.interfaces';
import { toggleTopicVisibility } from '../matrix.actions';
import { Topic } from '../matrix.interfaces';
import { initialState, MatrixState } from '../matrix.reducers';
import { selectMatrixTopics } from '../matrix.selectors';
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
        providers: [[provideMockStore({ initialState })]],
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

  it('should set topics on init', () => {
    // arrange
    const testTopic: Topic = {
      id: 1,
      name: 'topic',
      color: Color.green,
      visible: true,
      deleted: false,
    };
    store.overrideSelector(selectMatrixTopics, [testTopic]);
    store.refreshState();
    // act
    component.ngOnInit();
    // assert
    expect(component.topics).toEqual([testTopic]);
  });

  it('should dispatch toggleTopicVisiblity on toggle', () => {
    // arrange
    const dispatchSpy = spyOn(store, 'dispatch');
    // act
    component.toggleVisibility(1);
    // assert
    expect(dispatchSpy).toHaveBeenCalledWith(
      toggleTopicVisibility({ topicId: 1 }),
    );
  });
});
