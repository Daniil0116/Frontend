import {PresentationType} from "./PresentationType.ts";

type SelectionType = {
    [x: string]: unknown; 
    selectedSlideId: string;
    selectedObjectId: string | null;
}

type EditorType = {
    presentation: PresentationType,
    selection: SelectionType,
}

export type {
    EditorType,
    SelectionType,
}
