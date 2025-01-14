import {PresentationType, SlideType} from "./PresentationType.ts";
import {EditorType} from "./EditorType.ts";

const slide1: SlideType = {
    id: 'slide-1',
    objects: [
        {
            id: 'slide-object-1',
            x: 10,
            y: 10,
            width: 350,
            height: 300,
            type: "text",
            value: 'Первый слайд!',
            fontFamily: 'Arial',
            fontSize: 100,
            fontColor: '#000000',
            text:'',
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
            value: 'Второй слайд',
            fontFamily: 'Arial',
            fontSize: 22,
            fontColor: '#000000',
            text:'',
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

const defaultEditor: EditorType = {
    presentation,
    selection: {
        selectedSlideId: presentation.slides[0].id,
        selectedObjectId: '',
        elementId: ""
    }
}

export { defaultEditor, presentation};
