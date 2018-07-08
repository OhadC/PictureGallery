import { IPicture } from "../models/picture"

export const actionTypes = {
    SET_DB: 'SET_DB',
    SET_PICTURES: 'SET_PICTURES',
    ADD_PICTURE: 'ADD_PICTURE'
}

export const setDb = (db: any) => ({
    type: actionTypes.SET_DB,
    payload: { db }
})

export const setPictures = (pictures: IPicture) => ({
    type: actionTypes.SET_PICTURES,
    payload: { pictures }
})

export const addPicture = (picture: IPicture) => ({
    type: actionTypes.ADD_PICTURE,
    payload: { picture }
})
