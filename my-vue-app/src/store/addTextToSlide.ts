import { EditorType } from "./EditorType";
import { TextObjectType } from "./PresentationType";
import { randomString } from "./randomID";

function addTextToSlide(editor: EditorType): EditorType {
    const randId = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

    const textObject: TextObjectType = {
        id: randId,
        x: 170,
        y: 20,
        width: 150,
        height: 140,
        type: 'text',
        value: "",
        fontFamily: "NotoSans",
        fontSize: 24,
        fontColor: "black",
        text:''
    };


    const newTextObject: TextObjectType = { 
        ...textObject,
    };

    const updatedSlides = editor.presentation.slides.map(slide => {
        if (slide.id === editor.selection.selectedSlideId) {
            return {
                ...slide,
                objects: [...slide.objects, newTextObject],
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
            selectedObjectId: newTextObject.id,
            elementId: ""
        },
    };
}

export { addTextToSlide };
