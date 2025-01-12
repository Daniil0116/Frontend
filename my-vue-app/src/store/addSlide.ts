import { EditorType } from "./EditorType";
import { SlideType } from "./PresentationType";
//import { randomString } from "./randomID";
import { createNewSlide } from "./redux/createNewSlide";

function addSlide(editor: EditorType): EditorType {
    //const randId = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    // const newSlide: SlideType = {
    //     id: randId,
    //     objects: [],
    //     background: {type:"color", color:"white"},
    // };
    const selection = editor.selection
    const newSlide = createNewSlide()

    //const selectedSlideIndex = editor.presentation.slides.findIndex(slide => slide.id == editor.selection.selectedSlideId);
    const slides: SlideType[] = []
    if (selection) {
        for (const slide of editor.presentation.slides) {
            slides.push(slide)
            if (slide.id === selection.selectedSlideId) {
                slides.push(newSlide)
            }
        }
    }
    else {
        slides.push(newSlide)
    }
    return {
        presentation: {
            ...editor.presentation,
            slides: slides,
        },
        selection: {
            selectedSlideId: newSlide.id,
            elementId: "",
            selectedObjectId: null
        }
    }
}


//     return {
//         presentation: {
//             ...editor.presentation,
//             slides: [
//                 ...editor.presentation.slides.slice(0, selectedSlideIndex + 1),
//                 newSlide,
//                 ...editor.presentation.slides.slice(selectedSlideIndex + 1)
//             ]
//         },
//         selection: editor.selection
//     };
// }

export { addSlide };
