import { createSelector } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { MatrixState, Topic } from './matrix.interfaces';

export const selectMatrix = (state: AppState) => state.matrix;

export const selectMatrixTopics = createSelector(
  selectMatrix,
  (state: MatrixState) => state.topics,
);

export const selectMatrixIsLoading = createSelector(
  selectMatrix,
  (state: MatrixState) => state.isLoading,
);

export const selectMatrixErrorMessage = createSelector(
  selectMatrix,
  (state: MatrixState) => state.errorMessage,
);

export const selectMatrixTasks = createSelector(
  selectMatrix,
  (state: MatrixState) => state.tasks,
);

export const selectMatrixTopic = createSelector(
  selectMatrixTopics,
  (topics: Topic[], id: number) => topics.find((t) => t.id === id),
);
