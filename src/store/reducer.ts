import { AnyAction } from "redux"

import { actionTypes } from "./actions"
import { IPicture } from "../models/picture"

export interface IAppState {
    db: any
    pictures: IPicture[]
}

const initialState: IAppState = {
    db: null,
    pictures: []
}

const setDb = (state: IAppState, action: AnyAction) => {
    return {
        ...state,
        db: action.payload.db
    }
}

const setPicture = (state: IAppState, action: AnyAction) => {
    return {
        ...state,
        pictures: action.payload.pictures
    }
}

const addPicture = (state: IAppState, action: AnyAction) => {
    const pictures = state.pictures.slice()
    pictures.push(action.payload.picture)
    return {
        ...state,
        pictures
    }
}

export const reducer = (state: IAppState = initialState, action: AnyAction) => {
    switch (action.type) {
        case (actionTypes.SET_DB):
            return setDb(state, action)
        case (actionTypes.SET_PICTURES):
            return setPicture(state, action)
        case (actionTypes.ADD_PICTURE):
            return addPicture(state, action)
        default:
            return state
    }
}
