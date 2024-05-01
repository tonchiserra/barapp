import fs from 'node:fs'
import { Product } from '@shared/types/Product'

const PRODUCTS_PATH = `db/products.json`;

async function getProducts(): Promise<Product[] | undefined>{
    let products: Product[] = []
    try {
        products = JSON.parse(fs.readFileSync(PRODUCTS_PATH, 'utf-8'))
        if(!!!products?.length) throw new Error('No products found')
    }catch(error) {
        console.error('Error getting products. ', error)
    }

    return products
}

export const productController = { getProducts }