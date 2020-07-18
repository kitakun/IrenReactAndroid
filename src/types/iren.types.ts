export interface IQuestion {
    questionTest: string;
    choices: Array<IChoice>;
}

export interface IChoice {
    text: string;
    correct: boolean;
}