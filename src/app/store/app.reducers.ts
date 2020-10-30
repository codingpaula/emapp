import { ActionReducerMap } from '@ngrx/store';
import { matrixReducer } from '../matrix/matrix.reducers';
import { AppState } from './app.state';

export const appReducers: ActionReducerMap<AppState> = {
  matrix: matrixReducer,
};
