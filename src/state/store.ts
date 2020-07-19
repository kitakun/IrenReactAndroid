import { combineReducers } from 'redux';
import { AppState } from './types';
import { humanTestReducer } from './test/reducer';

export const rootReducer = combineReducers<AppState>({
    test: humanTestReducer,
});

export type RootState = ReturnType<typeof rootReducer>;