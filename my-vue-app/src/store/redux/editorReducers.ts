import { EditorType } from "../EditorType";
import { addSlide } from "../addSlide";
import { setSelection } from "../setSelection";
import { ActionType, EditorAction } from "./actions";
import { defaultEditor } from "../data";
import { removeSlide } from "../removeSlide";
import { addTextToSlide } from "../addTextToSlide";
import { changeColorBack } from "../changeColorBack";
import { changeImgBack } from "../changeImgBack";
import { removeObjectOnSlide } from "../removeObjectOnSlide";
import { renamePresentationTitle } from "../renamePresentationTitle";
import { addImageToSlide } from "../addImageToSlide";
import { moveObjectOnSlide } from "../moveObjectOnSlide";
import { resizeSlideObject } from "../resizeSlideObject";
import { moveSlide } from "../moveSlide";
import { loadSlides, saveSlides } from "../localStorage";
import { exportPresentation } from "../fileUtils";

function editorReducer(editor: EditorType = defaultEditor, action: EditorAction): EditorType {
    switch (action.type) {
        case ActionType.ADD_SLIDE:
            return addSlide(editor)
        case ActionType.REMOVE_SLIDE:
            return removeSlide(editor)
        case ActionType.SET_SELECTION:
            return setSelection(editor, action);
        case ActionType.SET_EDITOR:
            return action.payload
        case ActionType.ADD_TEXT:
            return addTextToSlide(editor)
        case ActionType.ADD_IMAGE:
            return addImageToSlide(editor)
        case ActionType.CHANGE_COLOR_BACK:
            return changeColorBack(editor)
        case ActionType.CHANGE_IMG_BACK:
            return changeImgBack(editor)
        case ActionType.REMOVE_OBJECT:
            return removeObjectOnSlide(editor)
        case ActionType.RENAME_PRESENTATION:
            return renamePresentationTitle(editor, action.payload)
        case ActionType.MOVE_OBJECT:
            return moveObjectOnSlide(editor, action.payload.slideId, action.payload.objectId, action.payload.x, action.payload.y,)
        case ActionType.RESIZE_OBJECT:
            return resizeSlideObject(editor, action.payload.slideId, action.payload.objectId, action.payload.x, action.payload.y, 
                action.payload.width, action.payload.height)
        case ActionType.MOVE_SLIDE:
            return moveSlide(editor, action.payload.draggedSlideId, action.payload.targetSlideId)
        case ActionType.SAVE_SLIDES:
            saveSlides(action.payload)
            return action.payload
        case ActionType.LOAD_SLIDES:
            return loadSlides() ?? editor
        case ActionType.EXPORT_PRESENTATION:
            return exportPresentation(editor) ?? editor
        case ActionType.IMPORT_PRESENTATION:
            return {
                ...editor,
                ...action.payload,
            };
        case ActionType.UNDO_EDITOR:
            return editor
        case ActionType.REDO_EDITOR:
            return editor
        case ActionType.UPDATE_TEXT: 
            return {
                ...editor,
                presentation: {
                    ...editor.presentation,
                    slides: editor.presentation.slides.map(slide => ({
                        ...slide,
                        objects: slide.objects.map(obj => 
                            obj.id === action.payload.id 
                            ? { ...obj, value: action.payload.value } 
                            : obj
                        ),
                    })),
                },
            };
        default:
            return editor
    }
}

export {
    editorReducer,
}
