import { jsPDF } from "jspdf";
import "../assets/NotoSans.ts";
import { SlideType, SlideObject } from "./PresentationType.ts";
import NotoSans from "../assets/NotoSans.ts";
import { SLIDE_HEIGHT, SLIDE_WIDTH } from "../view/slide/slide.tsx";

function insertTextIntoPDF(pdf: jsPDF, object: SlideObject) {
    if (object.type === "text") {
        pdf.setFont("NotoSans", "normal");
        pdf.setFontSize(object.fontSize);
        pdf.setTextColor(object.fontColor);

        const positionX = object.x;
        const positionY = object.y + object.fontSize;

        pdf.text(object.value, positionX, positionY, {
            maxWidth: object.width,
        });
    }
}

function insertImageIntoPDF(pdf: jsPDF, object: SlideObject) {
    if (object.type === "image") {
        const imgSource = object.src;
        pdf.addImage(imgSource, "JPEG", object.x, object.y, object.width, object.height);
    }
}

const createPresentationPDF = async (slides: SlideType[]): Promise<Blob> => {
    const pdf = new jsPDF("landscape", "px", [SLIDE_WIDTH, SLIDE_HEIGHT]);
    pdf.addFileToVFS("NotoSans.ttf", NotoSans);
    pdf.addFont("NotoSans.ttf", "NotoSans", "normal");
    pdf.setFont("NotoSans");

    pdf.setFont("NotoSans", "normal");

    slides.forEach((slide, slideIndex) => {
        switch (slide.background?.type) {
            case "color":
                pdf.setFillColor(slide.background.color);
                pdf.rect(0, 0, 935, 525, "F");
                break;
            case "image":
                const imgSrc = slide.background.src;
                pdf.addImage(imgSrc, "JPEG", 0, 0, 935, 525);
                break;
            default:
                pdf.setFillColor("white");
                pdf.rect(0, 0, 935, 525, "F");
                break;
        }

        slide.objects.forEach((object) => {
            switch (object.type) {
                case "text":
                    insertTextIntoPDF(pdf, object);
                    break;
                case "image":
                    insertImageIntoPDF(pdf, object);
                    break;
                default:
                    break;
            }
        });

        if (slideIndex < slides.length - 1) {
            pdf.addPage();
        }
    });

    return pdf.output("blob");
};

export { createPresentationPDF }
