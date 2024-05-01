import { Product } from "./Product";

export class LineItem {
    constructor(
        public product: Product,
        public quantity: number
    ) { }
}