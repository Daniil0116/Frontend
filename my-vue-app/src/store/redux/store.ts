import { legacy_createStore as createStore } from "redux";
import { editorReducer } from "./editorReducers";

const store = createStore(editorReducer)

export {
    store
}