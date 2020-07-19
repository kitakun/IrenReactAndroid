export interface IQuestion {
    questionTest: string;
    choices: Array<IChoice>;
}

export interface IChoice {
    text: string;
    correct: boolean;
}

export interface IncorrectAnswer {
    question: string;
    incorrectAsnwer: string;
    correctAnswer: string;
}
