import { reactive } from 'vue'
import { Desk } from '@shared/types/Desk'
import { Product } from '@shared/types/Product'

const desks: Desk[] = await (window as any).api.desk.getDesks()
const products: Product[] = await (window as any).api.product.getProducts()
const state = reactive({
    desks,
    products
})

const saveDesk = async (updatedDesk: any) => {
    updatedDesk = JSON.stringify(updatedDesk)
    state.desks = await (window as any).api.desk.updateDesk(updatedDesk)
}

const methods = reactive({
    saveDesk
})

export { state, methods }
