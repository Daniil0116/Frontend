import { ImageObjectType, SlideType, TextObjectType } from "../../store/PresentationType.ts";
import { TextObject } from "./TextObject.tsx";
import { ImageObject } from "./ImageObject.tsx";
import styles from './Slide.module.css';
import { CSSProperties } from "react";
import { dispatch } from "../../store/editor.ts";
import { setSelection } from "../../store/setSelection.ts";
import { useDraggable } from '../../components/useDragAndDropForObject.ts'; 

const SLIDE_WIDTH = 935;
const SLIDE_HEIGHT = 525;

type SlideProps = {
    slide: SlideType | null,
    scale?: number,
    isSelected: boolean,
    className: string,
    selectedObjId: string | null,
    onUpdateObjectSize: (id: string, width: number, height: number) => void; // Добавляем пропс для обновления размера
}

function CurrentSlide({ slide, scale = 1, isSelected, className, selectedObjId, onUpdateObjectSize }: SlideProps) {
    function onObjClick(objectId: string): void {
        dispatch(setSelection, {
            selectedSlideId: slide?.id,
            selectedObjectId: objectId,
        });
    }

    if (slide == null) {
        return (<></>);
    }

    const slideStyles: CSSProperties = {
        backgroundColor: slide.background.type === 'color' ? slide.background.color : 'transparent',
        backgroundImage: slide.background.type === 'image' ? `url(${slide.background.src})` : 'none',
        backgroundSize: 'cover',
        position: 'relative',
        width: `${SLIDE_WIDTH * scale}px`,
        height: `${SLIDE_HEIGHT * scale}px`,
    };

    if (isSelected) {
        slideStyles.border = '3px solid #0b57d0';
    }

    return (
        <div style={slideStyles} className={styles.slide + ' ' + className}>
            {slide.objects.map((slideObject: TextObjectType | ImageObjectType) => {
                const { position, onMouseDown } = useDraggable((newPosition) => {
                    console.log(`Объект ${slideObject.id} перемещен на:`, newPosition);
                    
                });

                const isSelectedObject = slideObject.id === selectedObjId;

               
                const handleResize = (e: React.MouseEvent) => {
                    e.preventDefault();
                    e.stopPropagation(); 

                    const initialWidth = slideObject.width;
                    const initialHeight = slideObject.height;
                    const initialX = e.clientX;
                    const initialY = e.clientY;

                    const resizeMouseMove = (moveEvent: MouseEvent) => {
                        const newWidth = Math.max(20, initialWidth + (moveEvent.clientX - initialX));
                        const newHeight = Math.max(20, initialHeight + (moveEvent.clientY - initialY));
                        onUpdateObjectSize(slideObject.id, newWidth, newHeight);
                    };

                    const resizeMouseUp = () => {
                        window.removeEventListener('mousemove', resizeMouseMove);
                        window.removeEventListener('mouseup', resizeMouseUp);
                    };

                    window.addEventListener('mousemove', resizeMouseMove);
                    window.addEventListener('mouseup', resizeMouseUp);
                };

                return (
                    <div
                        key={slideObject.id}
                        onClick={() => onObjClick(slideObject.id)}
                        onMouseDown={isSelectedObject ? onMouseDown : undefined} 
                        style={{
                            position: 'absolute',
                            left: `${slideObject.x + position.x}px`, 
                            top: `${slideObject.y + position.y}px`, 
                            cursor: isSelectedObject ? 'move' : 'default',
                        }}
                    >
                        {slideObject.type === "text" ? (
                            <TextObject
                                textObject={slideObject}
                                scale={scale}
                                isSelected={isSelectedObject}
                            />
                        ) : (
                            <ImageObject
                                imageObject={slideObject}
                                scale={scale}
                                isSelected={isSelectedObject}
                            />
                        )}
                        <div
                            onMouseDown={handleResize}
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                width: '10px',
                                height: '10px',
                                backgroundColor: 'red',
                                cursor: 'se-resize',
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export {
    CurrentSlide
}
