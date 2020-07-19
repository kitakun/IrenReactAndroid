import { IQuestion, IncorrectAnswer } from "src/types";

export type HumanTestState = {
    questions: Array<IQuestion>,
    incorrectAnswers: Array<IncorrectAnswer>,
    currenctTestIndex: number,
    passedTestIndexes: Array<number>
};

export type LoadTestDataAction = {
    type: string;
    testQuestions: Array<IQuestion>;
}

export type NextQuestionAction = {
    type: string;
}

export type AnswerSelectedAction = {
    type: string;
    correct: boolean;
    selectedText: string;
    correctText: string;
}

export type ClearTestDataAction = {
    type: string;
}

export type HumanTestAction = NextQuestionAction | AnswerSelectedAction | LoadTestDataAction | ClearTestDataAction;

export type AppState = {
    test: HumanTestState,
}
