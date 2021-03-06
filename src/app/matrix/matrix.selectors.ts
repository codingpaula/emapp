import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { DropdownItem, Task, TaskDictionary, Topic } from './matrix.interfaces';
import { MatrixState } from './matrix.reducers';

export const selectMatrix = (state: AppState) => state.matrix;

export const selectMatrixTopics = createSelector(
  selectMatrix,
  (state: MatrixState) => state.topics,
);

export const selectMatrixRequestStatus = createSelector(
  selectMatrix,
  (state: MatrixState) => state.requestStatus,
);

export const selectMatrixTasks = createSelector(
  selectMatrix,
  (state: MatrixState) => state.tasks,
);

export const selectMatrixActiveTasks = createSelector(
  selectMatrixTasks,
  (tasks: Task[]) => tasks.filter((t) => !t.deleted && !t.done),
);

export const selectMatrixDoneTasks = createSelector(
  selectMatrixTasks,
  (tasks: Task[]) => tasks.filter((t) => t.done && !t.deleted),
);

export const selectMatrixTasksByTopics = createSelector(
  selectMatrixTasks,
  (tasks: Task[]) => createTaskDictionary(tasks),
);

export const selectMatrixActiveTasksByTopics = createSelector(
  selectMatrixActiveTasks,
  (tasks: Task[]) => createTaskDictionary(tasks),
);

export const selectMatrixDoneTasksByTopics = createSelector(
  selectMatrixDoneTasks,
  (tasks: Task[]) => createTaskDictionary(tasks),
);

export const selectMatrixTopic = createSelector(
  selectMatrixTopics,
  (topics: Topic[], id: number) => topics.find((t) => t.id === id),
);

export const selectMatrixTopicsDropdownItems = createSelector(
  selectMatrixTopics,
  (topics: Topic[]) =>
    topics.map((topic) => {
      var item: DropdownItem = {
        id: topic.id,
        value: topic.name,
        color: topic.color,
      };
      return item;
    }),
);

export const selectMatrixTaskHistory = createSelector(
  selectMatrix,
  (state: MatrixState) => state.taskHistory,
);

export const selectCurrentTaskHistory = createSelector(
  selectMatrixTaskHistory,
  selectMatrixActiveTasks,
  (history: number[], tasks: Task[]) => {
    const result: Task[] = [];

    if (history.length > 0) {
      history.forEach((c) => {
        if (c) {
          const foundTask = tasks.find((t) => t.id === c);
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
