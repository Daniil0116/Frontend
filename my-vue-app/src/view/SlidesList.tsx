import { SlideType } from "../store/PresentationType.ts";
import { CurrentSlide } from './slide/slide.tsx';
import styles from './SlidesList.module.css';
import { SelectionType } from "../store/EditorType.ts";
import { dispatch } from "../store/editor.ts";
import { setSelection } from "../store/setSelection.ts";
import {useDragAndDropForSlide} from "../hooks/"
import { useDragAndDropSlide } from '../hooks/useDragAndDropForObject.ts';

const SLIDE_PREVIEW_SCALE = 0.2;

type SlidesListProps = {
    slides: Array<SlideType>,
    selection: SelectionType | null,
};

function SlidesList({ slides, selection }: SlidesListProps) {
    const [localSlides, setLocalSlides] = useState(slides);

    // Обновляем локальное состояние при изменении пропсов
    useEffect(() => {
        setLocalSlides(slides);
    }, [slides]);

    function onSlideClick(slideId: string) {
        dispatch(setSelection, {
            selectedSlideId: slideId,
        });
    }

    // Обработчик события, вызываемый при начале перетаскивания
    function onDragStart(e: React.DragEvent<HTMLDivElement>, slideId: string) {
        e.dataTransfer.setData('slideId', slideId); // Сохраняем ID слайда в dataTransfer
    }

    // Обработчик события, который вызывается при перетаскивании над списком
    function onDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault(); // Разрешаем сброс элемента
    }

    // Обработчик события, вызываемый при сбросе перетаскиваемого элемента
    function onDrop(e: React.DragEvent<HTMLDivElement>, targetSlideId: string) {
        e.preventDefault();
        const slideId = e.dataTransfer.getData('slideId'); // Получаем ID слайда

        if (slideId && targetSlideId && slideId !== targetSlideId) {
            // Логика для изменения порядка слайдов
            const slideIndex = localSlides.findIndex(slide => slide.id === slideId);
            const targetIndex = localSlides.findIndex(slide => slide.id === targetSlideId);

            if (slideIndex !== -1 && targetIndex !== -1) {
                const updatedSlides = [...localSlides];
                const [movedSlide] = updatedSlides.splice(slideIndex, 1); // Удаляем слайд из исходного места
                updatedSlides.splice(targetIndex, 0, movedSlide); // Вставляем слайд в новое место

                setLocalSlides(updatedSlides); // Обновляем локальное состояние слайдов
            }
        }
    }

    return (
        <div className={styles.slideList}>
            {localSlides.length === 0 ? (
                <div className={styles.emptyMessage}>
                    <h2>Нет слайдов</h2>
                </div>
            ) : (
                localSlides.map((slide) => (
                    <div
                        key={slide.id}
                        className={styles.slideContainer}
                        onClick={() => onSlideClick(slide.id)}
                        draggable
                        onDragStart={(e) => onDragStart(e, slide.id)}
                        onDragOver={onDragOver}
                        onDrop={(e) => onDrop(e, slide.id)} 
                        data-slide-id={slide.id} 
                    >
                        <div className={styles.slideNumber}></div>
                        <CurrentSlide
                            slide={slide}
                            scale={SLIDE_PREVIEW_SCALE}
                            isSelected={slide.id === selection?.selectedSlideId}
                            className={styles.item}
                            selectedObjId={""}
                        />
                    </div>
                ))
            )}
        </div>
    );
}

export {
    SlidesList,
};