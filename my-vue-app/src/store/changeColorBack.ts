import { EditorType } from "./EditorType";
import {ColorBackground} from "./PresentationType";

function changeColorBack(editor: EditorType): EditorType {
    const selectedSlideId = editor.selection.selectedSlideId;
    const slideIndex = editor.presentation.slides.findIndex(slide => slide.id === selectedSlideId);
    const colorPicker = document.getElementById('colorPicker') as HTMLInputElement;
    const selectedColor = colorPicker.value;
    const newBackgroundColor: ColorBackground = { type: 'color', color: selectedColor };
    const updatedSlides = editor.presentation.slides.map((slide, index) => {
        if (index === slideIndex) {
            return {
                ...slide,
                background: newBackgroundColor, 
            };
        }
        return slide;
    });

    return {
        presentation: {
            ...editor.presentation,
            slides: updatedSlides,
        },
        selection: {
            selectedSlideId: editor.selection.selectedSlideId,
            selectedObjectId: editor.selection.selectedObjectId,
            elementId: ""
        },
    };
}

export { changeColorBack };
