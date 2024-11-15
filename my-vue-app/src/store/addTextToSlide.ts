import { EditorType } from "./EditorType";
import { TextObjectType } from "./PresentationType";

function addTextToSlide(editor: EditorType): EditorType {
    function randomString(length: number, chars: string | any[]) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }
    var randId = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

    const textObject: TextObjectType = {
        id: randId,
        x: 170,
        y: 20,
        width: 150,
        height: 140,
        type: 'text',
        text: "Привет, мир!",
        fontFamily: "Arial",
        fontSize: 24,
        fontColor: "black",
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
        },
    };
}

export { addTextToSlide };
