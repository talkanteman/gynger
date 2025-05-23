import { Bill } from './types';

export const fastifyFile = {
    type: 'object',
    properties: {
        file: {
            type: 'string',
            format: 'binary',
        },
    },
    required: ['file'],
} as const;

export const billSchema = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        amount: { type: 'number' },
        date: { type: 'string', format: 'date' },
        vendorName: { type: 'string' }
    },
    required: ['id', 'amount', 'date', 'vendorName']
} as const;

export const billsSchema = {
    type: 'object',
    properties: {
        bills: {
            type: 'array',
            items: billSchema
        },
        errors: {
            type: 'array',
            items: { type: 'string' },
            nullable: true
        }
    },
    required: ['bills']
} as const;