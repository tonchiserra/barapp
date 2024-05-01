import { LineItem } from './LineItem';

export class Desk {
    constructor(
        public id: string,
        public state: 'blank' | 'no-paid' | 'paid' | 'closed',
        public number: number,
        public name: string,
        public lineItems: LineItem[],
        public totalAmount: number,
        public dateClosed?: Date
    ) { }
}