import {editor} from './data.ts'
import { EditorType } from './EditorType.ts'

let _editor = editor
type HandlerFunction = () => void;
let _handler: HandlerFunction | null = null;

function getEditor() {
    return _editor
}

function setEditor(newEditor: EditorType) {
    _editor = newEditor
}
type ModifyFunction = (editor: EditorType, payload?: object) => EditorType;
function dispatch(modifyFn: ModifyFunction, payload?: object): void {
    const newEditor = modifyFn(_editor, payload);
    setEditor(newEditor);

    if (_handler) {
        _handler();
    }
}

function addEditorChangeHandler(handler: HandlerFunction): void {
    _handler = handler;
}

export {
    getEditor,
    dispatch,
    addEditorChangeHandler,
}
