import { EditorType } from "./EditorType";

function moveObjectOnSlide(
    editor: EditorType, slideId: string, objectId: string,
    newX: number, newY: number
): EditorType {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(slide =>
                slide.id === slideId ? {
                    ...slide,
                    objects: slide.objects.map(object =>
                      object.id === objectId ? {
                            ...object, x: newX, y: newY 
                        } : object
                    )
                } : slide
            )
        },
    };
}

export {moveObjectOnSlide};
