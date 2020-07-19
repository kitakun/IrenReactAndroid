import { combineReducers } from 'redux';
import { AppState } from './types';
// reducers
import { humanTestReducer } from './test/reducer';
import { previousTestReducer } from './previous-test/reducer';

export const rootReducer = combineReducers<AppState>({
    test: humanTestReducer,
    previousTest: previousTestReducer
});

export type RootState = ReturnType<typeof rootReducer>;