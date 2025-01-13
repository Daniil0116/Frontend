import { legacy_createStore as createStore } from "redux";
import { editorReducer } from "./editorReducers";
import { defaultEditor } from "../data";
import { loadSlides, saveSlides } from "../localStorage";

const preloadedState = loadSlides() || defaultEditor;
const store = createStore(editorReducer, preloadedState)

store.subscribe(() => {
    saveSlides(store.getState());
});

export {
    store
}