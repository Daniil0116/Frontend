type Presentation = {
    title: string;
    slides: Slide[];
}

type Slide = {
    id: string;
    background: Background;
    textElements: TextElement[];
    imageElements: ImageElement[];
}

type Background = {
    type: 'none' | 'solid' | 'image' | 'gradient';
    color?: string; // Для сплошного цвета
    imageUrl?: string; // Для изображения
    gradientColors?: string[]; // Для градиента
}

type SlideObject = {
    position: { 
        x: number; 
        y: number 
    };
    size: { 
        width: number; 
        height: number 
    };
}

type TextElement = SlideObject & {
    id: string;
    content: string;
    fontFamily: string;
    fontSize: number;
}

type ImageElement = SlideObject & {
    id: string;
    imageUrl: string;
}

type Select = {
    selectedSlides: string[]; // Массив ID выбранных слайдов
}

function updatePresentationTitle(presentation: Presentation, newTitle: string): Presentation {
    return { 
        ...presentation, title: newTitle 
    };
}

function addSlide(presentation: Presentation, slide: Slide): Presentation {
    return { 
        ...presentation, slides: [...presentation.slides, slide] 
    };
}

function removeSlide(presentation: Presentation, slideId: string): Presentation {
    return { 
        ...presentation, slides: presentation.slides.filter(slide => slide.id !== slideId)
     };
}

function moveSlide(presentation: Presentation, slideId: string, newPosition: number): Presentation {
    const slides = [...presentation.slides];
    const slideIndex = slides.findIndex(slide => slide.id === slideId);
    const [slide] = slides.splice(slideIndex, 1);
    slides.splice(newPosition, 0, slide);
    return { 
        ...presentation, slides 
    };
}

function addTextToSlide(slide: Slide, textElement: TextElement): Slide {
    return { 
        ...slide, textElements: [...slide.textElements, textElement] 
    };
}

function removeTextFromSlide(slide: Slide, textId: string): Slide {
    return { 
        ...slide, 
        textElements: slide.textElements.filter(text => text.id !== textId) 
    };
}

function updateTextElement(slide: Slide, textId: string, newContent: string): Slide {
    return {
        ...slide,
        textElements: slide.textElements.map(text => 
            text.id === textId ? { ...text, content: newContent } : text
        )
    };
}

function updateTextSize(slide: Slide, textId: string, newSize: number): Slide {
    return {
        ...slide,
        textElements: slide.textElements.map(text => 
            text.id === textId ? { ...text, fontSize: newSize } : text
        )
    };
}

function updateTextFontFamily(slide: Slide, textId: string, newFontFamily: string): Slide {
    return {
        ...slide,
        textElements: slide.textElements.map(text => 
            text.id === textId ? { ...text, fontFamily: newFontFamily } : text
        )
    };
}

function updateSlideBackground(slide: Slide, newBackground: Background): Slide {
    return { 
        ...slide, background: newBackground };
}

const minPresentation: Presentation = {
    title: "Минимальная Презентация",
    slides: []
};

const minSlide: Slide = {
    id: "slide1",
    background: { type: 'none' },
    textElements: [],
    imageElements: []
};

const maxPresentation: Presentation = {
    title: "Максимальная Презентация",
    slides: [
        {
            id: "slide1",
            background: 
            {
                type: 'solid',
                color: "#FFFFFF"
            },
            textElements: [
                {
                    position: 
                    { 
                        x: 10, y: 20 
                    },
                    size: 
                    {
                         width: 100, height: 50 
                    },
                    id: "text1",
                    content: "Hello world!",
                    fontFamily: "Arial",
                    fontSize: 14
                },
                {
                    position: 
                    { 
                        x: 10, y: 80 
                    },
                    size:
                    { 
                        width: 100, height: 50 
                    },
                    id: "text2",
                    content: "Hello world2!.",
                    fontFamily: "Times New Roman",
                    fontSize: 12

                }
            ],
            imageElements: [
                {
                    position: 
                    { 
                        x: 50, y: 150 
                    },
                    size: 
                    { 
                        width: 200, height: 100 
                    },
                    id: "image1",
                    imageUrl: "https://example.com/image1.png"
                },
                {
                    position: 
                    { 
                        x: 50, y: 300 
                    },
                    size: 
                    { 
                        width: 200, height: 100 
                    },
                    id: "image2",
                    imageUrl: "https://example.com/image2.png"
                }
            ]
        },

        {
            id: "slide2",
            background: {
                type: 'gradient',
                gradientColors: ['#FF5733', '#C70039']
            },
            textElements: [],
            imageElements: []
        }
    ]
};
console.log("Проверка обновления заголовка");
console.log(updatePresentationTitle(minPresentation, "Новый Заголовок"));
console.log(updatePresentationTitle(maxPresentation, "Новый Заголовок"));

console.log("Проверка добавления слайда");
console.log(addSlide(minPresentation, minSlide));
console.log(addSlide(maxPresentation, minSlide));

console.log("Проверка удаления слайда");
console.log(removeSlide(maxPresentation, "slide1"));

console.log("Проверка перемещения слайда");
console.log(moveSlide(maxPresentation, "slide1", 0));
console.log(moveSlide(maxPresentation, "slide2", 0));

console.log("Проверка добавления текста на слайд");
console.log(addTextToSlide(minSlide, {
    position: 
    { 
        x: 10, y: 10 
    },
    size: 
    { 
        width: 100, height: 40 
    },
    id: "text1",
    content: "Минимальный текст",
    fontFamily: "Arial",
    fontSize: 16
}));
console.log(addTextToSlide(maxPresentation.slides[0], {
    position: 
    { 
        x: 20, y: 20 
    },
    size: 
    { 
        width: 150, height: 40 
    },
    id: "text3",
    content: "Максимальный текст",
    fontFamily: "Tahoma",
    fontSize: 18
}));

console.log("Проверка удаления текста со слайда");
console.log(removeTextFromSlide(maxPresentation.slides[0], "text1"));
console.log(removeTextFromSlide(minSlide, "text1"));

console.log("Проверка обновления текстового элемента");
console.log(updateTextElement(maxPresentation.slides[0], "text2", "Обновленный текст"));
console.log(updateTextElement(minSlide, "text1", "Обновленный текст"));

console.log("Проверка изменения размера текста");
console.log(updateTextSize(maxPresentation.slides[0], "text2", 30));
console.log(updateTextSize(minSlide, "text1", 30));

console.log("Проверка изменения шрифта текста");
console.log(updateTextFontFamily(maxPresentation.slides[0], "text2", "Arial"));
console.log(updateTextFontFamily(minSlide, "text1", "Comic Sans MS"));

console.log("Проверка обновления фона слайда");
console.log(updateSlideBackground(minSlide, { type: 'solid', color: '#000000' }));
console.log(updateSlideBackground(maxPresentation.slides[0], { type: 'image', imageUrl: 'https://example.com/newimage.png' }));
