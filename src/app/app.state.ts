import * as fromMatrix from './matrix/matrix.reducers';

export interface AppState {
  [fromMatrix.matrixFeatureKey]: fromMatrix.MatrixState;
}
