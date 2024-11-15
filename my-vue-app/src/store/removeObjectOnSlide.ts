import { EditorType } from "./EditorType";

function removeObjectOnSlide(editor: EditorType): EditorType {

    
    const selectedSlideId = editor.selection.selectedSlideId;
    const removeObjectId = editor.selection.selectedObjectId;

    let newSelectedObjectId = null;


    const slideIndex = editor.presentation.slides.findIndex(slide => slide.id === selectedSlideId);
    const updatedSlides = editor.presentation.slides.map((slide, index) => {
        if (index === slideIndex) {
            return {
                ...slide,
                objects: slide.objects.filter(object => object.id !== removeObjectId), 
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
            selectedSlideId: selectedSlideId,
            selectedObjectId: newSelectedObjectId, 
        },
    };
    
}

export { removeObjectOnSlide };
