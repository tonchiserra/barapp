<script setup lang="ts">
import { computed } from 'vue';

  const props = defineProps<{ state: string }>()

  const state = computed(() => {
    switch (props.state) {
      case 'no-paid':
        return 'No pagado'
      case 'paid':
        return 'Pagado'
      case 'closed':
        return 'Cerrada'
      default:
        return 'Libre'
    }
  
  })
</script>

<template>
  <div class="badge" :class="props.state" v-if="props.state !== 'blank'">
    <p>{{ state }}</p>
  </div>
</template>

<style lang="scss" scoped>
  @import '../styles/variables.scss';

  .badge {
    width: 100%;
    max-width: max-content;
    height: 28px;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    color: #fff;
    transform: translateX(20px);
    position: relative;
    font-size: 1.4rem;
    transition: all 300ms ease;

    &::before {
      content: '';
      width: 0; 
      height: 0;
      border-right: 10px solid transparent;
      position: absolute;
      bottom: -10px;
      right: 0;
      filter: brightness(.6);
      transition: all 300ms ease;
    }

    &::after {
      content: '';
      width: 0;
      height: 0;
      border-left: 14px solid transparent;
      position: absolute;
      bottom: 0;
      left: -14px;
      background-color: transparent;
      transition: all 300ms ease;
    }

    &.no-paid {
      background-color: $second-color;

      &::before {
        border-top: 10px solid $second-color; 
      }

      &::after {
        border-top: 14px solid $second-color;
        border-bottom: 14px solid $second-color;
      }
    }

    &.paid {
      background-color: $main-color;

      &::before {
        border-top: 10px solid $main-color; 
      }

      &::after {
        border-top: 12px solid $main-color;
        border-bottom: 12px solid $main-color;
      }
    }

    &.closed {
      background-color: $border-color;

      &::before {
        border-top: 10px solid $border-color; 
      }

      &::after {
        border-top: 12px solid $border-color;
        border-bottom: 12px solid $border-color;
      }
    }
  }
</style>