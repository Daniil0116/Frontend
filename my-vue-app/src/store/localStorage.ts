import { EditorType } from "./EditorType";

const saveSlides = (editor: EditorType) => {
    try {
        const serializedState = JSON.stringify(editor);
        console.log('Saving to localStorage:', serializedState); 
        localStorage.setItem('presentation', serializedState);
    } catch (err) {
        console.error('Error saving to localStorage:', err);
    }
};

const loadSlides = (): EditorType | null => {
    try {
        const serializedState = localStorage.getItem('presentation');
        console.log('Loading from localStorage:', serializedState); 
        if (serializedState === null) return null;
        return JSON.parse(serializedState);
    } catch (err) {
        console.error('Error loading from localStorage:', err);
        return null;
    }
};

export  {saveSlides, loadSlides}
