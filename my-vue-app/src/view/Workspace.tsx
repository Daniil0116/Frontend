import { CSSProperties } from "react";
import { SlideType } from "../store/PresentationType.ts";
import { CurrentSlide } from "./slide/slide.tsx";
import styles from './Workspace.module.css';

type WorkspaceProps = {
    slides: SlideType[],
    selectedSlideIndex: number | null;
    selectedObjId: string | null;
    onUpdateObjectSize: (id: string, width: number, height: number) => void; // Добавляем пропс для обновления размера
};

const SLIDE_WIDTH = 935;
const SLIDE_HEIGHT = 525;
const scale = 1;

const slideStyles: CSSProperties = {
    width: `${SLIDE_WIDTH * scale}px`,
    height: `${SLIDE_HEIGHT * scale}px`
};

function Workspace({ slides, selectedSlideIndex, selectedObjId, onUpdateObjectSize }: WorkspaceProps) {
    if (slides.length === 0) {
        return (
            <div style={slideStyles} className={styles.emptyWorkspace}>
                <div className={styles.emptyMessage}>
                    <h2>Добавьте слайд</h2>
                </div>
            </div>
        );
    }

    const slide = slides[selectedSlideIndex || 0];

    return (
        <div className={styles.workspace}>
            <CurrentSlide 
                slide={slide} 
                isSelected={true} // Можно изменить логику выбора
                className={""} 
                selectedObjId={selectedObjId}
                onUpdateObjectSize={onUpdateObjectSize} // Передаем функцию обновления размера
            />
        </div>
    );
}

export {
    Workspace,
};
