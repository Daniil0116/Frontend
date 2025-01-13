import { useState, useRef } from "react";
import { useAppActions } from "./useAppActions";
import { useAppSelector } from "./useAppSelector";

type UseResizeObjectProps = {
    slideId: string;
}

function useResizeObject({ slideId }: UseResizeObjectProps) {
    const [isResizing, setIsResizing] = useState(false);
    const [resizedObjectId, setResizedObjectId] = useState<string | null>(null);
    const startSize = useRef({ width: 0, height: 0 });
    const startMousePos = useRef({ x: 0, y: 0 });
    const initPos = useRef({ x: 0, y: 0 });
    const resizeDirect = useRef<string | null>(null);
    const editor = useAppSelector(state => state);
    const { resizeSlideObject } = useAppActions();


    function handleResizeMD(event: React.MouseEvent, objectId: string, direction: string): void {
        event.preventDefault();
        setIsResizing(true);
        setResizedObjectId(objectId);
        resizeDirect.current = direction;
        startMousePos.current = { x: event.clientX, y: event.clientY };

        const slide = editor.presentation.slides.find(s => s.id === slideId);
        const object = slide?.objects.find(el => el.id === objectId);
        if (object) {
            startSize.current = { width: object.width, height: object.height };
            initPos.current = { x: object.x, y: object.y };
        }
    }

    function handleResizeMM(event: React.MouseEvent): void {
        if (!isResizing || !resizedObjectId) {
            return;
        }

        const dx = event.clientX - startMousePos.current.x;
        const dy = event.clientY - startMousePos.current.y;
        let newX = initPos.current.x;
        let newY = initPos.current.y;
        let newWidth = startSize.current.width;
        let newHeight = startSize.current.height;

        switch (resizeDirect.current) {
            case 'top-left':
                newX = initPos.current.x + dx;
                newY = initPos.current.y + dy;
                newWidth = Math.max(10, startSize.current.width - dx);
                newHeight = Math.max(10, startSize.current.height - dy);
                break;
            case 'top-right':
                newY = initPos.current.y + dy;
                newWidth = Math.max(10, startSize.current.width + dx);
                newHeight = Math.max(10, startSize.current.height - dy);
                break;
            case 'bottom-left':
                newX = initPos.current.x + dx;
                newWidth = Math.max(10, startSize.current.width - dx);
                newHeight = Math.max(10, startSize.current.height + dy);
                break;
            case 'bottom-right':
                newWidth = Math.max(10, startSize.current.width + dx);
                newHeight = Math.max(10, startSize.current.height + dy);
                break;
            case 'middle-left':
                newX = initPos.current.x + dx;
                newWidth = Math.max(10, startSize.current.width - dx);
                break;
            case 'middle-right':
                newWidth = Math.max(10, startSize.current.width + dx);
                break;
            case 'middle-top':
                newY = initPos.current.y + dy;
                newHeight = Math.max(10, startSize.current.height - dy);
                break;
            case 'middle-bottom':
                newHeight = Math.max(10, startSize.current.height + dy);
                break;
        }

        resizeSlideObject(
            slideId, resizedObjectId,
            newX, newY, newWidth, newHeight
        );
    }

    function handleResizeMU(): void {
        setIsResizing(false);
        setResizedObjectId(null);
        resizeDirect.current = null;
    }

    return {
        isResizing,
        handleResizeMD, handleResizeMM, handleResizeMU
    };
}

export { useResizeObject };