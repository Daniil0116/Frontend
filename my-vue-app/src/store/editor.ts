import { defaultEditor } from './data.ts';
import { loadSlides, saveSlides } from './localStorage.ts';
import { validateEditor } from "./validation.ts";

let _editor = loadSlides() || defaultEditor 
let _handler: Function | null = null 

function getEditor() 
{
    loadSlides();
    return _editor
}

function setEditor(newEditor: any) 
{
    _editor = newEditor;
    saveSlides(_editor);
}

function dispatch(modifyFn: Function, payload?: Object): void 
{
    const newEditor = modifyFn(_editor, payload)
    setEditor(newEditor)
    if (_handler) {
        _handler()
    }
}

function addEditorChangeHandler(handler: Function): void
{
    _handler = handler
}

const initState = loadSlides();
if (initState && validateEditor(initState.presentation)) {
    setEditor(initState)
} else {
    console.error('Invalid init state from LS')
}

export {
    getEditor,
    dispatch,
    addEditorChangeHandler,
}