<script setup lang="ts">
    import { LineItem } from '@shared/types/LineItem'
    import { Desk } from '@shared/types/Desk'
    import IconTrash from '../assets/IconTrash.vue'
    
    const props = defineProps<{ lineItem: LineItem, desk: Desk }>()
</script>

<template>
    <div class="item">
        <img src="" class="item__logo">
        <button class="remove-btn no-btn"><IconTrash /></button>
        <p class="item__quantity" v-if="!!props.lineItem.quantity">{{ props.lineItem.quantity }} x</p>
        <p class="item__name" v-if="!!props.lineItem.product?.name">{{ props.lineItem.product.name }}</p>
        <p class="item__price" v-if="!!props.lineItem.product?.price">${{ props.lineItem.product.price }}</p>
    </div>
</template>

<style scoped lang="scss">
    @import '../styles/variables.scss';

    .item {
        &:hover {
            .item__logo {
                display: none;
            }

            .remove-btn {
                display: block;
            }
        }

        &__logo {
            width: 20px;
            height: 20px;
        }

        .remove-btn {
            display: none;
            width: 20px;
            height: 20px;
            color: $black-color;

            &:hover {
                color: $second-color;
            }

            svg {
                width: 100%;
                height: 100%;

                &:hover {
                    color: $second-color;
                }
            }
        }

        &__name {
            width: 100%;
            overflow: hidden;
            text-wrap: nowrap;
            text-overflow: ellipsis;
        }

        &__price {
            width: 100%;
            text-wrap: nowrap;
            text-align: right;
        }
    }
</style>