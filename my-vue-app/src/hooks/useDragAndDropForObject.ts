import { useState, useEffect } from 'react';

function useDraggable(onDragEnd: (newPosition: { x: number; y: number }) => void) {
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [initialMousePosition, setInitialMousePosition] = useState<{ x: number; y: number } | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (isDragging && initialMousePosition) {
                const deltaX = event.clientX - initialMousePosition.x;
                const deltaY = event.clientY - initialMousePosition.y;
                setPosition(prev => ({
                    x: prev.x + deltaX,
                    y: prev.y + deltaY,
                }));
                setInitialMousePosition({ x: event.clientX, y: event.clientY });
            }
        };

        const handleMouseUp = () => {
            if (isDragging) {
                onDragEnd(position);
                setIsDragging(false);
                setInitialMousePosition(null);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, initialMousePosition, position, onDragEnd]);

    const onMouseDown = (event: React.MouseEvent) => {
        event.preventDefault();
        setInitialMousePosition({ x: event.clientX, y: event.clientY });
        setIsDragging(true);
    };

    return { position, onMouseDown };
}

export {useDraggable} ;