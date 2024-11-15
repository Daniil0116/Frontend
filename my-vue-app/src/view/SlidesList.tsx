import {SlideType} from "../store/PresentationType.ts";
import {CurrentSlide} from './slide/slide.tsx'
import styles from './SlidesList.module.css'
import {SelectionType} from "../store/EditorType.ts";
import {dispatch} from "../store/editor.ts";
import {setSelection} from "../store/setSelection.ts";

const SLIDE_PREVIEW_SCALE = 0.2

type SlidesListProps = {
    slides: Array<SlideType>,
    selection: SelectionType | null,
}

function SlidesList({slides, selection}: SlidesListProps) {
    function onSlideClick(slideId: string) {
        dispatch(setSelection, {
            selectedSlideId: slideId,
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
                <div key={slide.id} className={styles.slideContainer} onClick={() => onSlideClick(slide.id)}>
                     <div className={styles.slideNumber}></div> 
                    <CurrentSlide
                        slide={slide}
                        scale={SLIDE_PREVIEW_SCALE}
                        isSelected={slide.id === selection?.selectedSlideId}
                        className={styles.item}
                        selectedObjId = {""}
                    ></CurrentSlide>
                </div>
            )}
        </div>
    )
}

export {
    SlidesList,
}
