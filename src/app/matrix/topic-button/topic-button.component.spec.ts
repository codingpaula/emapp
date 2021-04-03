import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TopicButtonComponent } from './topic-button.component';

describe('TopicButtonComponent', () => {
  let component: TopicButtonComponent;
  let fixture: ComponentFixture<TopicButtonComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TopicButtonComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TopicButtonComponent);
      component = fixture.componentInstance;
    }),
  );

  it('should create topic button', () => {
    expect(component).toBeTruthy();
  });
});
