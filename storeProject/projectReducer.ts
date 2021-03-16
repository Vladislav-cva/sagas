import { projectAtServerCompletedAction, projectDeleteAtServerCompletedAction, projectDeleteServerStartedAction, projectEditAtServerCompliteAction, projectRegisterAtServerCompletedAction, projecttServerStartedAction, searchAllTreeFeaturesServerComplitedAction, searchFeaturesServerCompeteddAction, updateProjectAtServerCompliteAction } from "./saga/projectHandle";
import { Action } from "redux";
import { ProjectModelInterface } from "layout/contentCard/contentCard";
import { ProjectFeatureModel, searchFeatures } from "../components/FormFeaturesComponent/FormFeaturesComponent";
import { RequestProjectModel } from "../components/formProject/FormProjectComponenet";

export interface projectAppState {
    status: "initial" | "running" | "success" | "error";
    error?: string;
    projects?: ProjectModelInterface[]
    searchFeatures?: searchFeatures[]
    searchAllTreeFeatures?: ProjectFeatureModel[]
    Allproject?: RequestProjectModel

}

export function projectReducer(state: projectAppState = { status: "initial", projects: [], Allproject: {} as RequestProjectModel}, action: Action): projectAppState {
    if (projecttServerStartedAction.is(action)) {
        return {
            ...state,
            status: "running",
            error: undefined
        };
    }
    if (projectAtServerCompletedAction.is(action)) {
        return {
            ...state,
            status: action.status,
            projects: action.projects
        };
    }
    if (projectRegisterAtServerCompletedAction.is(action)) {
        return {
            ...state,
            status: action.status,
            
        };
    }
    if (projectDeleteServerStartedAction.is(action)) {
        return {
            ...state,
            status: "running",
            error: action.error
            
        };
    }
    if (projectDeleteAtServerCompletedAction.is(action)) {
        return {
            ...state,
            status: action.status,
            
        };
    }

    if (searchFeaturesServerCompeteddAction.is(action)) {
        return {
            ...state,
            status: action.status,
            searchFeatures: action.searchFeatures
        };
    }

    if (searchAllTreeFeaturesServerComplitedAction.is(action)) {
        return {
            ...state,
            status: action.status,
            searchAllTreeFeatures: action.searchAllTreeFeatures
        };
    }
    if (projectEditAtServerCompliteAction.is(action)) {
        return {
            ...state,
            status: action.status,
            Allproject: action.Allproject
        };
    }
    if (updateProjectAtServerCompliteAction.is(action)) {
        return {
            ...state,
            status: action.status,
            
        };
    }



    return state;
};