<script lang="ts" setup>
  import CardBadge from './CardBadge.vue'
  import IconPlus from '../assets/IconPlus.vue'
  import { getCurrentInstance, ref } from 'vue';

  const instance = getCurrentInstance()
  const showSearchItem = ref(false)
  const searchItemQuery = ''

  const handleSearchItem = () => {
    showSearchItem.value = !showSearchItem.value

    setTimeout(() => {
      if(!instance?.refs.searchItemInput) return

      (instance.refs.searchItemInput as HTMLElement).focus()
    }, 300)
  }
</script>

<template>
  <div class="desk-card">
    <div class="desk-card__header">
      <input type="text" name="DeskCardTitle" id="DeskCardTitle" value="#1" />
      <CardBadge />
    </div>

    <div class="desk-card__items">
      <div class="item">
        <img src="" alt="" class="item__logo">
        <p class="item__name">2x Medialuna</p>
        <p class="item__price">$ 1250</p>
      </div>

      <!-- if clicked -->
      <input type="text" class="item" v-if="showSearchItem" ref="searchItemInput" v-model="searchItemQuery" @blur="handleSearchItem" />

      <!-- else -->
      <button id="AddItemBtn" class="no-btn" v-else @click="handleSearchItem">
        <IconPlus />
        <span>Agregar</span>
      </button>

    </div>

    <div class="desk-card__bottom">
      <div class="items-total">
        <p>Total</p>
        <p>$ 0</p>
      </div>
      <div class="desk-card__buttons">
        <button id="MarkAsPaidBtn" class="primary">Marcar como pagado</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '../styles/variables.scss';

  .desk-card {
    width: 100%;
    height: 350px;
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
        font-weight: bold;
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

      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        padding: 0 10px;
        border: 1px solid $gray-color;
        border-radius: 5px;
        height: 40px;

        &__logo {
          width: 16px;
          height: 16px;
        }

        &__name {
          flex: 1;
          width: 100%;
          overflow: hidden;
          text-wrap: nowrap;
          text-overflow: ellipsis;
        }

        &__price {
          width: max-content;
          text-wrap: nowrap;
        }
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
    }
  }
</style>