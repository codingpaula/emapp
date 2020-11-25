import { async, TestBed } from '@angular/core/testing';
import { Color } from '../shared/color.interfaces';
import {
  AddTopic,
  AddTopicFailed,
  AddTopicSuccess,
  DeleteTaskFailed,
  DeleteTaskSuccess,
  GetMatrixData,
  GetMatrixDataFailed,
  GetMatrixDataSuccess,
  MatrixAction,
  SelectTask,
  ToggleTopicVisibility,
  UpdateTask,
  UpdateTaskFailed,
  UpdateTaskSuccess,
  UpdateTopic,
  UpdateTopicFailed,
  UpdateTopicSuccess,
} from './matrix.actions';
import { MatrixState, Task, Topic } from './matrix.interfaces';
import { matrixReducer } from './matrix.reducers';

describe('MatrixReducers', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({});
  }));

  describe('loading cases', () => {
    let defaultState: MatrixState;
    let loadingState: MatrixState;

    beforeEach(() => {
      defaultState = {
        topics: [],
        tasks: [],
        taskHistory: [],
        isLoading: false,
        errorMessage: undefined,
      };

      loadingState = {
        ...defaultState,
        isLoading: true,
      };
    });

    it('should set loading on GET_MATRIX_DATA', () => {
      const action: MatrixAction = new GetMatrixData();
      const newState = matrixReducer(defaultState, action);
      expect(newState).toEqual(loadingState);
    });

    it('should set loading on UPDATE_TASK', () => {
      const action: MatrixAction = new UpdateTask(
        new Task(1, 'test', 1, 1, 1, 12, 2020),
      );
      const newState = matrixReducer(defaultState, action);
      expect(newState).toEqual(loadingState);
    });

    it('should set loading on UPDATE_TOPIC', () => {
      const action: MatrixAction = new UpdateTopic(
        new Topic(1, 'test', Color.orange, true, false),
      );
      const newState = matrixReducer(defaultState, action);
      expect(newState).toEqual(loadingState);
    });

    it('should set loading on ADD_TOPIC', () => {
      const action: MatrixAction = new AddTopic();
      const newState = matrixReducer(defaultState, action);
      expect(newState).toEqual(loadingState);
    });
  });

  describe('failed cases', () => {
    let defaultState: MatrixState;
    let failedState: MatrixState;
    let errorMessage: string;

    beforeEach(() => {
      defaultState = {
        topics: [],
        tasks: [],
        taskHistory: [],
        isLoading: true,
        errorMessage: undefined,
      };

      errorMessage = 'test error message';

      failedState = {
        ...defaultState,
        isLoading: false,
        errorMessage,
      };
    });

    it('should set error message on GET_MATRIX_DATA_FAILED', () => {
      const action: MatrixAction = new GetMatrixDataFailed(errorMessage);
      const newState = matrixReducer(defaultState, action);
      expect(newState).toEqual(failedState);
    });

    it('should set error message on UPDATE_TASK_FAILED', () => {
      const action: MatrixAction = new UpdateTaskFailed(errorMessage);
      const newState = matrixReducer(defaultState, action);
      expect(newState).toEqual(failedState);
    });

    it('should set error message on UPDATE_TOPIC_FAILED', () => {
      const action: MatrixAction = new UpdateTopicFailed(errorMessage);
      const newState = matrixReducer(defaultState, action);
      expect(newState).toEqual(failedState);
    });

    it('should set error mesage on ADD_TOPIC_FAILED', () => {
      const action: MatrixAction = new AddTopicFailed(errorMessage);
      const newState = matrixReducer(defaultState, action);
      expect(newState).toEqual(failedState);
    });
  });

  describe('unloading cases', () => {
    let defaultState: MatrixState;

    beforeEach(() => {
      defaultState = {
        topics: [new Topic(1, 'test', Color.orange, true, false)],
        tasks: [new Task(1, 'Test', 1, 1, 1, 1, 21)],
        taskHistory: [],
        isLoading: true,
        errorMessage: 'test message',
      };
    });

    it('should set unloading on GET_MATRIX_DATA_SUCCESS', () => {
      const action: MatrixAction = new GetMatrixDataSuccess({
        topics: [],
        tasks: [],
      });
      const newState = matrixReducer(defaultState, action);
      expect(newState.isLoading).toEqual(false);
      expect(newState.errorMessage).toBeUndefined();
    });

    it('should set unloading on UPDATE_TASK_SUCCESS', () => {
      const action: MatrixAction = new UpdateTaskSuccess(
        new Task(1, 'test', 1, 1, 1, 12, 2020),
      );
      const newState = matrixReducer(defaultState, action);
      expect(newState.isLoading).toEqual(false);
      expect(newState.errorMessage).toBeUndefined();
    });

    it('should set unloading on ADD_TOPIC_SUCCESS', () => {
      const action: MatrixAction = new AddTopicSuccess(
        new Topic(2, 'test', Color.orange, true, false),
      );
      const newState = matrixReducer(defaultState, action);
      expect(newState.isLoading).toEqual(false);
      expect(newState.errorMessage).toBeUndefined();
    });

    it('should set unloading on UPDATE_TOPIC_SUCCESS', () => {
      const action: MatrixAction = new UpdateTopicSuccess(
        new Topic(1, 'test', Color.green, true, false),
      );
      const newState = matrixReducer(defaultState, action);
      expect(newState.isLoading).toEqual(false);
      expect(newState.errorMessage).toBeUndefined();
    });

    it('should set unloading on DELETE_TASK_SUCCESS', () => {
      const action: MatrixAction = new DeleteTaskSuccess(
        new Task(
          1,
          'Test',
          1,
          1,
          1,
          1,
          21,
          '',
          false,
          true,
          new Date(),
          new Date(),
          new Date(),
        ),
      );
      const newState = matrixReducer(defaultState, action);
      expect(newState.isLoading).toEqual(false);
      expect(newState.errorMessage).toBeUndefined();
    });
  });

  describe('success states', () => {
    let defaultState: MatrixState;
    let emptyState: MatrixState;

    beforeEach(() => {
      emptyState = {
        topics: [],
        tasks: [],
        taskHistory: [],
        isLoading: true,
        errorMessage: undefined,
      };

      defaultState = {
        ...emptyState,
        topics: [new Topic(1, 'test', Color.orange, true, false)],
        tasks: [],
      };
    });

    it('should set new data on GET_MATRIX_DATA_SUCCESS', () => {
      const action: MatrixAction = new GetMatrixDataSuccess({
        topics: [new Topic(1, 'test', Color.orange, true, false)],
        tasks: [],
      });
      const newState = matrixReducer(emptyState, action);
      expect(newState).toEqual({ ...defaultState, isLoading: false });
    });

    it('should update task on UPDATE_TASK_SUCCESS', () => {
      defaultState = {
        ...defaultState,
        tasks: [new Task(1, 'test', 1, 1, 1, 12, 20)],
      };
      const updatedTask = new Task(1, 'test', 7, 1, 1, 12, 20);
      const action: MatrixAction = new UpdateTaskSuccess(updatedTask);
      const newState = matrixReducer(defaultState, action);
      expect(newState.tasks).toContain(updatedTask);
    });

    it('should delete task on DELETE_TASK_SUCCESS', () => {
      defaultState = {
        ...defaultState,
        tasks: [new Task(1, 'test', 1, 1, 1, 1, 21)],
      };
      const updatedTask = new Task(
        1,
        'test',
        1,
        1,
        1,
        1,
        21,
        '',
        false,
        true,
        undefined,
        undefined,
        new Date(),
      );
      const action: MatrixAction = new DeleteTaskSuccess(updatedTask);
      const newState = matrixReducer(defaultState, action);
      expect(newState.tasks[0]).toEqual(updatedTask);
    });

    it('should add topic on ADD_TOPIC_SUCCESS', () => {
      const newTopic = new Topic(2, 'test', Color.green, true, false);
      const action: MatrixAction = new AddTopicSuccess(newTopic);
      const newState = matrixReducer(defaultState, action);
      expect(newState.topics).toContain(newTopic);
    });

    it('should update topic on UPDATE_TOPIC_SUCCESS', () => {
      const updatedTopic = new Topic(1, 'test', Color.green, true, false);
      const action: MatrixAction = new UpdateTopicSuccess(updatedTopic);
      const newState = matrixReducer(defaultState, action);
      expect(newState.topics).toContain(updatedTopic);
    });
  });

  describe('toggle visibility', () => {
    let defaultState: MatrixState;

    beforeEach(() => {
      defaultState = {
        topics: [
          new Topic(1, 'test', Color.green, true, false),
          new Topic(2, 'test', Color.orange, false, false),
        ],
        tasks: [],
        taskHistory: [],
        isLoading: false,
        errorMessage: undefined,
      };
    });

    it('should toggle visibility on TOGGLE_TOPIC_VISIBILITY', () => {
      const action1: MatrixAction = new ToggleTopicVisibility(1);
      const action2: MatrixAction = new ToggleTopicVisibility(2);
      const newState1 = matrixReducer(defaultState, action1);
      expect(newState1.topics[0].visible).toEqual(false);
      expect(newState1.topics[1].visible).toEqual(false);
      const newState2 = matrixReducer(newState1, action2);
      expect(newState2.topics[0].visible).toEqual(false);
      expect(newState2.topics[1].visible).toEqual(true);
    });

    it('should not change if topic not found on TOGGLE_TOPIC_VISIBILITY', () => {
      const action: MatrixAction = new ToggleTopicVisibility(3);
      const newState = matrixReducer(defaultState, action);
      expect(newState).toEqual(defaultState);
    });
  });

  describe('select task', () => {
    let defaultState: MatrixState;

    beforeEach(() => {
      defaultState = {
        topics: [],
        tasks: [
          new Task(1, 'test', 1, 1, 1, 1, 21),
          new Task(2, 'test', 1, 1, 1, 1, 21),
          new Task(3, 'test', 1, 1, 1, 1, 21),
          new Task(4, 'test', 1, 1, 1, 1, 21),
          new Task(5, 'test', 1, 1, 1, 1, 21),
          new Task(6, 'test', 1, 1, 1, 1, 21),
          new Task(7, 'test', 1, 1, 1, 1, 21),
        ],
        taskHistory: [],
        isLoading: false,
        errorMessage: undefined,
      };
    });

    it('should select tasks in correct order on SELECT_TASK', () => {
      const action1: MatrixAction = new SelectTask(1);
      const action2: MatrixAction = new SelectTask(2);
      const action3: MatrixAction = new SelectTask(3);
      const action4: MatrixAction = new SelectTask(4);
      let newState = matrixReducer(defaultState, action1);
      newState = matrixReducer(newState, action2);
      newState = matrixReducer(newState, action3);
      newState = matrixReducer(newState, action4);
      newState = matrixReducer(newState, action4);
      expect(newState.taskHistory).toEqual([4, 3, 2, 1]);
    });

    it('should only select task once on SELECT_TASK', () => {
      const action: MatrixAction = new SelectTask(1);
      let newState = matrixReducer(defaultState, action);
      newState = matrixReducer(newState, action);
      expect(newState.taskHistory).toEqual([1]);
    });

    it('should only change taskHistory on SELECT_TASK', () => {
      const action: MatrixAction = new SelectTask(1);
      const newState = matrixReducer(defaultState, action);
      expect(newState).toEqual({ ...defaultState, taskHistory: [1] });
    });

    it('should correctly order tasks in history on SELECT_TASK', () => {
      const action1: MatrixAction = new SelectTask(1);
      const action7: MatrixAction = new SelectTask(7);
      const action5: MatrixAction = new SelectTask(5);
      const action3: MatrixAction = new SelectTask(3);
      let newState = matrixReducer(defaultState, action1);
      newState = matrixReducer(newState, action7);
      newState = matrixReducer(newState, action5);
      newState = matrixReducer(newState, action3);
      newState = matrixReducer(newState, action3);
      newState = matrixReducer(newState, action1);
      expect(newState.taskHistory).toEqual([1, 3, 5, 7]);
    });

    it('should only take 6 elements in history on SELECT_TASK', () => {
      let newState = matrixReducer(defaultState, new SelectTask(1));
      for (let i = 2; i < 8; i++) {
        newState = matrixReducer(newState, new SelectTask(i));
      }
      expect(newState.taskHistory.length).toEqual(6);
    });
  });
});
