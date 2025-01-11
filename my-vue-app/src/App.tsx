import styles from './App.module.css';
import { SlidesList } from "./view/SlidesList";
import { TopPanel } from "./view/topPanel/TopPanel";
import { Workspace } from "./view/Workspace";
import { EditorType } from "./store/EditorType";

type AppProps = {
    editor: EditorType;
};

function App({ editor }: AppProps) {
    const selectedSlideIndex = editor.presentation.slides.findIndex(slide => slide.id === editor.selection?.selectedSlideId);

    return (
        <>
            <TopPanel title={editor.presentation.title} />
            <div className={styles.container}>
                <SlidesList 
                    slides={editor.presentation.slides} 
                    selection={editor.selection} 
                />
                <Workspace 
                    slides={editor.presentation.slides} 
                    selectedSlideIndex={selectedSlideIndex >= 0 ? selectedSlideIndex : null}
                    selectedObjId={editor.selection?.selectedObjectId ?? null} 
                />
            </div>
        </>
    );
}

export default App;
