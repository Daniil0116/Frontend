import { EditorType } from "../EditorType";
import { addSlide } from "../addSlide";
import { setSelection } from "../setSelection";
import { ActionType, EditorAction } from "./actions";
import { defaultEditor } from "../data";
import { removeSlide } from "../removeSlide";
//import { UnknownAction } from "redux";
import { addTextToSlide } from "../addTextToSlide";
//import { TextObjectType } from "../PresentationType";
import { changeColorBack } from "../changeColorBack";
import { changeImgBack } from "../changeImgBack";
import { removeObjectOnSlide } from "../removeObjectOnSlide";
import { renamePresentationTitle } from "../renamePresentationTitle";
import { addImageToSlide } from "../addImageToSlide";

function editorReducer(editor: EditorType = defaultEditor, action: EditorAction): EditorType {
    switch (action.type) {
        case ActionType.ADD_SLIDE: 
            return addSlide(editor)
        case ActionType.REMOVE_SLIDE:
            return removeSlide(editor)
        case ActionType.SET_SELECTION: 
            return setSelection(editor, action)
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
        // case ActionType.IMPORT_EDITOR:
        //     return action.payload
        default:
            return editor
    }
}

// export const editorSlideElementsReducer = (state: EditorType, action: UnknownAction): EditorType => {
//     switch (action.type) {
//         case 'ADD_TEXT' : {
//             return addTextToSlide(state)
//         }
//         default:
//           return state;
//       }
//     };

export {
    editorReducer,
}
