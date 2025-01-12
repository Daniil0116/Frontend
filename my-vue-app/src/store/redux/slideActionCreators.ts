import { ActionType } from "./actions"

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

function renamePresentationTitle() {
    return {
        type: ActionType.RENAME_PRESENTATION
    }
}

export {
    addSlide,
    removeSlide,
    addTextToSlide,
    addImageToSlide,
    changeColorBack,
    changeImgBack,
    removeObjectOnSlide,
    renamePresentationTitle,
}