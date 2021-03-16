import { defineAction } from "rd-redux-utils";
import { LoginModel } from "../components/login/LoginForm";
import {RegistrPageModel} from "features/auth/components/registration/RegisterForm";
import { RecoveryModel } from "../components/passwordRecoveryComponent/PasswordRecoveryComponent";
// import { ChangePasswordModel } from "../components/changePassword/ChangePasswordComponent";


export const loginAction = defineAction<LoginModel>("LOGIN");
export const RegistrAction = defineAction<RegistrPageModel>("REGISTER");
export const RecoveryAction = defineAction<RecoveryModel>('RECOVERY');
export const ChangePassword = defineAction<{password: string, token: string}>('CHANGE')

