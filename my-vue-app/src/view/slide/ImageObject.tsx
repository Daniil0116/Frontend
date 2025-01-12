import { dispatch } from "../../store/editor.ts";
import { SelectionType } from "../../store/EditorType.ts";
import {ImageObjectType} from "../../store/PresentationType.ts";
import {CSSProperties} from "react";
import { setSelection } from "../../store/setSelection.ts";

type ImageObjectProps = {
    imageObject: ImageObjectType,
    scale?: number,
    selection: SelectionType,
}

function ImageObject({imageObject, scale = 1, selection}: ImageObjectProps) {
    const imageObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${imageObject.y * scale}px`,
        left: `${imageObject.x * scale}px`,
        width: `${imageObject.width * scale}px`,
        height: `${imageObject.height * scale}px`,
        zIndex: 3,
    }

    if (selection.selectedObjectId === imageObject.id) {
        imageObjectStyles.border = '3px solid #0b57d0'
    }

    const onImageClick = () => {
        dispatch(setSelection, {
            selectedSlideId: selection.selectedSlideId,
            selectedObjectId: imageObject.id,
        })
    }
    // if (isSelected) {
    //     imageObjectStyles.border = '3px solid #0b57d0'
    // }
    return (
        <img onClick={onImageClick} style={imageObjectStyles} src={`${imageObject.src}`}/>
    )
}

export {
    ImageObject,
}
