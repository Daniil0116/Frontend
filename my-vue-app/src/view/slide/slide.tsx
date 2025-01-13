import { SlideType } from "../../store/PresentationType.ts";
import { TextObject } from "./TextObject.tsx";
import { ImageObject } from "./ImageObject.tsx";
import styles from './Slide.module.css';
import { CSSProperties } from "react";
import { dispatch } from "../../store/editor.ts";
import { setSelection } from "../../store/setSelection.ts";
import { useDragAndDrop } from "../../hooks/useDragAndDropForObject.ts";
import { useResizeObject } from "../../hooks/useResizeObjects";
import { useAppSelector } from "../../hooks/useAppSelector.ts";
import { SelectionType } from "../../store/EditorType.ts";
import { useAppActions } from "../../hooks/useAppActions.ts";


const SLIDE_WIDTH = 935;
const SLIDE_HEIGHT = 525;

type SlideProps = {
    slide: SlideType | null,
    scale?: number,
    selection?: SelectionType,
    className: string,
    showResizeHandles?: boolean,
    showSelectedObject?: boolean,
}

function CurrentSlide({ slide, scale = 1, className, showResizeHandles = true }: SlideProps) {
    const selection = useAppSelector((editor => editor.selection))
    const { setSelection } = useAppActions();
    const { handleobjectMD, handleobjectMM, handleobjectMU } = useDragAndDrop({ slideId: slide?.id ?? '' });
    const { isResizing, handleResizeMD, handleResizeMM, handleResizeMU } = useResizeObject({ slideId: slide?.id ?? '' });
    

    // function onObjClick(objectId: string): void {
    //     dispatch(setSelection, {
    //         selectedSlideId: slide?.id,
    //         selectedObjectId: objectId,
    //     });
    // }

    const handleSlideClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        const elementId = target.getAttribute('data-element-id');
        const slideId = slide?.id ?? "";
        if (elementId) {
            setSelection({
                selectedSlideId: slideId, selectedObjectId: elementId,
                elementId: ""
            });
        } else {
            setSelection({
                selectedSlideId: slideId, selectedObjectId: null,
                elementId: ""
            });
        }
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
                const isSelectionObj = SlideObject.id === selection?.selectedObjectId;
                return (<div key={SlideObject.id}
                    onClick={(e) => { e.stopPropagation(); setSelection({
                        selectedSlideId: slide.id, selectedObjectId: SlideObject.id,
                        elementId: ""
                    }); }}
                    onMouseDown={(event) => handleobjectMD(event, SlideObject.id)}
                    style={{ position: 'relative' }}>
                    {SlideObject.type === "text" ? (
                        <TextObject textObject={SlideObject} scale={scale} selection={isSelectionObj} />
                    ) : (
                        <ImageObject imageObject={SlideObject} scale={scale} selection={isSelectionObj} />
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
