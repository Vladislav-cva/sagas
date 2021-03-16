import { all } from "redux-saga/effects";
import { handleLoginSaga, handleRecoverySaga, handleRegisterSaga, handleUpdateUserPasswordSaga } from "./AuthHandle";

export function* AuthSaga() {
    yield all([handleLoginSaga(), handleRegisterSaga(), handleRecoverySaga(), handleUpdateUserPasswordSaga()]);
}

