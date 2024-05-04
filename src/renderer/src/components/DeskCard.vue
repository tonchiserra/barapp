<script lang="ts" setup>
  import CardBadge from './CardBadge.vue'
  import IconPlus from '../assets/IconPlus.vue'
  import LineItem from './LineItem.vue'
  import { getCurrentInstance, ref, watch } from 'vue'
  import { Desk } from '@shared/types/Desk'
  import { Product } from '@shared/types/Product'
  import { state, methods } from '../helpers/AppStore'
  
  const props = defineProps<{ desk: Desk }>()

  const instance = getCurrentInstance()
  const showSearchItem = ref(false)
  const searchItemQuery = ref('')
  const recommendedProducts = ref([{ id: '', name: '', price: 0 }])
  const deskTitle = ref(`#${props.desk.number} ${props.desk.name}`)

  watch(() => props.desk, (newDesk) => {
    deskTitle.value = `#${newDesk.number} ${newDesk.name}`
  })

  const handleSearchItem = (event: any) => {

    if(!!event.key && (event.key !== 'Escape' && event.key !== 'Enter')) return

    showSearchItem.value = !showSearchItem.value

    setTimeout(() => {
      if(!instance?.refs.searchItemInput) return

      (instance.refs.searchItemInput as HTMLElement).focus()
    }, 300)
  }

  const searchProducts = (event: KeyboardEvent) => {
    if(event.key === 'Enter') return

    let searchItemQueryHandleized = searchItemQuery.value.replace(/[#0-9\s]/g, '').toLowerCase()
    if(!!!searchItemQueryHandleized) {
      recommendedProducts.value = [{ id: '', name: '', price: 0 }]
      return
    }

    const products = state.products.filter(product => {
      let productNameHandleized = product.name.replace(/[#0-9\s]/g, '').toLowerCase()
      return productNameHandleized.includes(searchItemQueryHandleized)
    })

    if(!!!products.length) {
      recommendedProducts.value = [{ id: '', name: '', price: 0 }]
      return
    }

    recommendedProducts.value = { ...products }
  }

  const addProduct = (recommendedProduct: Product) => {
    if(!!!recommendedProduct.name) return
    
    props.desk.lineItems.push({ id: `${props.desk.lineItems.length + 1}`, product: recommendedProduct, quantity: 1 })
    let updatedDesk = { id: props.desk.id, lineItems: props.desk.lineItems, state: 'no-paid' }
    methods.saveDesk(updatedDesk)

    searchItemQuery.value = ''
    showSearchItem.value = false
    recommendedProducts.value = [{ id: '', name: '', price: 0 }]
  }
</script>

<template>
  <div class="desk-card">
    <div class="desk-card__header">
      <input type="text" name="DeskCardTitle" id="DeskCardTitle" v-model="deskTitle" @blur="methods.saveDesk({ id: props.desk.id, name: deskTitle.replace(/[#0-9\s]/g, '') })" />
      <CardBadge :state="props.desk.state" />
    </div>

    <div class="desk-card__items">
      <LineItem :lineItem="lineItem" :desk="props.desk" v-for="lineItem in props.desk.lineItems" />

      <!-- if clicked -->
      <div v-if="showSearchItem" class="search-modal" @keyup="handleSearchItem" @click="handleSearchItem">
        <input type="text" class="item" ref="searchItemInput" v-model="searchItemQuery" @keyup="searchProducts" />
        <ul class="recommended-products-list" v-if="recommendedProducts[0].name !== ''">
          <li v-for="recommendedProduct in recommendedProducts"><button class="no-btn" @click="addProduct(recommendedProduct)">{{ recommendedProduct.name }}</button></li>
        </ul>
      </div>

      <!-- else -->
      <button id="AddItemBtn" class="add-item-btn no-btn" v-else-if="props.desk.state !== 'closed'" @click="handleSearchItem">
        <IconPlus />
        <span>Agregar</span>
      </button>

    </div>

    <div class="desk-card__bottom">
      <div class="items-total">
        <p>Total</p>
        <p>$ {{ desk.totalAmount }}</p>
      </div>
      <div class="desk-card__buttons" v-if="props.desk.state !== 'blank'">
        <button id="MarkAsPaidBtn" class="primary" v-if="props.desk.state === 'no-paid'" @click="methods.saveDesk({ id: props.desk.id, state: 'paid' })">Marcar como pagado</button>
        <template v-else-if="props.desk.state === 'paid'">
          <button id="MarkAsClosedBtn" class="primary" @click="methods.saveDesk({ id: props.desk.id, state: 'closed' })">Cerrar mesa</button>
          <button id="MarkAsNoPaidBtn" class="secondary" @click="methods.saveDesk({ id: props.desk.id, state: 'no-paid' })">Cancelar pago</button>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '../styles/variables.scss';

  .desk-card {
    width: 100%;
    height: 450px;
    background-color: #fff;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: max-content;

      input {
        font-size: 1.8rem;
      }
    }

    &__items {
      width: 100%;
      height: 100%;
      overflow: hidden;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 10px;

      @include scrollbar;

      input.item {
        outline: none;
        background-color: $white-color;
        max-width: 600px;
        margin: 30dvh 20px 0;
        font-size: 1.8rem;
        transition: all 300ms ease;

        &:hover {
          border: 1px solid $main-color;
        }
      }

      .search-modal {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 3;
        width: 100vw;
        height: 100dvh;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        transition: all 300ms ease;
      }

      .recommended-products-list {
        padding: 10px;
        height: max-content;
        border-radius: 5px;
        background-color: $white-color;
        width: 100%;
        max-width: 600px;
        height: max-content;
        max-height: 400px;
        margin: 5px 20px 0;
        overflow-y: auto;
        transition: all 300ms ease;
        @include scrollbar;
        
        .no-btn {
          color: $black-color;
          width: 100%;
          justify-content: flex-start;
          padding: 0 10px;
          border-radius: 5px;
          transition: all 300ms ease;
          font-size: 1.8rem;

          &:hover {
            background-color: $gray-color;
          }
        }
      }
    }

    .item {
      display: grid;
      grid-template-columns: 20px 32px 1fr 70px;
      align-items: center;
      gap: 10px;
      padding: 0 10px;
      border: 1px solid $gray-color;
      border-radius: 5px;
      height: 40px;
      min-height: 40px;
    }

    .add-item-btn {
      margin-bottom: 10px;

      &:hover {
        color: $black-color;
      }
    }

    &__bottom {
      width: 100%;
      height: max-content;
      display: flex;
      flex-direction: column;
      gap: 10px;

      .items-total {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        font-size: 1.8rem;
        
      }
    }

    &__buttons {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      width: 100%;
      gap: 10px;
    }
  }
</style>