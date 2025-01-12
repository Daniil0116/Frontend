import * as SlideActionCreators from './slideActionCreators'
import * as SelectionActionCreators from './selectionActionCreators'
import * as EditorActionCreators from './editorActionCreator'

export default {
    ...SlideActionCreators,
    ...SelectionActionCreators,
    ...EditorActionCreators,
}
