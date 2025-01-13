type PresentationType = {
    title: string,
    slides: Array<SlideType>
}

type SlideType = {
    [x: string]: unknown,
    id: string,
    objects: Array<SlideObject>,
    background:  Background | undefined,
}

type Background = ColorBackground | ImageBackground

type ColorBackground = {
    type: 'color',
    color: string;
}

type ImageBackground = {
    type: 'image',
    src: string;
}

type SlideObject = TextObjectType | ImageObjectType

type BaseSlideObject = {
    id: string,
    x: number,
    y: number,
    width: number,
    height: number,
}

type TextObjectType = BaseSlideObject & {
    type: 'text',
    text: string,
    fontFamily: string,
    fontSize: number,
    fontColor: string,
    value: string, 
}

type ImageObjectType = BaseSlideObject & {
    type: 'image',
    src: string,
}

export type {
    PresentationType,
    SlideType,
    TextObjectType,
    ImageObjectType,
    ColorBackground,
    ImageBackground,
    SlideObject,
}
