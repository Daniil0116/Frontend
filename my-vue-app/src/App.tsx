import styles from './App.module.css'
import {SlidesList} from "./view/SlidesList.tsx";
import {TopPanel} from "./view/topPanel/TopPanel.tsx";
import {Workspace} from "./view/Workspace.tsx";
import {EditorType} from "./store/EditorType.ts";

type AppProps = {
    editor: EditorType,
}
function App({editor}: AppProps) {
    const selectedSlideIndex = editor.presentation.slides.findIndex(slide => slide.id === editor.selection.selectedSlideId);
    return (
        <>
            <TopPanel title={editor.presentation.title}></TopPanel>
            <div className={styles.container}>
                <SlidesList slides={editor.presentation.slides} selection={editor.selection}></SlidesList>
                <Workspace slides={editor.presentation.slides}  selectedSlideIndex={selectedSlideIndex >= 0 ? selectedSlideIndex : null} selectedObjId={editor.selection.selectedObjectId}></Workspace>
            </div>
        </>
    )
}

export default App
