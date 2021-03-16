import {
  createProjectAction,
  deleteProjectAction,
  EditProjectAction,
  GetProjectAction,
  SearchAllFeaturesAction,
  SearchFeaturesAction,
  UpdateProjectAction,
} from "../projectAction";
import axios, { AxiosResponse } from "axios";
import { defineAction } from "rd-redux-utils";
import { put, takeEvery,  takeLatest } from "redux-saga/effects";
import { projectAppState } from "../projectReducer";
import { API_SERVERS } from "config";
import { RequestProjectModel } from "features/projects/components/formProject/FormProjectComponenet";
import { push } from "connected-react-router";
import { EditProjectModelInt } from "features/projects/models/projectModelIn";


export const projecttServerStartedAction = defineAction<projectAppState>(
  "PROJECT_AT_SERVER_STARTED"
);
export const projectAtServerCompletedAction = defineAction<projectAppState>(
  "PROJECT_AT_SERVER_SUCCESS"
);
export const projectAtServerFailedAction = defineAction<projectAppState>(
  "PROJECT_AT_SERVER_FAILED"
);

export const projectRegisterServerStartedAction = defineAction<projectAppState>(
  "REGISTER_PROJECT_AT_SERVER_STARTED"
);
export const projectRegisterAtServerCompletedAction = defineAction<projectAppState>(
  "REGISTER_PROJECT_AT_SERVER_SUCCESS"
);

export const projectDeleteServerStartedAction = defineAction<projectAppState>(
  "DELETE_PROJECT_AT_SERVER_STARTED"
);
export const projectDeleteAtServerCompletedAction = defineAction<projectAppState>(
  "Delete_PROJECT_AT_SERVER_SUCCESS"
);

export const searchFeaturesServerStartedAction = defineAction<projectAppState>(
  "SEARCH_FEATURES_AT_SERVER_STARTED"
);

export const searchFeaturesServerCompeteddAction = defineAction<projectAppState>(
  "SEARCH_FEATURES_AT_SERVER_SUCCESS"
);

export const searchAllTreeFeaturesServerStartedAction = defineAction<projectAppState>(
  "SEARCH_ALL_TREE_FEATURES_AT_SERVER_STARTED"
);

export const searchAllTreeFeaturesServerComplitedAction = defineAction<projectAppState>(
  "SEARCH_ALL_TREE_FEATURES_AT_SERVER_SUCCESS"
);

export const projectEditAtServerStartedAction = defineAction<projectAppState>(
  "PROJECT_EDIT_AT_SERVER_STARTED"
);

export const projectEditAtServerCompliteAction = defineAction<projectAppState>(
  "PROJECT_EDIT_AT_SERVER_SUCCESS"
);

export const updateProjectAtServerStartedAction = defineAction<projectAppState>(
  "PROJECT_UPDATE_AT_SERVER_STARTED"
);

export const updateProjectAtServerCompliteAction = defineAction<projectAppState>(
  "PROJECT_UPDATE_AT_SERVER_SUCCESS"
);

export function* handleProjectSaga() {
  yield takeEvery(GetProjectAction.TYPE, function* () {
    try {
      const config = {
          headers: {
           'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
    }

      yield put(
        projecttServerStartedAction({
          status: "running",
          projects: [],
        })
      );
      const response: AxiosResponse = yield axios.get(
        `${API_SERVERS}/project`,
        config
      );

      if (response.status === 200 || response.status === 304) {
        yield put(
          projectAtServerCompletedAction({
            status: "success",
            projects: response.data,
          })
        );
      }

      
    } catch (e) {
      yield put(
        projectAtServerFailedAction({
          status: "error",
          projects: [],
          error: e.toString(),
        })
      );
    }
  });
}

export function* handleRegisterProjectSaga() {
  yield takeEvery(
    createProjectAction.TYPE,
    function* (action: typeof createProjectAction.typeOf.action) {
      let testModel: RequestProjectModel = action;

      try {
        const config = {
          headers: {
           'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
    }
        yield put(
          projectRegisterServerStartedAction({
            status: "running",
          })
        );
        const response: AxiosResponse = yield axios.post(
          `${API_SERVERS}/project`,
          testModel,config
        );

        if (response.status === 200) {
          yield put(
            projectRegisterAtServerCompletedAction({
              status: "success",
            })
          );

          yield put(GetProjectAction({}));
        }

        yield put(push("/project"));
      } catch (e) {
        yield put(
          projectRegisterAtServerCompletedAction({
            status: "error",
            error: e.toString(),
          })
        );
      }
    }
  );
}

export function* handleDeleteProjectSaga() {
  yield takeEvery(
    deleteProjectAction.TYPE,
    function* (action: typeof deleteProjectAction.typeOf.action) {
      let testModel = action;

      try {
        const config = {
          headers: {
           'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
    }
        yield put(
          projectDeleteServerStartedAction({
            status: "running",
          })
        );
        
        
        const response: AxiosResponse = yield axios.delete(
          `${API_SERVERS}/project/${testModel.id}`,
          config
          // { data: testModel }
        );

        if (response.status === 200) {
          yield put(GetProjectAction({}))
          yield put(
            projectDeleteAtServerCompletedAction({
              status: "success",
            })
          );
        }
      } catch (e) {
        yield put(
          projectDeleteAtServerCompletedAction({
            status: "error",
            error: e.toString(),
          })
        );
      }
    }
  );
}

export function* handleSearchFeaturesSaga() {
  yield takeLatest(
    SearchFeaturesAction.TYPE,
    function* (
      action: typeof SearchFeaturesAction.typeOf.action
    ) {
      let query = action
      try {
        const config = {
          headers: {
           'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
    }
        yield put(
          searchFeaturesServerStartedAction({
            status: "running",

          })
        );
        const response: AxiosResponse = yield axios.get(
          `${API_SERVERS}/project/treeFeature/${query.query}`,
          config
        );
        
          
        if (response.status === 200) {
        yield put(
          searchFeaturesServerCompeteddAction({
            status: "success",
            searchFeatures: response.data
          })
        );
        }
        

      } catch (e) {
        yield put(
          searchFeaturesServerCompeteddAction({
            status: "error",
            error: e.toString(),
          })
        );
      }
    }
  );
}

export function* handleSearchAllFeaturesSaga() {
  yield takeEvery(
    SearchAllFeaturesAction.TYPE,
    function* (action: typeof SearchAllFeaturesAction.typeOf.action) {
      let queryID = action._id;
      let queryLevel = action.level;
      try {
        const config = {
          headers: {
           'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
    }
        yield put(
          searchAllTreeFeaturesServerStartedAction({
            status: "running",
          })
        );
        const response: AxiosResponse = yield axios.get(
          `${API_SERVERS}/project/name/${queryLevel}/${queryID}`,
          config
        );

        if (response.status === 200) {
          yield put(
            searchAllTreeFeaturesServerComplitedAction({
              status: "success",
              searchAllTreeFeatures: response.data,
            })
          );
        }
      } catch (e) {
        yield put(
          searchAllTreeFeaturesServerComplitedAction({
            status: "error",
            error: e.toString(),
          })
        );
      }
    }
  );
}

export function* handleEditProjectSaga() {
  yield takeEvery(
    EditProjectAction.TYPE,
    function* (action: typeof EditProjectAction.typeOf.action) {
      let _id = action._id;
      try {
        const config = {
          headers: {
           'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
    }
        yield put(
          projectEditAtServerStartedAction({
            status: "running",
            Allproject: {} as RequestProjectModel,
          })
        );
        const response: AxiosResponse = yield axios.post(
          `${API_SERVERS}/project/${_id}`,
          config 
          
          );


        if (response.status < 400 ) {
          yield put(
            projectEditAtServerCompliteAction({
              status: "success",
              Allproject: { ...response.data },
            })
          );
        }

        
      } catch (e) {
        yield put(
          projectEditAtServerCompliteAction({
            status: "error",
            Allproject: {} as RequestProjectModel,
            error: e.toString(),
          })
        );
      }
    }
  );
}

export function* handleUpdateProjectSaga() {
  yield takeEvery(
    UpdateProjectAction.TYPE,
    function* (action: typeof UpdateProjectAction.typeOf.action) {
      let updateModel: EditProjectModelInt = action;

      try {
        const config = {
          headers: {
           'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
    }
        yield put(
          updateProjectAtServerStartedAction({
            status: "running",
          })
        );
        const response: AxiosResponse = yield axios.put(
          `${API_SERVERS}/project/${updateModel.id}`,
          updateModel, config
        );

        if (response.status === 200) {
          yield put(
            updateProjectAtServerCompliteAction({
              status: "success",
            })
          );
        }

        yield put(push("/project"));
      } catch (e) {
        yield put(
          updateProjectAtServerCompliteAction({
            status: "error",
            error: e.toString(),
          })
        );
      }
    }
  );
}
