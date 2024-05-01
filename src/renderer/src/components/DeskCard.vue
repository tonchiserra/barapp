<script lang="ts" setup>
  import CardBadge from './CardBadge.vue'
  import IconPlus from '../assets/IconPlus.vue'
  import LineItem from './LineItem.vue'
  import { getCurrentInstance, ref, watch } from 'vue'
  import { Desk } from '@shared/types/Desk'
  import { state, methods } from '../helpers/AppStore'

  const props = defineProps<{ desk: Desk }>()

  const instance = getCurrentInstance()
  const showSearchItem = ref(false)
  const searchItemQuery = ref('')
  const recommendedProduct = ref({ id: '', name: '', price: 0 })
  const deskTitle = ref(`#${props.desk.number} ${props.desk.name}`)

  watch(() => props.desk, (newDesk) => {
    deskTitle.value = `#${newDesk.number} ${newDesk.name}`
  })

  const handleSearchItem = () => {
    showSearchItem.value = !showSearchItem.value

    setTimeout(() => {
      if(!instance?.refs.searchItemInput) return

      (instance.refs.searchItemInput as HTMLElement).focus()
    }, 300)
  }

  const searchProduct = (event: KeyboardEvent) => {
    if(event.key === 'Enter') return

    let searchItemQueryHandleized = searchItemQuery.value.replace(/[#0-9\s]/g, '').toLowerCase()
    if(!!!searchItemQueryHandleized) {
      recommendedProduct.value.name = ''
      return
    }

    const product = state.products.find(product => {
      let productNameHandleized = product.name.replace(/[#0-9\s]/g, '').toLowerCase()
      return productNameHandleized.includes(searchItemQueryHandleized)
    })

    if(!!!product) {
      recommendedProduct.value.name = ''
      return
    }

    recommendedProduct.value = { ...product }
  }

  const addProduct = () => {
    if(!!!recommendedProduct.value.name) return
    
    props.desk.lineItems.push({ product: recommendedProduct.value, quantity: 1 })
    let updatedDesk = { id: props.desk.id, lineItems: props.desk.lineItems, state: 'no-paid' }
    methods.saveDesk(updatedDesk)
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
      <form v-if="showSearchItem" @submit.prevent="addProduct">
        <input type="text" class="item" ref="searchItemInput" v-model="searchItemQuery" @blur="handleSearchItem" @keyup="searchProduct" />
        <span>{{ recommendedProduct.name }}</span>
        <button type="submit" class="hidden"></button>
      </form>

      <!-- else -->
      <button id="AddItemBtn" class="add-item-btn no-btn" v-else @click="handleSearchItem">
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
        font-size: 1.6rem;
      }
    }

    &__items {
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      gap: 10px;

      input.item {
        outline: none;

        &:hover {
          border: 1px solid $main-color;
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
    }

    .add-item-btn {
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