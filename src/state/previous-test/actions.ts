import {
    LoadTestDataAction,
    LoadTestDataAction_Success,
    LoadTestDataAction_Error
} from "./types";
// Thirdparty
import AsyncStorage from '@react-native-community/async-storage';
// Locals
import { getQuestionsFromFilePath, QuestionsResponse } from "../../logic";

export enum PREVIOUS_TEST_ACTION_TYPES {
    FETCH_PREVIOUS_TEST = 'PREVIOUS_TEST/FETCH',
    FETCH_PREVIOUS_SUCCESS = 'PREVIOUS_TEST/FETCH_SUCCESS',
    FETCH_PREVIOUS_ERROR = 'PREVIOUS_TEST/FETCH_ERROR',
}

const storeKey = 'previous_test';

export const fetchPreviousTest = (): any => async (dispatch: Function) => {
    dispatch(fetchPreviousTest_Start());
    try {
        const dataFromStorage = await AsyncStorage.getItem(storeKey);
        if (dataFromStorage && dataFromStorage.length > 0) {
            const testDataFromFile = await getQuestionsFromFilePath(dataFromStorage);
            dispatch(fetchPreviousTest_Success(testDataFromFile));
        } else {
            dispatch(fetchPreviousTest_Success(null));
        }
    } catch (err) {
        dispatch(fetchPreviousTest_Error(err));
    }
};

export const fetchPreviousTest_Start = (): LoadTestDataAction => ({
    type: PREVIOUS_TEST_ACTION_TYPES.FETCH_PREVIOUS_TEST,
});

export const fetchPreviousTest_Success = (parsedData: QuestionsResponse | null): LoadTestDataAction_Success => ({
    type: PREVIOUS_TEST_ACTION_TYPES.FETCH_PREVIOUS_SUCCESS,
    data: parsedData
});

export const fetchPreviousTest_Error = (err: Error): LoadTestDataAction_Error => ({
    type: PREVIOUS_TEST_ACTION_TYPES.FETCH_PREVIOUS_ERROR,
    error: err
});

export const storePreviousTest = (unpackFileName: string): any => async (dispatch: Function) => {
    await AsyncStorage.setItem(storeKey, unpackFileName);
};
