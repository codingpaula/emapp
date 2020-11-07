import { async, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatrixState } from './matrix.interfaces';
import { initialState } from './matrix.reducers';
import { MatrixService } from './matrix.service';

describe('MatrixService', () => {
  let store: MockStore<MatrixState>;
  let service: MatrixService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.get<Store<MatrixState>>(Store);
    service = TestBed.get(MatrixService);
  }));

  it('should create the matrix service', () => {
    expect(service).toBeTruthy();
  });
});
