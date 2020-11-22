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

export const selectMatrixTasksByTopics = createSelector(
  selectMatrix,
  (state: MatrixState) => createTaskDictionary(state.tasks),
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
        if (c) {
          const foundTask = state.tasks.find((t) => t.id === c);
          if (foundTask) {
            result.push(foundTask);
          }
        }
      });
    }

    return result;
  },
);

const createTaskDictionary = (tasks: Task[]): TaskDictionary => {
  const dict: TaskDictionary = {};
  tasks.forEach((task) => {
    if (dict[task.topic]) {
      dict[task.topic].push(task);
    } else {
      dict[task.topic] = [task];
    }
  });
  return dict;
};
