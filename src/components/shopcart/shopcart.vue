<template>
    <div class="shopcart">
        <div class="content" @click="toggleList">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{highLight:totalCount>0}">
                        <i class="iconfont icon-gouwuche-copy"></i>
                    </div>
                    <div class="num">{{totalCount}}</div>
                </div>
                <div class="price" :class="{highLight:totalCount>0}">￥{{totalPrice}}</div>
                <div class="desc">
                    另需配送费￥{{deliveryPrice}}元
                </div>
            </div>
            <div class="content-right" @click.stop.prevent="pay">
                <div class="pay" :class="payClass">
                    <!-- 在这里绑定返回对象的计算属性 -->
                    {{payDesc}}
                </div>
            </div>
        </div>
        <div class="ball-container">
            <transition-group name="drop" @beforeEnter="beforeEnter" @enter="enter" @after-enter="afterEnter">
                <div v-for="(ball,index) in balls" :key="index" v-show="ball.show" class="ball">
                    <div class="inner inner-hook"></div>
                </div>
            </transition-group>
        </div>
        <transition name="fold">
            <div class="shopcart-list" v-show="listShow">
                <div>
                    <div class="list-header">
                        <h1 class="title">购物车</h1>
                        <span class="empty" @click="empty">清空</span>
                    </div>
                    <div class="list-content" ref="listContent">
                        <ul>
                            <li class="food" v-for="(food,index) in selectFoods" :key="index">
                                <span class="name">{{food.name}}</span>
                                <div class="price">
                                    <span>￥{{food.price*food.count}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <v-cartcontrol :food="food"></v-cartcontrol>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </transition>
        <transition name="fade-backdrop">
            <div class="backdrop" v-show="showBackdrop" @click="hideBackdrop"></div>
        </transition>
    </div>
</template>


<script>
import cartcontrol from '@/components/cartcontrol/cartcontrol';
import BScroll from 'better-scroll';
export default {
    props: {
        selectFoods: {
            type: Array,
            default() {
                return [
                    {
                        price: 10,
                        count: 1
                    }
                ];
            }
        },
        deliveryPrice: {
            type: Number
        },
        minPrice: {
            type: Number
        }
    },
    data() {
        return {
            balls: [
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                }
            ],
            // 可视区最多五个food列表
            dropBalls: [],
            // 记录已经下落的小球
            fold: false,
        };
    },
    created() {
        this.$nextTick(() => {
            this.$root.$on('cart-add', this.drop)
            // 放在回调里面执行，这样就可以在连续两个动作的时候，让其异步执行
        })
    },
    computed: {
        totalPrice() {
            let total = 0;
            this.selectFoods.forEach(item => {
                total += item.price * item.count;
            })
            return total;
        },
        totalCount() {
            let count = 0;
            this.selectFoods.forEach(item => {
                count += item.count;
            })
            return count;
        },
        payDesc() {
            if (this.totalPrice === 0) {
                return `￥${this.minPrice}起送`;
            }
            else if (this.totalPrice < this.minPrice) {
                return `还差￥${this.minPrice - this.totalPrice}起送`;
            }
            else {
                return `去结算`
            }
        },
        payClass() {
            if (this.totalPrice < this.minPrice) {
                return 'not-enough'
            }
            else {
                return 'enough';
            }
        },
        // 用来控制listShow购物车的显隐
        listShow() {
            if (!this.totalCount) {
                this.fold = true;
                return false;
            }
            let show = !this.fold;
            if (show) {
                // 如果为真那么就开始计算高度
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.listContent, {
                            click: true
                        })
                    }
                    else {
                        this.scroll.refresh();
                    }

                })
            }
            return show;
        },
        showBackdrop() {
            if (this.listShow && this.totalPrice) {
                return true;
            }
            return false
        }
    },
    methods: {
        drop(el) {
            // 这个el是将food列表中的加号的元素添加到ball数组中去
            for (let i = 0; i < this.balls.length; i++) {
                let ball = this.balls[i];
                if (!ball.show) {
                    ball.show = true;
                    //触发一个动画
                    ball.el = el;
                    // 塞进的是同一个div ,也就是说获取的是同一个div的值
                    this.dropBalls.push(ball);
                    return;
                }
            }
        },
        beforeEnter(el) {
            // beforeEnter相当图enter-to
            let count = this.balls.length;
            // 求出false的长度
            while (count--) {
                let ball = this.balls[count];
                if (ball.show) {
                    let rect = ball.el.getBoundingClientRect();
                    let x = rect.left - 32;
                    let y = -(window.innerHeight - rect.top - 22);
                    // 计算出加号到小球的位置
                    el.style.display = 'block';
                    // 将小球的位置设置显示
                    el.style.webkitTransform = 'translate3d(0,${y}px,0)';
                    el.style.transform = `translate3d(0,${y}px,0)`;
                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                    inner.style.transform = `translate3d(${x}px,0,0)`;
                }
            }
        },
        enter(el) {
            let rf = el.offsetHeight; //强制重绘
            this.$nextTick(() => {
                el.style.webkitTransform = 'translate3d(0,0,0)';
                el.style.transform = 'translate3d(0,0,0)';
                let inner = el.getElementsByClassName('inner-hook')[0];
                inner.style.webkitTransform = 'translate3d(0,0,0)';
                inner.style.transform = 'translate3d(0,0,0)';
            });
        },
        afterEnter(el) {
            // 相当于ernter-to之后的钩子
            let ball = this.dropBalls.shift();
            //把这个元素再推出去
            if (ball) {
                ball.show = false;
                el.style.display = 'none';
            }
        },
        toggleList() {
            if (!this.totalCount) {
                return;
            }
            this.fold = !this.fold;
        },
        empty() {
            this.selectFoods.forEach((food) => {
                food.count = 0;
            });
        },
        hideBackdrop() {
            this.fold = true;
        },
        pay() {
            if (this.totalPrice < this.minPrice) {
                return;
            }
            else {
                alert('你需要支付￥' + this.totalPrice);
            }
        },
        components: {
            'v-cartcontrol': cartcontrol
        }
    },
    components:{
        'v-cartcontrol':cartcontrol
    }
}
</script>


<style lang='scss' scoped>
@import "../../common/sass/index.scss";
.shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 9;
    width: 100%;
    height: 48px;
    .content {
        display: flex;
        background: #141d27;
        .content-left {
            flex: 1;
            .logo-wrapper {
                display: inline-block;
                position: relative;
                top: -10px;
                margin: 0 12px;
                padding: 6px;
                width: 56px;
                height: 56px;
                box-sizing: border-box;
                vertical-align: center;
                border-radius: 50%;
                background: #141d27;
                .logo {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background: #2b343c;
                    text-align: center;
                    .icon-gouwuche-copy {
                        line-height: 44px;
                        font-size: 24px;
                        color: #80858a;
                    }
                    &.highLight {
                        background: rgb(0, 160, 220);
                        .icon-gouwuche-copy {
                            color: white;
                        }
                    }
                }
                .num {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 24px;
                    height: 16px;
                    line-height: 16px;
                    text-align: center;
                    border-radius: 16px;
                    font-weight: 700;
                    color: white;
                    background: rgb(240, 20, 20);
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
                }
            }
            .price {
                display: inline-block;
                vertical-align: top;
                margin-top: 12px;
                line-height: 24px;
                padding-right: 12px;
                box-sizing: border-box;
                border-right: 1px solid rgba( 255, 255, 255, 0.1);
                font-size: 16px;
                font-weight: 700;
                color: rgba( 255, 255, 255, 0.4);
                &.highLight {
                    color: white;
                }
            }
            .desc {
                display: inline-block;
                vertical-align: top;
                line-height: 24px;
                margin: 12px 0 0 12px;
                font-size: 10px;
                color: rgba( 255, 255, 255, 0.4);
            }
        }
        .content-right {
            flex: 0 0 105px;
            .pay {
                height: 48px;
                line-height: 48px;
                text-align: center;
                font-size: 12px;
                font-weight: 700;
                color: rgba( 255, 255, 255, 0.4);
                background: #2b333b;
                &.not-enough {
                    background: #2b333b;
                }
                &.enough {
                    background: #00b43c;
                    color: white;
                }
            }
        }
    }
    .ball-container {
        .ball {
            position: fixed;
            left: 32px;
            bottom: 22px;
            z-index: 200;
            &.drop-enter-active {
                transition: all 0.5s cubic-bezier(0.49, -0.29, 0.75, 0.41);
            }
            .inner {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: rgb(0, 160, 220);
                transition: all 0.5s linear;
            }
        }
    }
    .shopcart-list {
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
        width: 100%;
        transform: translate3d(0, -100%, 0);
        &.fold-enter-active,
        &.fold-leave-active {
            transition: all 0.5s;
        }
        &.fold-enter,
        &.fold-leave-to {
            transform: translate3d(0, 0, 0);
        }
        .list-header {
            height: 40px;
            line-height: 40px;
            padding: 0 18px;
            background: #f3f5f7;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            .title {
                float: left;
                font-size: 14px;
                color: rgb(7, 17, 27);
            }
            .empty {
                float: right;
                font-size: 12px;
                color: rgb(0, 160, 220);
            }
        }
        .list-content {
            padding: 0 18px;
            max-height: 217px;
            overflow: hidden;
            background: #fff;
            .food {
                position: relative;
                padding: 12px 0;
                box-sizing: border-box;
                @include border-1px(rgba(7, 17, 27, 0.1));
                .name {
                    line-height: 24px;
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                }
                .price {
                    position: absolute;
                    right: 90px;
                    bottom: 12px;
                    line-height: 24px;
                    font-size: 14px;
                    font-weight: 700;
                    color: rgb(240, 20, 20);
                }
                .cartcontrol-wrapper {
                    position: absolute;
                    right: 0;
                    bottom: 6px;
                }
            }
        }
    }
    .backdrop {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(7, 17, 27, 0.6);
        backdrop-filter: blur(10px);
        z-index: -2;
        &.fade-backdrop-enter-active,
        &.fade-backdrop-leave-active {
            transition: opacity 0.5s;
        }

        &.fade-backdrop-enter,
        &.fade-backdrop-leave-active {
            opacity: 0;
        }
    }
}
</style>