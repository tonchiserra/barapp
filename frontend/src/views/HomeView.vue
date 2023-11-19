<script lang="ts" setup>
  import DeskCard from '../components/DeskCard.vue'
</script>

<template>
  <div class="page-width home-container">
    <DeskCard />
    <DeskCard />
    <DeskCard />
    <DeskCard />
    <DeskCard />
  </div>
</template>

<style lang="scss" scoped>
  .home-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
</style>