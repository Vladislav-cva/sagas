import { defineAction } from "rd-redux-utils";
import { RequestProjectModel } from "features/projects/components/formProject/FormProjectComponenet";
import { EditProjectModelInt } from "../models/projectModelIn";




export const GetProjectAction = defineAction("PROJECTS_RESPONSE");
export const createProjectAction = defineAction<RequestProjectModel>("REQUEST_PROJECT")
export const deleteProjectAction = defineAction<{id: string}>("DELETE_PROJECT")
export const SearchFeaturesAction = defineAction<{query: string}>("SEARCH_FEATURES_NAME")
export const SearchAllFeaturesAction = defineAction<{_id: string, level: string}>("SEARCH_ALL_FEATURES")
export const EditProjectAction = defineAction<{_id: string}>("EDIT_PROJECT")
export const UpdateProjectAction = defineAction<EditProjectModelInt>("UPDATE_PROJECT")

