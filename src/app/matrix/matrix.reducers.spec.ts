import { async, TestBed } from '@angular/core/testing';
import { Color } from '../shared/color.interfaces';
import {
  AddTopic,
  AddTopicFailed,
  AddTopicSuccess,
  GetMatrixData,
  GetMatrixDataFailed,
  GetMatrixDataSuccess,
  MatrixAction,
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
        tasks: {},
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
        tasks: {},
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
        tasks: { [1]: [] },
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
  });

  describe('success states', () => {
    let defaultState: MatrixState;
    let emptyState: MatrixState;

    beforeEach(() => {
      emptyState = {
        topics: [],
        tasks: {},
        taskHistory: [],
        isLoading: true,
        errorMessage: undefined,
      };

      defaultState = {
        ...emptyState,
        topics: [new Topic(1, 'test', Color.orange, true, false)],
        tasks: {},
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
        tasks: [new Task(1, 'test', 1, 1, 1, 12, 2020)],
      };
      const updatedTask = new Task(1, 'test', 7, 1, 1, 12, 2020);
      const action: MatrixAction = new UpdateTaskSuccess(updatedTask);
      const newState = matrixReducer(defaultState, action);
      expect(newState.tasks[1]).toContain(updatedTask);
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
        tasks: {},
        taskHistory: [],
        isLoading: false,
        errorMessage: undefined,
      };
    });

    it('should toggle visibility on TOGGLE_TOPIC_VISIBILITY', () => {
      const action: MatrixAction = new ToggleTopicVisibility(1);
      const newState = matrixReducer(defaultState, action);
      expect(newState.topics[0].visible).toEqual(false);
    });

    it('should not change if topic not found on TOGGLE_TOPIC_VISIBILITY', () => {
      const action: MatrixAction = new ToggleTopicVisibility(3);
      const newState = matrixReducer(defaultState, action);
      expect(newState).toEqual(defaultState);
    });
  });
});
