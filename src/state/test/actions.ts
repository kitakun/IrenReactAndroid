import { NextQuestionAction, AnswerSelectedAction, LoadTestDataAction, ClearTestDataAction } from "../types";
import { IQuestion } from "src/types";

export enum TEST_ACTION_TYPES {
    LOAD_TEST = 'TEST/LOAD_TEST_DATA',
    NEXT_QUESTION = 'TEST/NEXT_QUESTION',
    SELECT_ANSWER = 'TEST/SELECT_ANSWER',
    CLEAR_TEST_DATA = 'TEST/CLEAR_TEST_DATA'
}

export const loadTestData = (data: Array<IQuestion>): LoadTestDataAction => ({
    type: TEST_ACTION_TYPES.LOAD_TEST,
    testQuestions: data
});

export const nextQuestion = (): NextQuestionAction => ({
    type: TEST_ACTION_TYPES.NEXT_QUESTION
});

export const selectAnswer = (answer: {
    selectedText: string,
    correctText: string
}): AnswerSelectedAction => ({
    type: TEST_ACTION_TYPES.SELECT_ANSWER,
    correct: answer.selectedText === answer.correctText,
    selectedText: answer.selectedText,
    correctText: answer.correctText
});

export const clearTestData = (): ClearTestDataAction => ({
    type: TEST_ACTION_TYPES.CLEAR_TEST_DATA
});
