import { SlideType } from "../PresentationType";
import { randomString } from "../randomID";

function createNewSlide(): SlideType {
    return {
        id: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
        objects: [],
        background: {
            type: 'color',
            color: '#ffffff',
        }
    }
}

export {
    createNewSlide,
}