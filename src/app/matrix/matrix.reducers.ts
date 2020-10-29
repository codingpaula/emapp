import { createReducer, on, Action } from '@ngrx/store';
import {
  getMatrixDataSuccess,
  getMatrixData,
  getMatrixDataFailed,
} from './matrix.actions';
import { MatrixState } from './matrix.interfaces';

export const initialState: MatrixState = {
  topics: [],
  isLoading: false,
  errorMessage: undefined,
};

const matrixReducer = createReducer(
  initialState,
  on(getMatrixData, (state) => setLoadingState(state)),
  on(getMatrixDataFailed, (state, { message }) =>
    setFailedState(state, message)
  ),
  on(getMatrixDataSuccess, (state, { topics }) =>
    setUnloadingState({ ...state, topics })
  )
);

export function reducer(state: MatrixState | undefined, action: Action) {
  return matrixReducer(state, action);
}

const setFailedState = (state: MatrixState, message: string): MatrixState => {
  return {
    ...state,
    isLoading: false,
    errorMessage: message,
  };
};

const setUnloadingState = (state: MatrixState): MatrixState => {
  return {
    ...state,
    isLoading: false,
    errorMessage: undefined,
  };
};

const setLoadingState = (state: MatrixState): MatrixState => {
  return {
    ...state,
    isLoading: true,
    errorMessage: undefined,
  };
};
