import { EditorType } from "../EditorType";
import { createNewSlide } from "./createNewSlide";

const slide = createNewSlide()
const defaultEditor: EditorType = {
    presentation: {
        title: 'Название презентации',
        slides: [
            slide,
        ],
    },
    selection: {
        selectedSlideId: slide.id,
        elementId: "",
        selectedObjectId: null
    }
}

export {
    defaultEditor,
}