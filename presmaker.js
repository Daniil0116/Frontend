var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function updatePresentationTitle(presentation, newTitle) {
    return __assign(__assign({}, presentation), { title: newTitle });
}
function addSlide(presentation, slide) {
    return __assign(__assign({}, presentation), { slides: __spreadArray(__spreadArray([], presentation.slides, true), [slide], false) });
}
function removeSlide(presentation, slideId) {
    return __assign(__assign({}, presentation), { slides: presentation.slides.filter(function (slide) { return slide.id !== slideId; }) });
}
function moveSlide(presentation, slideId, newPosition) {
    var slides = __spreadArray([], presentation.slides, true);
    var slideIndex = slides.findIndex(function (slide) { return slide.id === slideId; });
    var slide = slides.splice(slideIndex, 1)[0];
    slides.splice(newPosition, 0, slide);
    return __assign(__assign({}, presentation), { slides: slides });
}
function addTextToSlide(slide, textElement) {
    return __assign(__assign({}, slide), { textElements: __spreadArray(__spreadArray([], slide.textElements, true), [textElement], false) });
}
function removeTextFromSlide(slide, textId) {
    return __assign(__assign({}, slide), { textElements: slide.textElements.filter(function (text) { return text.id !== textId; }) });
}
function updateTextElement(slide, textId, newContent) {
    return __assign(__assign({}, slide), { textElements: slide.textElements.map(function (text) {
            return text.id === textId ? __assign(__assign({}, text), { content: newContent }) : text;
        }) });
}
function updateTextSize(slide, textId, newSize) {
    return __assign(__assign({}, slide), { textElements: slide.textElements.map(function (text) {
            return text.id === textId ? __assign(__assign({}, text), { fontSize: newSize }) : text;
        }) });
}
function updateTextFontFamily(slide, textId, newFontFamily) {
    return __assign(__assign({}, slide), { textElements: slide.textElements.map(function (text) {
            return text.id === textId ? __assign(__assign({}, text), { fontFamily: newFontFamily }) : text;
        }) });
}
function updateSlideBackground(slide, newBackground) {
    return __assign(__assign({}, slide), { background: newBackground });
}
var minPresentation = {
    title: "Минимальная Презентация",
    slides: []
};
var minSlide = {
    id: "slide1",
    background: { type: 'none' },
    textElements: [],
    imageElements: []
};
var maxPresentation = {
    title: "Максимальная Презентация",
    slides: [
        {
            id: "slide1",
            background: {
                type: 'solid',
                color: "#FFFFFF"
            },
            textElements: [
                {
                    position: {
                        x: 10, y: 20
                    },
                    size: {
                        width: 100, height: 50
                    },
                    id: "text1",
                    content: "Hello world!",
                    fontFamily: "Arial",
                    fontSize: 14
                },
                {
                    position: {
                        x: 10, y: 80
                    },
                    size: {
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
                    position: {
                        x: 50, y: 150
                    },
                    size: {
                        width: 200, height: 100
                    },
                    id: "image1",
                    imageUrl: "https://example.com/image1.png"
                },
                {
                    position: {
                        x: 50, y: 300
                    },
                    size: {
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
    position: {
        x: 10, y: 10
    },
    size: {
        width: 100, height: 40
    },
    id: "text1",
    content: "Минимальный текст",
    fontFamily: "Arial",
    fontSize: 16
}));
console.log(addTextToSlide(maxPresentation.slides[0], {
    position: {
        x: 20, y: 20
    },
    size: {
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
