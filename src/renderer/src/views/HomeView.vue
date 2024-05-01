<script lang="ts" setup>
  import DeskCard from '../components/DeskCard.vue'
  import { state } from '../helpers/AppStore'
</script>

<template>
  <div class="page-width home-container">
    <template v-if="!!state.desks.length">
      <DeskCard :desk v-for="desk in state.desks" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .home-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
</style>