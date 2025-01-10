import { TextObjectType } from ".././store/PresentationType";

export function changeFont(textObject: TextObjectType, newFontFamily: string): TextObjectType {
    return {
        ...textObject,
        fontFamily: newFontFamily,
    };
}
