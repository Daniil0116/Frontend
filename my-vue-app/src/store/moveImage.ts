import { SlideType } from "./PresentationType";

function moveImage(
    slide: SlideType, elementId: string,
    newX: number, newY: number
): SlideType {
    return {
        ...slide,
        elements: slide.objects.map((img) => {
            if (img.id === elementId) {
                return { ...img, x: newX, y: newY }
            } 
            return img;
        })
    }
}

export  {moveImage};
