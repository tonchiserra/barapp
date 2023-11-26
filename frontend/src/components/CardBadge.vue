<template>
  <div class="badge no-paid">
    <p>No pagado</p>
  </div>
</template>

<style lang="scss" scoped>
  @import '../styles/variables.scss';

  .badge {
    width: 100%;
    max-width: max-content;
    padding: 5px 10px;
    color: #fff;
    border-radius: 5px 5px 0 5px;
    transform: translateX(20px);
    position: relative;
    font-size: 1.4rem;

    &::before {
      content: '';
      width: 0; 
      height: 0;
      border-right: 10px solid transparent;
      position: absolute;
      bottom: -10px;
      right: 0;
      filter: brightness(.6);
    }

    &.no-paid {
      background-color: $second-color;

      &::before {
        border-top: 10px solid $second-color; 
      }
    }

    &.paid {
      background-color: $main-color;

      &::before {
        border-top: 10px solid $main-color; 
      }
    }

    &.closed {
      background-color: $border-color;

      &::before {
        border-top: 10px solid $border-color; 
      }
    }
  }
</style>