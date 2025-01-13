import { combineReducers } from 'redux';
import {
    PresentationActionTypes,
    SET_TITLE,
    ADD_SLIDE,
    REMOVE_SLIDE,
    SET_SELECTION,
} from './actionTypes'; // Импортируйте ваши типы действий
import { PresentationType } from '../PresentationType';
import { SelectionType } from '../EditorType';

const initialPresentationState: PresentationType = {
    title: '',
    slides: [],
};

const initialSelectionState: SelectionType = {
    selectedSlideId: null,
    selectedObjectId: null,
    elementId: ''
};

// Редюсер для презентации
const presentationReducer = (state = initialPresentationState, action: PresentationActionTypes): PresentationType => {
    switch (action.type) {
        case SET_TITLE:
            return { ...state, title: action.payload };
        case ADD_SLIDE:
            return { ...state, slides: [...state.slides, action.payload] };
        case REMOVE_SLIDE:
            return { ...state, slides: state.slides.filter(slide => slide.id !== action.payload.id) };
        default:
            return state;
    }
};

// Редюсер для редактора
const selectionReducer = (state = initialSelectionState, action: PresentationActionTypes): SelectionType => {
    switch (action.type) {
        case SET_SELECTION:
            return { ...state, ...action.payload }; 
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    presentation: presentationReducer,
    selection: selectionReducer, 
});

export default rootReducer;
