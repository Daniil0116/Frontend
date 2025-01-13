import * as SlideActionCreators from './slideActionCreators'
import * as SelectionActionCreators from './slectionActionCreators'
import * as EditorActionCreators from './editorActionCreator'

export default {
    ...SlideActionCreators,
    ...SelectionActionCreators,
    ...EditorActionCreators,
}
