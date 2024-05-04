import { Product } from "./Product";

export class LineItem {
    constructor(
        public id: string,
        public product: Product,
        public quantity: number
    ) { }
}