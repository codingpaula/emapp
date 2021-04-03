import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderMockComponent } from './header/header.component.mock';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: any;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [AppComponent, HeaderMockComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(AppComponent);
      app = fixture.debugElement.componentInstance;
    }),
  );

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'emapp'`, () => {
    expect(app.title).toEqual('emapp');
  });
});
