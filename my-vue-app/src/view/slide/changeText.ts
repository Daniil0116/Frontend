import { SlideType } from "../../store/PresentationType";

export function changeTextContent(slide: SlideType, objectId: string, newText: string): SlideType
{
    return {
        ...slide,
        objects: slide.objects.map(item =>
            item.id === objectId && item.type === "text" ? { 
                ...item, 
                value: newText 
            } : item
        ),
    };
}