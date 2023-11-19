<script lang="ts" setup>
  import CardBadge from './CardBadge.vue'
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
        <p class="item__name"></p>
        <p class="item__price"></p>
      </div>

      <div class="items-total">
        <p>Total</p>
        <p>$ 0</p>
      </div>
    </div>

    <div class="desk-card__buttons">

    </div>
  </div>
</template>

<style lang="scss" scoped>
  .desk-card {
    width: 100%;
    height: 350px;
    background-color: #fff;
    border-radius: 5px;
    padding: 10px;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      input {
        font-size: 1.6rem;
        font-weight: bold;
      }
    }
  }
</style>