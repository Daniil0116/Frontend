//import { SlideType } from "../store/PresentationType.ts";
import { CurrentSlide } from './slide/slide.tsx';
import styles from './SlidesList.module.css';
//import { SelectionType } from "../store/EditorType.ts";
//import { dispatch } from "../store/editor.ts";
//import { setSelection } from "../store/setSelection.ts";
import { useDragAndDropForSlide } from '../hooks/useDragAndDropForSlide.ts'
import { useAppSelector } from "../hooks/useAppSelector.ts";
import { useAppActions } from "../hooks/useAppActions.ts";

const SLIDE_PREVIEW_SCALE = 0.2;

// type SlidesListProps = {
//     slides: Array<SlideType>,
//     selection: SelectionType | null,
// };

function SlidesList() {

    const editor = useAppSelector((editor => editor))
    const slides = editor.presentation.slides
    const selection = editor.selection
    const {setSelection} = useAppActions()

    const {
        draggingSlide,
        dragOverSlide,
        handleDragStart,
        handleDragOver,
        handleDragEnd,
    } = useDragAndDropForSlide();

    function onSlideClick(slideId: string) {
        setSelection({
            selectedSlideId: slideId,
            elementId: '',
            selectedObjectId: null
        })
    }

    if (slides.length === 0) {
        return (
            <div className={styles.emptySlideList}>
                <div className={styles.emptyMessage}>
                    <h2>Добавьте слайд</h2>
                </div>
            </div>
        );
    }
    return (
        <div className={styles.slideList}>
            {slides.map((slide) =>
                <div
                    key={slide.id}
                    draggable
                    onDragStart={() => handleDragStart(slide.id)}
                    onDragOver={(e) => handleDragOver(e, slide.id)}
                    onDragEnd={handleDragEnd}
                    onClick={() => onSlideClick(slide.id)} 
                    className={draggingSlide === slide.id ? 'dragging' : (dragOverSlide === slide.id ? 'dragover' : '')}
                >

                    <CurrentSlide
                        slide={slide}
                        scale={SLIDE_PREVIEW_SCALE}
                        selection={selection}
                        className={styles.item}
                        selectedObjId={""}
                    ></CurrentSlide>
                </div>
            )}
        </div>
    )
}

export {
    SlidesList,
};