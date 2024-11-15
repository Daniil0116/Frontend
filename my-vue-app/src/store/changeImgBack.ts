import { EditorType } from "./EditorType";
import { ImageBackground } from "./PresentationType";
let currentImageSrc: string = ""; 
function changeImgBack(editor: EditorType): EditorType {
    const selectedSlideId = editor.selection.selectedSlideId;
    const slideIndex = editor.presentation.slides.findIndex(slide => slide.id === selectedSlideId);
    const newBackgroundImage: ImageBackground = { type: 'image', src: currentImageSrc };

    const updatedSlides = editor.presentation.slides.map((slide, index) => {
        if (index === slideIndex) {
            return {
                ...slide,
                background: newBackgroundImage, 
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
    };
}

function setCurrentImageSrc(src: string) {
    currentImageSrc = src;
}

export { changeImgBack, setCurrentImageSrc };
