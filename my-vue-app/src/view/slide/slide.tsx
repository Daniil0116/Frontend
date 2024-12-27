import { SlideType } from "../../store/PresentationType.ts";
import { TextObject } from "./TextObject.tsx";
import { ImageObject } from "./ImageObject.tsx";
import styles from './Slide.module.css';
import { CSSProperties } from "react";
import { dispatch } from "../../store/editor.ts";
import { setSelection } from "../../store/setSelection.ts";
import { useDragAndDrop } from "../../hooks/useDragAndDropForObject.ts";
import { useResizeObject } from "../../hooks/useResizeObjects";


const SLIDE_WIDTH = 935;
const SLIDE_HEIGHT = 525;

type SlideProps = {
    slide: SlideType | null,
    scale?: number,
    isSelected: boolean,
    className: string,
    selectedObjId: string | null
    showResizeHandles?: boolean;
}

function CurrentSlide({ slide, scale = 1, isSelected, className, selectedObjId, showResizeHandles = true }: SlideProps) {
    const { handleobjectMD, handleobjectMM, handleobjectMU } = useDragAndDrop({ slideId: slide?.id ?? '' });
    const { isResizing, handleResizeMD, handleResizeMM, handleResizeMU } = useResizeObject({ slideId: slide?.id ?? '' });

    function onObjClick(objectId: string): void {
        dispatch(setSelection, {
            selectedSlideId: slide?.id,
            selectedObjectId: objectId,
        });
    }

    const handleSlideClick = () => {
        if (selectedObjId) {
            dispatch(setSelection, {
                selectedSlideId: slide?.id,
                selectedObjectId: null,
            });
        }
    };

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
    }

    if (isSelected) {
        slideStyles.border = '3px solid #0b57d0';
    }

    return (
        <div style={slideStyles} className={`${styles.slide} ${className}`}
            onMouseMove={(event) => {
                if (isResizing) {
                    handleResizeMM(event);
                } else {
                    handleobjectMM(event);
                }
            }}
            onMouseUp={() => {
                handleobjectMU();
                handleResizeMU();
            }}
            onMouseLeave={handleResizeMU}
            onClick={handleSlideClick}>
            {slide.objects.map(SlideObject => {
                const isSelectionObj = SlideObject.id === selectedObjId;
                return (<div key={SlideObject.id}
                    onClick={(e) => { e.stopPropagation(); onObjClick(SlideObject.id); }}
                    onMouseDown={(event) => handleobjectMD(event, SlideObject.id)}
                    style={{ position: 'relative' }}>
                    {SlideObject.type === "text" ? (
                        <TextObject textObject={SlideObject} scale={scale} isSelected={SlideObject.id === selectedObjId} />
                    ) : (
                        <ImageObject imageObject={SlideObject} scale={scale} isSelected={SlideObject.id === selectedObjId} />
                    )}
                    {isSelectionObj && showResizeHandles && (
                        <>
                            <div className={`${styles.resizeHandle} ${styles.topLeft}`}
                                onMouseDown={(event) => handleResizeMD(event, SlideObject.id, 'top-left')}
                                style={{ position: 'absolute', top: SlideObject.y - 5, left: SlideObject.x - 5 }} />

                            <div className={`${styles.resizeHandle} ${styles.topRight}`}
                                onMouseDown={(event) => handleResizeMD(event, SlideObject.id, 'top-right')}
                                style={{ position: 'absolute', top: SlideObject.y - 5, left: SlideObject.x + SlideObject.width - 3 }} />

                            <div className={`${styles.resizeHandle} ${styles.bottomLeft}`}
                                onMouseDown={(event) => handleResizeMD(event, SlideObject.id, 'bottom-left')}
                                style={{ position: 'absolute', top: SlideObject.y + SlideObject.height - 3, left: SlideObject.x - 6 }} />

                            <div className={`${styles.resizeHandle} ${styles.bottomRight}`}
                                onMouseDown={(event) => handleResizeMD(event, SlideObject.id, 'bottom-right')}
                                style={{ position: 'absolute', top: SlideObject.y + SlideObject.height - 3, left: SlideObject.x + SlideObject.width - 3 }} />

                            <div className={`${styles.resizeHandle} ${styles.middleLeft}`}
                                onMouseDown={(event) => handleResizeMD(event, SlideObject.id, 'middle-left')}
                                style={{ position: 'absolute', top: SlideObject.y + SlideObject.height / 2, left: SlideObject.x - 6 }} />

                            <div className={`${styles.resizeHandle} ${styles.middleRight}`}
                                onMouseDown={(event) => handleResizeMD(event, SlideObject.id, 'middle-right')}
                                style={{ position: 'absolute', top: SlideObject.y + SlideObject.height / 2, left: SlideObject.x + SlideObject.width - 3 }} />

                            <div className={`${styles.resizeHandle} ${styles.middleTop}`}
                                onMouseDown={(event) => handleResizeMD(event, SlideObject.id, 'middle-top')}
                                style={{ position: 'absolute', top: SlideObject.y - 5, left: SlideObject.x + SlideObject.width / 2 }} />

                            <div className={`${styles.resizeHandle} ${styles.middleBottom}`}
                                onMouseDown={(event) => handleResizeMD(event, SlideObject.id, 'middle-bottom')}
                                style={{ position: 'absolute', top: SlideObject.y + SlideObject.height - 3, left: SlideObject.x + SlideObject.width / 2 }} />
                        </>
                    )}
                </div>
                )
            })}

        </div>
    );
}

export { CurrentSlide };
