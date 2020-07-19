import { LoadTestDataAction, PreviousTestState, PreviousTestActions, PreviousTestStatus, LoadTestDataAction_Success, LoadTestDataAction_Error } from "./types";
import { fetchPreviousTest, PREVIOUS_TEST_ACTION_TYPES } from "./actions";


export const initialState: PreviousTestState = {
    status: PreviousTestStatus.NotInited,
    data: null
};

export const previousTestReducer = (
    state: PreviousTestState = initialState,
    action: PreviousTestActions
) => {
    switch (action.type) {
        case PREVIOUS_TEST_ACTION_TYPES.FETCH_PREVIOUS_TEST:
            return {
                ...state,
                status: PreviousTestStatus.Fetching
            } as PreviousTestState;

        case PREVIOUS_TEST_ACTION_TYPES.FETCH_PREVIOUS_SUCCESS:
            const { data } = <LoadTestDataAction_Success>action;
            return {
                ...state,
                data: data,
                status: PreviousTestStatus.Loaded
            } as PreviousTestState;

        case PREVIOUS_TEST_ACTION_TYPES.FETCH_PREVIOUS_ERROR:
            const { error } = <LoadTestDataAction_Error>action;
            console.error(error);
            return {
                ...state,
                status: PreviousTestStatus.Error
            } as PreviousTestState;

        default:
            return state;
    }
}
