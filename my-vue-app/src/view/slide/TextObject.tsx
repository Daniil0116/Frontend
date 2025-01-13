//import { dispatch } from "../../store/editor.ts";
//import { SelectionType } from "../../store/EditorType.ts";
import { TextObjectType } from "../../store/PresentationType.ts";
import { CSSProperties, useState } from "react";
//import { setSelection } from "../../store/setSelection.ts";

type TextObjectProps = {
    textObject: TextObjectType,
    scale?: number,
    selection: boolean,
}

function TextObject({ textObject, scale = 1, selection }: TextObjectProps) {

    const [isEditing, setIsEditing] = useState(false);
    const [textValue, setTextValue] = useState(() => {
        const storedText = localStorage.getItem(`text_${textObject.id}`);
        return storedText ? storedText : textObject.value; 
    });
    
    const textObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${textObject.y * scale}px`, 
        left: `${textObject.x * scale}px`, 
        width: `${textObject.width * scale}px`, 
        height: `${textObject.height * scale}px`, 
        fontSize: `${textObject.fontSize * scale}px`, 
        cursor: selection ? 'move' : 'default', 
        margin: 0,
        border: selection ? '3px solid #0b57d0' : 'none',
    };

    const handleDoubleClick = () => { setIsEditing(true); };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { setTextValue(e.target.value); };
    
    const handleBlur = () => { 
        setIsEditing(false); 
        localStorage.setItem(`text_${textObject.id}`, textValue);
    };

    return (
        <>
        {isEditing ? (
            <input type="text"
                value={textValue}
                onChange={handleChange}
                onBlur={handleBlur}
                autoFocus
                style={{...textObjectStyles, fontSize: `${textObject.fontSize * scale}px`,}}
                />
        ) : (
            <p onDoubleClick={handleDoubleClick} style={textObjectStyles}>
                {textValue}
            </p>
            )}
        </>
    );
}

export {
    TextObject,
};
