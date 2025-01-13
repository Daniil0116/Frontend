// import { EditorType } from "../EditorType";
// import { saveSlides, loadSlides } from "../localStorage";

// export function savePresentation(editor: EditorType): EditorType {
//     try {
//         saveSlides(editor);
//     } catch (err) {
//         console.error('Error saving to LS: ', err);
//     }
//     return editor;
// }

// export function loadPresentation(): EditorType {
//     try {
//         const loadedEditor = loadSlides();
//         if (loadedEditor) {
//             return loadedEditor;
//         } else {
//             return {} as EditorType
//         }
//     } catch (err) {
//         console.error('Error loading from LS: ', err);
//         return {} as EditorType;
//     }
// }
