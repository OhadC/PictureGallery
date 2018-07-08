import { Dispatch } from "redux"

import { addPicture, setDb, setPictures } from "./actions"

export const getDb = () => (dispatch: any, getState: Function) => {
    const DBOpenRequest = indexedDB.open("pictureGallery", 1)

    DBOpenRequest.onsuccess = (e: any) => {
        console.log("DB opened successfully")
        const db = e.target.result;
        dispatch(setDb(db))
        dispatch(getAllPictures())
    }

    DBOpenRequest.onerror = function (err) {
        console.error(err);
    }
    DBOpenRequest.onupgradeneeded = (e: any) => {
        console.log("upgradeneeded", e)
        const db = e.target.result
        db.createObjectStore("pictures", { keyPath: "id", autoIncrement: true });
    }
}

export function getAllPictures() {
    return (dispatch: Dispatch, getState: Function) => {
        const { db } = getState()
        if (!db) return // TODO: error message
        var transaction = db.transaction(["pictures"], "readwrite");

        transaction.onerror = () => console.log('Transaction not opened due to error: ' + transaction.error)

        let objectStore = transaction.objectStore("pictures")
        let objectStoreRequest = objectStore.getAll();
        objectStoreRequest.onsuccess = () => {
            const pictures = objectStoreRequest.result
            dispatch(setPictures(pictures))
        };
    }
}

export const addPictureThunk = (picture: File) => (dispatch: Dispatch, getState: Function) => {
    const { db } = getState()
    if (!db) return // TODO: error message

    const fileReader = new FileReader();
    fileReader.readAsDataURL(picture);
    fileReader.onloadend = (e: any) => {
        const dataUrl = e.target.result;

        const pictureObj = {
            data: dataUrl
        };

        const tran = db.transaction(["pictures"], "readwrite");

        tran.oncomplete = () => console.log("tran oncomplete")
        tran.onabort = () => console.log("tran onabort")
        tran.onerror = () => console.log("tran onerror")

        const pictures = tran.objectStore("pictures");
        const request = pictures.add(pictureObj);

        request.onsuccess = (e: any) => {
            console.log("add success", e);

            pictureObj['id'] = e.target.result;
            dispatch(addPicture(pictureObj as any))
        }
        request.onerror = (e: any) => console.log("add error", e)
    }
}
