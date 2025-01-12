import { CSSProperties } from "react";
import {SlideType} from "../store/PresentationType.ts";
import {CurrentSlide} from "./slide/slide.tsx";
import styles from './Workspace.module.css'
import { useAppSelector } from "../hooks/useAppSelector.ts";
//import { SelectionType } from "../store/EditorType.ts";

// type WorkspaceProps = {
//     slides: SlideType,
//     selectedSlideIndex: number | null,
//     selectedObjId: string | null,
// }
const SLIDE_WIDTH = 935
const SLIDE_HEIGHT = 525
const scale = 1;
const slideStyles: CSSProperties = {
    width: `${SLIDE_WIDTH * scale}px`,
    height: `${SLIDE_HEIGHT * scale}px`
}
function Workspace() {

    const editor = useAppSelector((editor => editor))
    const slides = editor.presentation.slides
    const selection = editor.selection
    const selectedSlide: SlideType = slides.find(slide => slide.id === selection?.selectedSlideId) || slides[0]
    const selectedObjId = editor.selection.selectedObjectId
    //SelectionType = slides.find(object => object.id === selection?.selectedObjectId) || null;

    if (slides.length === 0) {
        return (
            <div style={slideStyles} className={styles.emptyWorkspace}>
                <div className={styles.emptyMessage}>
                    <h2>Добавьте слайд</h2>
                </div>
            </div>
        );
    }
    //const slide = slides[selectedSlideIndex || 0];
    return (
        <div className={styles.workspace}>
            <CurrentSlide slide={selectedSlide} className={""} selectedObjId={selectedObjId}></CurrentSlide>
        </div>
    )
}

export {
    Workspace,
}