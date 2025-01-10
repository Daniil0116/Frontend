import { TextObjectType } from ".././store/PresentationType";

export function changeFontSize(textObject: TextObjectType, newFontSize: number): TextObjectType {
    return {
        ...textObject,
        fontSize: newFontSize,
    };
}
