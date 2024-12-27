import Ajv from 'ajv';

const ajv = new Ajv();

const objectSchema = {
    type: 'object',
    required: ['id', 'type', 'x', 'y', 'width', 'height'],
    properties: {
        id: { type: 'string' },
        type: { type: 'string' },
        x: { type: 'number' },
        y: { type: 'number' },
        width: { type: 'number' },
        height: { type: 'number' }
    }
}

const slideSchema = {
    type: 'object',
    required: ['id', 'objects'],
    properties: {
        id: { type: 'string' },
        objects: {
            type: 'array',
            items: objectSchema
        }
    }
};

const editorSchema = {
    type: 'object',
    required: ['presentation', 'selection'],
    properties: {
        presentation: {
            type: 'object',
            required: ['title', 'slides'],
            properties: {
                title: {
                    type: 'string'
                },
                slides: {
                    type: 'array',
                    items: slideSchema
                }
            }
        },
        selection: {
            type: 'object',
            properties: {
                selectedSlideId: { type: ['string'] },
                selectedObjectId: { type: ['string', 'null'] }
            }
        }
    }
};

export const validateEditor = ajv.compile(editorSchema);