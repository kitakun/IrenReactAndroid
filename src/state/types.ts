import { HumanTestState } from "./test/types";
import { PreviousTestState } from "./previous-test/types";

export type AppState = {
    test: HumanTestState,
    previousTest: PreviousTestState
}
