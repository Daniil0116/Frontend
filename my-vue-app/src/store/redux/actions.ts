import { EditorType, SelectionType } from "../EditorType"
//import { TextObjectType } from "../PresentationType"

enum ActionType {
    ADD_SLIDE = 'addSlide',
    REMOVE_SLIDE = 'removeSlide',

    SET_SELECTION = 'setSelection',

    SET_EDITOR = 'setEditor',

    IMPORT_PRESENTATION = 'importPresentation',
    EXPORT_PRESENTATION = 'exportPresentation',
    ADD_TEXT = 'addText',
    ADD_IMAGE = 'addImageToSlide',
    CHANGE_COLOR_BACK = 'changeColorBack',
    CHANGE_IMG_BACK = 'changeImgBack',
    REMOVE_OBJECT = 'removeObjectOnSlide',
    RENAME_PRESENTATION = 'renamePresentationTitle',
    MOVE_OBJECT = 'moveObjectOnSlide',
    RESIZE_OBJECT = 'resizeSlideObject',
    MOVE_SLIDE = 'moveSlide',
    SAVE_SLIDES = 'saveSlides',
    LOAD_SLIDES = 'loadSlides',
    UNDO_EDITOR = 'undoEditor',
    REDO_EDITOR = 'redoEditor',
    UPDATE_TEXT = 'updateText',
}

type AddSlideAction = {
    type: ActionType.ADD_SLIDE,
}

type RemoveSlideAction = {
    type: ActionType.REMOVE_SLIDE,
}

type SetSelectionAction = {
    type: ActionType.SET_SELECTION,
    payload: SelectionType,
}

type SetEditorAction = {
    type: ActionType.SET_EDITOR,
    payload: EditorType,
}

type addTextToSlideAction = {
    type: ActionType.ADD_TEXT,
};

type addImageToSlideAction = {
    type: ActionType.ADD_IMAGE,
}

type changeColorBackAction = {
    type: ActionType.CHANGE_COLOR_BACK,
}

type changeImgBackAction = {
    type: ActionType.CHANGE_IMG_BACK,
}

type removeObjectOnSlideAction = {
    type: ActionType.REMOVE_OBJECT,
}

type renamePresentationTitleAction = {
    type: ActionType.RENAME_PRESENTATION,
    payload: string,
}

type moveObjectOnSlideAction = {
    type: ActionType.MOVE_OBJECT,
    payload: {
        slideId: string, objectId: string,
        x: number, y: number
    }
}

type resizeSlideObjectAction = {
    type: ActionType.RESIZE_OBJECT,
    payload: {
        slideId: string, objectId: string,
        x: number, y: number,
        width: number, height: number
    }
}

type moveSlideAction = {
    type: ActionType.MOVE_SLIDE,
    payload: {
        draggedSlideId: string, targetSlideId: string
    }
}

type saveSlidesAction = {
    type: ActionType.SAVE_SLIDES,
    payload: EditorType
}

type loadSlidesAction = {
    type: ActionType.LOAD_SLIDES,
    payload: EditorType
}

type importEditorAction = {
    type: ActionType.IMPORT_PRESENTATION,
    payload: EditorType
}

type exportPresentationAction = {
    type: ActionType.EXPORT_PRESENTATION
}

type undoEditorAction = {
    type: ActionType.UNDO_EDITOR
};

type redoEditorAction = {
    type: ActionType.REDO_EDITOR
};

type updateTextAction = {
    type: ActionType.UPDATE_TEXT,
    payload: {
        id: string,
        value: string,
    }
}

type EditorAction = AddSlideAction | RemoveSlideAction | SetSelectionAction | SetEditorAction
    | addTextToSlideAction | addImageToSlideAction | changeColorBackAction | changeImgBackAction
    | removeObjectOnSlideAction | renamePresentationTitleAction | moveObjectOnSlideAction
    | resizeSlideObjectAction | moveSlideAction | saveSlidesAction | loadSlidesAction
    | importEditorAction | exportPresentationAction | undoEditorAction | redoEditorAction
    | updateTextAction

export {
    ActionType,
    type SetSelectionAction,
    type EditorAction,
    type importEditorAction,
    type undoEditorAction
}