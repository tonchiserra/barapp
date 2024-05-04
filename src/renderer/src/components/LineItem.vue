<script setup lang="ts">
    import { ref } from 'vue'
    import { LineItem } from '@shared/types/LineItem'
    import { Desk } from '@shared/types/Desk'
    import IconTrash from '../assets/IconTrash.vue'
    import { methods } from '../helpers/AppStore'
    
    const props = defineProps<{ lineItem: LineItem, desk: Desk }>()

    const lineItemQuantity = ref(props.lineItem.quantity)

    const removeLineItem = () => {
        let updatedLineItems = props.desk.lineItems.filter(lineItem => lineItem.id !== props.lineItem.id)
        let updatedState = updatedLineItems.length > 0 ? 'no-paid' : 'empty'
        let updatedDesk = { id: props.desk.id, lineItems: updatedLineItems, state: updatedState }
        methods.saveDesk(updatedDesk)
    }

    const updateQuantity = () => {
        if(lineItemQuantity.value < 1) lineItemQuantity.value = 1

        let updatedLineItems = props.desk.lineItems.map(lineItem => {
            if(lineItem.id === props.lineItem.id) {
                return { ...lineItem, quantity: lineItemQuantity.value }
            }
            return lineItem
        })

        let updatedDesk = { id: props.desk.id, lineItems: updatedLineItems, state: 'no-paid' }
        methods.saveDesk(updatedDesk)
    }
</script>

<template>
    <div class="item" :class="props.desk.state !== 'closed' ? 'show-trash-on-hover' : ''">
        <img src="" class="item__logo">
        <button class="remove-btn no-btn" @click="removeLineItem()" v-if="props.desk.state !== 'closed'"><IconTrash /></button>
        <div class="item__quantity"><input type="number" :name="lineItem.id" :disabled="props.desk.state === 'closed'" v-model="lineItemQuantity" @blur="updateQuantity()" />x</div>
        <p class="item__name" v-if="!!props.lineItem.product?.name">{{ props.lineItem.product.name }}</p>
        <p class="item__price" v-if="!!props.lineItem.product?.price">${{ props.lineItem.product.price }}</p>
    </div>
</template>

<style scoped lang="scss">
    @import '../styles/variables.scss';

    .item {
        &.show-trash-on-hover:hover {
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

        &__quantity {
            display: flex;
            align-items: center;
            justify-content: flex-end;

            input {
                text-align: right;
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