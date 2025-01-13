import {ImageObjectType} from "../../store/PresentationType.ts";
import {CSSProperties} from "react";

type ImageObjectProps = {
    imageObject: ImageObjectType,
    scale?: number,
    selection: boolean,
}

function ImageObject({imageObject, scale = 1, selection}: ImageObjectProps) {
    const imageObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${imageObject.y * scale}px`,
        left: `${imageObject.x * scale}px`,
        width: `${imageObject.width * scale}px`,
        height: `${imageObject.height * scale}px`,
        zIndex: 3,
        border: selection ? '3px solid #0b57d0' : 'none',
    }

    return (
        <img style={imageObjectStyles} src={`${imageObject.src}`}/>
    )
}

export {
    ImageObject,
}
