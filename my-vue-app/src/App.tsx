import styles from './App.module.css';
import { SlidesList } from "./view/SlidesList.tsx";
import { TopPanel } from "./view/topPanel/TopPanel.tsx";
import { Workspace } from "./view/Workspace.tsx";
import { EditorType } from "./store/EditorType.ts";
import { useState } from "react";

type AppProps = {
    editor: EditorType,
}

function App({ editor }: AppProps) {
    const selectedSlideIndex = editor.presentation.slides.findIndex(slide => slide.id === editor.selection.selectedSlideId);

    
    const [presentation, setPresentation] = useState(editor.presentation);

   
    const updateObjectSize = (id: string, width: number, height: number) => {
        setPresentation((prev) => ({
            ...prev,
            slides: prev.slides.map((slide) => ({
                ...slide,
                objects: slide.objects.map((obj) =>
                    obj.id === id ? { ...obj, width, height } : obj
                ),
            })),
        }));
    };

    return (
        <>
            <TopPanel title={presentation.title}></TopPanel>
            <div className={styles.container}>
                <SlidesList slides={presentation.slides} selection={editor.selection}></SlidesList>
                <Workspace 
                    slides={presentation.slides}  
                    selectedSlideIndex={selectedSlideIndex >= 0 ? selectedSlideIndex : null} 
                    selectedObjId={editor.selection.selectedObjectId}
                    onUpdateObjectSize={updateObjectSize} // Передаем функцию обновления размера
                />
            </div>
        </>
    )
}

export default App;
