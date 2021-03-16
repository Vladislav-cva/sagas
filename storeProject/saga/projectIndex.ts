
import { all } from "redux-saga/effects";
import { handleDeleteProjectSaga, handleEditProjectSaga, handleProjectSaga, handleRegisterProjectSaga, handleSearchAllFeaturesSaga, handleSearchFeaturesSaga, handleUpdateProjectSaga } from "./projectHandle";


export function* ProjectSaga() {
    yield all([handleProjectSaga(),
            handleRegisterProjectSaga(),
            handleDeleteProjectSaga(),
            handleSearchFeaturesSaga(),
            handleSearchAllFeaturesSaga(),
            handleEditProjectSaga(),
            handleUpdateProjectSaga()
        ]);
}