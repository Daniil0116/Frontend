import { useState, useRef } from "react";
import { dispatch } from ".././store/editor";
import { EditorType } from ".././store/EditorType";
import { moveObjectOnSlide } from ".././store/moveObjectOnSlide";

type useDragAndDropProps = {
    slideId: string;
}

function useDragAndDrop({slideId}: useDragAndDropProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [draggedElemId, setDraggedObjId] = useState<string | null>(null);
    const dragStartPos = useRef({x: 0, y: 0});
    const objectStartPos = useRef({x: 0, y: 0});

    function handleobjectMD(event: React.MouseEvent, objectId: string): void {
        event.preventDefault();
        setIsDragging(true);
        setDraggedObjId(objectId);
        dragStartPos.current = {x: event.clientX, y: event.clientY};

        dispatch((currentEditor: EditorType) => {
            const slide = currentEditor.presentation.slides.find(s => s.id === slideId);
            const object = slide?.objects.find(e => e.id === objectId);
            if (object) {
              objectStartPos.current = {x: object.x, y: object.y};
            }
            return currentEditor;
        });
    }

    function handleobjectMM(event: React.MouseEvent): void {
        if (!isDragging || !draggedElemId) {
            return;
        }

        const dx = event.clientX - dragStartPos.current.x;
        const dy = event.clientY - dragStartPos.current.y;

        dispatch((currentEditor: EditorType) => {
            const slide = currentEditor.presentation.slides.find(s => s.id === slideId);
            if (!slide) return currentEditor;
            const object = slide.objects.find(e => e.id === draggedElemId);
            if (!object) return currentEditor;

            const newX = Math.max(0, Math.min(objectStartPos.current.x + dx, 935 - object.width));
            const newY = Math.max(0, Math.min(objectStartPos.current.y + dy, 525 - object.height));

            return moveObjectOnSlide(currentEditor, slideId, draggedElemId, newX, newY);
        });
    }

    function handleobjectMU(): void {
        setIsDragging(false);
        setDraggedObjId(null);
    }

    return {
        isDragging, 
        handleobjectMD, handleobjectMM, handleobjectMU,
    }
}

export {useDragAndDrop};