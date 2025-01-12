import {PresentationType} from "./PresentationType.ts";

type SelectionType = {
    elementId: string;
    selectedSlideId: string | null;
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
