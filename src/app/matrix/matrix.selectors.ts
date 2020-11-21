import { createSelector } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { MatrixState, Task, TaskDictionary, Topic } from './matrix.interfaces';

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

export const selectTaskHistory = createSelector(
  selectMatrix,
  (state: MatrixState) => {
    const result: Task[] = [];

    if (state.taskHistory.length > 0) {
      state.taskHistory.forEach((c) => {
        if (c.topicId) {
          const foundTask = state.tasks[c.topicId].find(
            (t) => t.id === c.taskId,
          );
          if (foundTask) {
            result.push(foundTask);
          }
        }
      });
    }

    return result;
  },
);
