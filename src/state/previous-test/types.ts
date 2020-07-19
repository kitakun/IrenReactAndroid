export type PreviousTestState = {
    status: PreviousTestStatus
    data: any;
};

export type LoadTestDataAction = {
    type: string;
}

export type LoadTestDataAction_Success = {
    type: string;
    data: any;
}

export type LoadTestDataAction_Error = {
    type: string;
    error: Error;
}

export enum PreviousTestStatus {
    NotInited = 0,
    Fetching = 1,
    Loaded = 2,
    Error = 3
}

export type PreviousTestActions = LoadTestDataAction | LoadTestDataAction_Success | LoadTestDataAction_Error;
