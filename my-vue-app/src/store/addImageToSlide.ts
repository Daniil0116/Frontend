import { EditorType } from "./EditorType";
import { ImageObjectType } from "./PresentationType";
import { randomString } from "./randomID";
let currentImageSlideSrc: string = ""; 
function addImageToSlide(editor: EditorType): EditorType {
    const randId = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

    const imageObject: ImageObjectType  = {
        id: randId,
        x: 450,
        y: 50,
        width: 150,
        height: 140,
        type: 'image',
        src: currentImageSlideSrc,
    };

    const updatedSlides = editor.presentation.slides.map(slide => {
        if (slide.id === editor.selection.selectedSlideId) {
            return {
                ...slide,
                objects: [...slide.objects, imageObject],
            };
        }
        return slide;
    });

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides,
        },
        selection: {
            selectedSlideId: editor.selection.selectedSlideId,
            selectedObjectId: imageObject.id,
            elementId: ""
        },

    };
}

function setCurrentImageSlideSrc(src: string) {
    currentImageSlideSrc = src;
}

export { addImageToSlide, setCurrentImageSlideSrc };
