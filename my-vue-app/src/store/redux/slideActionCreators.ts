//import { EditorType } from "../EditorType"
import { Dispatch } from "redux"
import { EditorType } from "../EditorType"
import { ActionType } from "./actions"
import {importEditorAction} from "./actions"

function addSlide() {
    return {
        type: ActionType.ADD_SLIDE,
    }
}

function removeSlide() {
    return {
        type: ActionType.REMOVE_SLIDE,
    }
}

function addTextToSlide() {
    return {
        type: ActionType.ADD_TEXT
    }
}

function addImageToSlide() {
    return {
        type: ActionType.ADD_IMAGE
    }
}

function changeColorBack() {
    return {
        type: ActionType.CHANGE_COLOR_BACK
    }
}

function changeImgBack() {
    return {
        type: ActionType.CHANGE_IMG_BACK
    }
}

function removeObjectOnSlide() {
    return {
        type: ActionType.REMOVE_OBJECT
    }
}

function renamePresentationTitle(newTitle: string) {
    return {
        type: ActionType.RENAME_PRESENTATION,
        payload: newTitle
    }
}

function moveObjectOnSlide(slideId: string, objectId: string,
    newX: number, newY: number) {
    return {
        type: ActionType.MOVE_OBJECT,
        payload: {
            slideId,
            objectId,
            x: newX,
            y: newY,
        }
    }
}

function resizeSlideObject(slideId: string, objectId: string,
    newX: number, newY: number,
    newWidth: number, newHeight: number) {
    return {
        type: ActionType.RESIZE_OBJECT,
        payload: {
            slideId, objectId,
            x: newX, y: newY,
            width: newWidth, height: newHeight
        }
    }
}

function moveSlide(draggedSlideId: string, targetSlideId: string) {
    return {
        type: ActionType.MOVE_SLIDE,
        payload: {
            draggedSlideId: draggedSlideId, targetSlideId: targetSlideId
        }
    }
}

function saveSlides(editor: EditorType) {
    return {
        type: ActionType.SAVE_SLIDES,
        payload: editor
    }
}

function loadSlides(editor: EditorType) {
    return {
        type: ActionType.LOAD_SLIDES,
        payload: editor
    }
}

function exportPresentation(editor:EditorType) {
    return {
        type: ActionType.EXPORT_PRESENTATION,
        payload: editor
    }
}

// function importPresentation(editor:EditorType) {
//     return {
//         type: ActionType.IMPORT_PRESENTATION,
//         payload: editor
//     }
// }

const importPresentationAction = (editor: EditorType): importEditorAction => ({
    type: ActionType.IMPORT_PRESENTATION,
    payload: editor,
});


export {
    addSlide,
    removeSlide,
    addTextToSlide,
    addImageToSlide,
    changeColorBack,
    changeImgBack,
    removeObjectOnSlide,
    renamePresentationTitle,
    moveObjectOnSlide,
    resizeSlideObject,
    moveSlide,
    saveSlides,
    loadSlides,
    exportPresentation,
    importPresentationAction,
}