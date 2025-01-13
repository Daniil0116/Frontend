import { SelectionType } from "../EditorType";
import { SlideType } from "../PresentationType";

export const SET_TITLE = 'SET_TITLE';
export const ADD_SLIDE = 'ADD_SLIDE';
export const REMOVE_SLIDE = 'REMOVE_SLIDE';
export const SET_SELECTION = 'SET_SELECTION';

// Определите типы действий
interface SetTitleAction {
    type: typeof SET_TITLE;
    payload: string;
}

interface AddSlideAction {
    type: typeof ADD_SLIDE;
    payload: SlideType; 
}

interface RemoveSlideAction {
    type: typeof REMOVE_SLIDE;
    payload: { id: string };
}

interface SetSelectionAction {
    type: typeof SET_SELECTION;
    payload: SelectionType;
}

export type PresentationActionTypes =
    | SetTitleAction
    | AddSlideAction
    | RemoveSlideAction
    | SetSelectionAction;
