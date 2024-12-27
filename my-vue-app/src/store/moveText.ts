import { SlideType } from "./PresentationType";

function moveText(
    slide: SlideType, elementId: string,
    newX: number, newY: number
): SlideType {
    return {
        ...slide,
        elements: slide.objects.map((txt) => {
            if (txt.id === elementId) {
                return { ...txt, x: newX, y: newY }
            }
            return txt;
        })
    }
}

export {moveText};
