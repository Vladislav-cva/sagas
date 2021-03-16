import { ChangePassword, RecoveryAction } from './../actions';
import axios, { AxiosResponse } from "axios";
import { defineAction } from "rd-redux-utils";
import { push } from "react-router-redux";
import { put, takeEvery } from "redux-saga/effects";
import { API_SERVERS } from "../../../../config";
import { LoginModel } from "../../components/login/LoginForm";
import { loginAction } from "../actions";
import { AuthAppState } from "../reducer";
import {RegistrAction} from "../actions";
import { RecoveryModel } from 'features/auth/components/passwordRecoveryComponent/PasswordRecoveryComponent';



export const loginAtServerStartedAction = defineAction<AuthAppState>(
  "LOGIN_AT_SERVER_STARTED"
);
export const loginAtServerCompletedAction = defineAction<AuthAppState>(
  "LOGIN_AT_SERVER_SUCCESS"
);

export const registerAtServerStartedAction = defineAction<AuthAppState>(
  "REGISTER_AT_SERVER_STARTED"
);

export const registerAtServerCompletedAction = defineAction<AuthAppState>(
  "REGISTER_AT_SERVER_SUCCESS"
);

export const recoveryEmailAtServerStartedAction = defineAction<AuthAppState>(
  "RECOVERY_AT_SERVER_STARTED"
);

export const recoveryEmailAtServerCompletedAction = defineAction<AuthAppState>(
  "RECOVERY_AT_SERVER_SUCCESS"
);

export const changePasswordServerAtStarted = defineAction<AuthAppState>(
  "CHANGE_PASSWORD_AT_SERVER_STARTED"
);

export const changePasswordAtserverComplitedAction = defineAction<AuthAppState>(
  "CHANGE_PASSWORD_AT_SERVER_SUCCESS"
);



export function* handleLoginSaga() {
  yield takeEvery(
    loginAction.TYPE,
    function* (action: typeof loginAction.typeOf.action) {
      let testModel: LoginModel = action;

      try {
        yield put(
          loginAtServerStartedAction({
            status: "running",
          })
        );
        const response: AxiosResponse = yield axios.post(
          `${API_SERVERS}/login`,
          testModel
        );

        if (response.status === 200) {
        
        yield put(
          loginAtServerCompletedAction({
            status: "success",
            accessToken: response.data.token,
          }),
          );
         localStorage.setItem("token",response.data.token) 
          console.log(localStorage)
          yield put(push("/homePage"));
        
          return
          
        }
        
      } catch (e) {
        yield put(
          loginAtServerCompletedAction({
            status: "error",
            error: e.toString(),
          })
        );
      }
    }
  );
}



export function* handleRegisterSaga() {
  yield takeEvery(
    RegistrAction.TYPE,
    function* (action: typeof RegistrAction.typeOf.action) {
      let testModel: LoginModel = action;

      try {
        yield put(
          registerAtServerStartedAction({
            status: "running",
          })
        );
        const response: AxiosResponse = yield axios.post(
          `${API_SERVERS}/users`,
          testModel
        );

        if (response.status === 200) {
        
        yield put(
          registerAtServerCompletedAction({
            status: "success",
          })
        );
        }
        
        yield put(push("/homePage"));
      } catch (e) {
        yield put(
          registerAtServerCompletedAction({
            status: "error",
            error: e.toString(),
          })
        );
      }
    }
  );
}


export function* handleRecoverySaga() {
  yield takeEvery(
    RecoveryAction.TYPE,
    function* (action: typeof RecoveryAction.typeOf.action) {
      let testModel: RecoveryModel = action;

      try {
        yield put(
          recoveryEmailAtServerStartedAction({
            status: "running",
          })
        );
        const response: AxiosResponse = yield axios.post(
          `${API_SERVERS}/login/forgotPassword`,
          testModel
        );

        if (response.status === 200) {
        
        yield put(
          recoveryEmailAtServerCompletedAction({
            status: "success",
          })
        );
        }
        
        yield put(push("/info"));
      } catch (e) {
        yield put(
          recoveryEmailAtServerCompletedAction({
            status: "error",
            error: e.toString(),
          })
        );
      }
    }
  );
};

export function* handleUpdateUserPasswordSaga() {
  yield takeEvery(
    ChangePassword.TYPE,
    function* (action: typeof ChangePassword.typeOf.action) {
      let updateModel = action;

      try {
        yield put(
          changePasswordServerAtStarted({
            status: "running",
          })
        );
        const response: AxiosResponse = yield axios.post(
          `${API_SERVERS}/login/changePassword`,
          updateModel,
        );

        if (response.status < 400) {
          yield put(
            changePasswordAtserverComplitedAction({
              status: "success",
            })
          );
        }
        yield put(push("/PasswordChanged"));

      } catch (e) { 
        yield put(
          changePasswordAtserverComplitedAction({
            status: "error",
            error: e.toString(),
          })
        );
        // yield put(push("/login"));
      }
    }
  );
}