import { EditorType, SelectionType } from "../EditorType"
//import { TextObjectType } from "../PresentationType"

enum ActionType {
    ADD_SLIDE = 'addSlide',
    REMOVE_SLIDE = 'removeSlide',

    SET_SELECTION = 'setSelection',

    SET_EDITOR = 'setEditor',

    IMPORT_EDITOR = 'IMPORT_EDITOR',
    EXPORT_EDITOR = 'EXPORT_EDITOR',
    ADD_TEXT = 'addText',
    ADD_IMAGE = 'addImageToSlide',
    CHANGE_COLOR_BACK = 'changeColorBack',
    CHANGE_IMG_BACK = 'changeImgBack',
    REMOVE_OBJECT = 'removeObjectOnSlide',
    RENAME_PRESENTATION = 'renamePresentationTitle',
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

type addTextToSlide = {
    type: ActionType.ADD_TEXT,
};

type addImageToSlide = {
    type: ActionType.ADD_IMAGE,
}

type changeColorBack = {
    type: ActionType.CHANGE_COLOR_BACK,
}

type changeImgBack = {
    type: ActionType.CHANGE_IMG_BACK,
}

type removeObjectOnSlide = {
    type: ActionType.REMOVE_OBJECT,
}

type renamePresentationTitle = {
    type: ActionType.RENAME_PRESENTATION,
    payload: string,
}
// type importEditorAction = {
//     type: ActionType.IMPORT_EDITOR,
//     payload: File,
// }

type EditorAction = AddSlideAction | RemoveSlideAction | SetSelectionAction | SetEditorAction 
| addTextToSlide | addImageToSlide | changeColorBack | changeImgBack | removeObjectOnSlide | renamePresentationTitle

export {
    ActionType,
    type SetSelectionAction,
    type EditorAction,
    //type addTextToSlide
}