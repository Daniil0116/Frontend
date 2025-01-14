import { useDispatch } from "react-redux";
import { TextObjectType } from "../../store/PresentationType.ts";
import { CSSProperties, useEffect, useState } from "react";
import { updateText } from "../../store/redux/slideActionCreators.ts";

type TextObjectProps = {
    textObject: TextObjectType,
    scale?: number,
    selection: boolean,
}

function TextObject({ textObject, scale = 1, selection }: TextObjectProps) {

    const [isEditing, setIsEditing] = useState(false);
    const [textValue, setTextValue] = useState(textObject.value);
    
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
    const dispatch = useDispatch()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setTextValue(newValue); 
        dispatch(updateText(textObject.id, newValue));
    };
    
    const handleBlur = () => { 
        setIsEditing(false); 
    };

    useEffect(() => {
        setTextValue(textObject.value);
    }, [textObject.value]);

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
