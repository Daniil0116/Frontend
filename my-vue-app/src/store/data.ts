import {PresentationType, SlideType} from "./PresentationType.ts";
import {EditorType} from "./EditorType.ts";

const slide1: SlideType = {
    id: 'slide-1',
    objects: [
        {
            id: 'slide-object-1',
            x: 10,
            y: 10,
            width: 100,
            height: 20,
            type: "text",
            text: 'Первый слайд!',
            fontFamily: 'Roboto',
            fontSize: 100,
            fontColor: '#000000',
        },
        {
            id: 'slide-object-2',
            x: 35,
            y: 70,
            width: 80,
            height: 80,
            type: "image",
        }
    ],
    background: {type: 'color', color: 'MediumBlue'},
}
const slide2: SlideType = {
    id: 'slide-2',
    objects: [
        {
            id: 'slide-object-3',
            x: 50,
            y: 10,
            width: 100,
            height: 40,
            type: "text",
            text: 'Второй слайд',
            fontFamily: 'Roboto',
            fontSize: 22,
            fontColor: '#000000',
        }
    ],
    background: {type: 'color', color: 'green'},
    
}


const presentation: PresentationType = {
    title: 'Название презентации',
    slides: [
        slide1,
        slide2,
    ]
}

const editor: EditorType = {
    presentation,
    selection: {
        selectedSlideId: presentation.slides[0].id,
        selectedObjectId: '',
    }
}

export { editor, presentation};