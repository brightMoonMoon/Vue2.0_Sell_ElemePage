<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease" v-show="food.count  > 0" @click.stop.prevent="decreaseCart">
                <transition>
                    <i class="iconfont icon-jianhao"></i>
                </transition>
            </div>
        </transition>
        <div class="cart-count " v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add iconfont icon-jiahao" @click.stop.prevent="addCart($event)"></div>

    </div>
</template>


<script>
export default {
    props: {
        food: {
            type: Object,
        }
    },
    methods: {
        addCart(event) {
            if (!this.food.count) {
                this.$set(this.food, 'count', 1);
            }
            else {
                this.food.count++;
            }
            this.$root.$emit('cart-add', event.target)
        },
        decreaseCart() {
            if (this.food.count) {
                this.food.count--;
            }
        },
    }
}
</script>


<style lang='scss' scoped>
.cartcontrol {
    display: inline-block;
    font-size: 0; // 为了去掉相邻两元素的空格,学习了
    .cart-decrease,
    .cart-count,
    .cart-add {
        display: inline-block;
    }
    .cart-decrease {
        display: inline-block;
        &.move-enter-active,
        &.move-leave-active {
            transition: all 0.5s linear;
            transform: translate3d(0, 0, 0);
        }
        &.move-enter,
        &.move-leave-to {
            opacity: 0;
            transform: translate3d(33px, 0, 0);
            .icon-jianhao {
                transform: rotate(180deg);
            }
        }
        .icon-jianhao {
            display: inline-block;
            line-height: 24px;
            font-size: 24px;
            color: rgb(0, 160, 220);
            transition: all 0.5s linear;
            transform: rotate(0);
        }
    }
    .cart-count {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        padding-top: 6px;
        line-height: 24px;
        text-align: center;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }
    .cart-add {
        display: inline-block;
        padding: 6px;
        line-height: 24px;
        font-size: 24px;
        &.icon-jiahao {
            color: rgb(0, 160, 220);
        }
    }
}
</style>