import { HumanTestState, HumanTestAction, AnswerSelectedAction, LoadTestDataAction, NextQuestionAction } from "./types";
import { TEST_ACTION_TYPES } from "./actions";

export const initialState: HumanTestState = {
    currenctTestIndex: -1,
    passedTestIndexes: [],
    questions: [],
    incorrectAnswers: []
};

export const humanTestReducer = (
    state: HumanTestState = initialState,
    action: HumanTestAction
) => {
    switch (action.type) {
        case TEST_ACTION_TYPES.LOAD_TEST:
            const { testQuestions } = <LoadTestDataAction>action;
            const randomIndex = Math.floor(Math.random() * testQuestions.length);
            return {
                ...state,
                questions: testQuestions,
                currenctTestIndex: randomIndex,
                passedTestIndexes: [],
                incorrectAnswers: []
            } as HumanTestState;

        case TEST_ACTION_TYPES.NEXT_QUESTION:
            state.passedTestIndexes.push(state.currenctTestIndex);
            const protectionCount = state.questions.length;
            let nqRandomIndex = 0;
            let getNextQuestion = false;
            for (let i = 0; i < protectionCount; i++) {
                nqRandomIndex = Math.floor(Math.random() * state.questions.length);
                if (state.passedTestIndexes.indexOf(nqRandomIndex) < 0) {
                    getNextQuestion = true;
                    break;
                }
            }
            if (!getNextQuestion) {
                console.warn('TODO for some reason next question is not found...');
            }

            return { ...state, currenctTestIndex: nqRandomIndex } as HumanTestState;

        case TEST_ACTION_TYPES.SELECT_ANSWER:
            const { correct, correctText, selectedText } = <AnswerSelectedAction>action;
            if (!correct) {
                state.incorrectAnswers.push({
                    correctAnswer: correctText,
                    incorrectAsnwer: selectedText,
                    question: state.questions[state.currenctTestIndex].questionTest
                });
            }
            return { ...state };

        case TEST_ACTION_TYPES.CLEAR_TEST_DATA:
            return {
                ...state,
                incorrectAnswers: [],
                passedTestIndexes: [],
                currenctTestIndex: Math.floor(Math.random() * state.questions.length)
            } as HumanTestState;

        default:
            return state;
    }
}
