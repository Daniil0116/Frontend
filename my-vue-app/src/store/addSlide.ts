import { EditorType } from "./EditorType";
import { SlideType } from "./PresentationType";

function addSlide(editor: EditorType): EditorType {
    function randomString(length: number, chars: string | any[]) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }
    var randId = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    const newSlide: SlideType = {
        id: randId,
        objects: [],
        background: {type:"color", color:"white"},
    };

    const selectedSlideIndex = editor.presentation.slides.findIndex(slide => slide.id == editor.selection.selectedSlideId);

    return {
        presentation: {
            ...editor.presentation,
            slides: [
                ...editor.presentation.slides.slice(0, selectedSlideIndex + 1),
                newSlide,
                ...editor.presentation.slides.slice(selectedSlideIndex + 1)
            ]
        },
        selection: editor.selection
    };
}

export { addSlide };
