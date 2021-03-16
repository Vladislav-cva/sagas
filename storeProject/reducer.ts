import { Action } from "redux";
import { changePasswordAtserverComplitedAction,
        loginAtServerCompletedAction, loginAtServerStartedAction, recoveryEmailAtServerCompletedAction, registerAtServerStartedAction } from "./saga/AuthHandle";

export interface AuthAppState {
    status: "initial" | "running" | "success" | "error";
    error?: string;
    accessToken?: string;
}

export function authReducer(state: AuthAppState = { status: "initial"}, action: Action): AuthAppState {
    if (loginAtServerStartedAction.is(action)) {
        return {
            ...state,
            status: "running",
            error: undefined
        };
    }
    if (loginAtServerCompletedAction.is(action)) {
        return {
            ...state,
            status: action.status,
            accessToken: action.accessToken,
            error: action.error,
        };
    }
    if (registerAtServerStartedAction.is(action)) {
        return {
            ...state,
            status: action.status,
            accessToken: action.accessToken,
            error: action.error,
        };
    }
    if (recoveryEmailAtServerCompletedAction.is(action)) {
        return {
            ...state,
            status: action.status,
            error: action.error,
        };
    }

    if (changePasswordAtserverComplitedAction.is(action)) {
        return {
            ...state,
            status: action.status,
            error: action.error,
        };
    }

    return state;
};
