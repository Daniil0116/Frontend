import { EditorType } from "./EditorType";
import { SlideObject } from "./PresentationType";

function resizeSlideObject(
    currentEditor: EditorType, slideId: string, objectId: string,
    newX: number, newY: number,
    newWidth: number, newHeight: number
): EditorType {
    const slide = currentEditor.presentation.slides.find(s => s.id === slideId);
    if (!slide) return currentEditor;
    const element = slide.objects.find(el => el.id === objectId);
    if (!element) return currentEditor;

    const updatedObj: SlideObject = {
        ...element,
         x: newX, y: newY ,
         width: newWidth, height: newHeight 
    }

    const updatedObjs = slide.objects.map(el => el.id === objectId ? updatedObj : el);
    const updatedSlide = { ...slide, objects: updatedObjs };

    return {
        ...currentEditor,
        presentation: {
            ...currentEditor.presentation,
            slides: currentEditor.presentation.slides.map(s => s.id === slideId ? updatedSlide : s)
        }
    };
}

export  {resizeSlideObject};