<template>
    <div class="goods">
        <div class="meau-wraper" ref="meauWraper">
            <ul>
                <li v-for="(item,index) in goods" :key="index" class="meau-item" :class="{'current':currentIndex === index}" @click="selectMeau(index,$event)">
                    <span class="text">
                        <span class="icon" v-show="item.type>0" :class="classMap[item.type]"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wraper" ref="foodsWraper">
            <ul>
                <li  v-for="(item,index) in goods" class="food-list food-list-hook" :key="index">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li @click="clickFood(food,$event)" v-for="(food,index) in item.foods" :key="index" class="food-item ">
                            <div class="icon">
                                <img :src="food.icon" alt="产品图" width="100%">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <v-cartcontrol :food="food"></v-cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <v-shopcart ref="shopcart":select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice">
        </v-shopcart>
        <v-food :food="selectedFood" ref="food"></v-food>
    </div>
</template>
 
<script>
import shopcart from '@/components/shopcart/shopcart';
import cartcontrol from '@/components/cartcontrol/cartcontrol';
import food from '@/components/food/food';
import BScroll from 'better-scroll';
export default {
     props:{
         seller:{
             type:Object
         }
     },
    data() {
        return {
            goods: [],
            listHeight: [],
            scrollY: 0,
            selectedFood:{}
        }
    },
    computed: {
        currentIndex() {
            for (let i = 0; i < this.listHeight.length; i++) {
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i + 1];
                if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                    return i;
                }
            }
            return 0;
        },

        selectFoods() {
            // 传递过去选中的食品对象
            let foods = [];
            this.goods.forEach((good)=>{
                good.foods.forEach((food) =>{
                    if(food.count){
                        // 在shopcart组件中有count属性的food，food详情才会传过去
                        foods.push(food);
                    }
                })
            })
            return foods;
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
        this.axios('/api/goods').then(response => {
            this.goods = response.data.data;
            this.$nextTick(() => {
                this._initScroll();
                this._calculateHeight();
            })
        }).catch(err => {
            console.log('数据请求失败，请检查网络')
        });
    },
    methods: {
        _initScroll() {
            this.meauScroll = new BScroll(this.$refs.meauWraper, {
                click:true,
            });
            this.foodsScroll = new BScroll(this.$refs.foodsWraper, {
                click:true,
                // 这个插件，要想在移动端进行点击，那么就得恢复默认事件。
                probeType: 3
                // 起到一个探针的效果，就是实时的告诉你滚动的位置
            });
            this.foodsScroll.on('scroll', (pos) => {
                this.scrollY = Math.abs(Math.round(pos.y))
                // 监听坐标的位置
            })
        },
        _calculateHeight() {
            let height = 0;
            this.listHeight.push(height);
            let foodList = document.getElementsByClassName('food-list-hook');
            for (let i = 0; i < foodList.length; i++) {
                let item = foodList[i];
                height += item.clientHeight;
                this.listHeight.push(height);
            }
        },
        selectMeau(index,event){
            if(!event._constructed){
                return;
            }
            let foodList = this.$refs.foodsWraper.getElementsByClassName('food-list-hook');
            let el = foodList[index];
            this.foodsScroll.scrollToElement(el,300)
            console.log(this)
            // 滚动到相应的位置，然后滚到响应的位置，然后再变色
        },
        clickFood(obj,event) {
             this.selectedFood = obj;
             this.$refs.food.show();
        }
    },
     components:{
        'v-shopcart':shopcart,
        'v-cartcontrol':cartcontrol,
        'v-food':food
    }
}
</script>


<style lang='scss' scoped>
@import '../../common/sass/index';
.goods {
    display: flex;
    position: absolute;
    top: 176px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    .meau-wraper {
        flex: 0 0 80px;
        width: 80px;
        background: #f3f5f7;
        .meau-item {
            display: table;
            height: 54px;
            width: 56px;
            padding: 0 12px;
            line-height: 14px;
            .icon {
                display: inline-block;
                vertical-align: top;
                width: 12px;
                height: 12px;
                margin-right: 2px;
                background-size: 12px 12px;
                background-repeat: no-repeat;
                &.decrease {
                    @include bg-image('decrease_3')
                }
                &.discount {
                    @include bg-image('discount_3')
                }
                &.guarantee {
                    @include bg-image('guarantee_3')
                }
                &.invoice {
                    @include bg-image('invoice_3')
                }
                &.special {
                    @include bg-image('special_3');
                }
            }
            .text {
                display: table-cell;
                width: 56px;
                vertical-align: middle;
                font-size: 12px;
                @include border-1px(rgba(7, 17, 27, 0.1))
            }
            &.current {
                position: relative;
                z-index: inherit 10;
                margin-top: -1px;
                background: #ffffff;
                font-weight: 700;
                .text {
                    @include border-none();
                }
            }
        }
    }
    .foods-wraper {
        flex: 1;
        .food-list {
            .title {
                padding-left: 14px;
                height: 26px;
                line-height: 26px;
                border-left: 2px solid #d9dde1;
                font-size: 12px;
                color: rgb(147, 153, 159);
                background: #f3f5f7;
            }
            .food-item {
                display: flex;
                margin: 18px;
                padding-bottom: 18px;
                @include border-1px(rgba(7, 17, 27, 0.1));
                &:last-child {
                    @include border-none();
                    margin-bottom: 0;
                }
                .icon {
                    flex: 0 0 57px;
                    margin-right: 10px;
                }
                .content {
                    flex: 1;
                    .name {
                        margin: 2px 0 8px 0;
                        height: 14px;
                        line-height: 14px;
                        color: rgb(7, 17, 27);
                    }
                    .desc,
                    .extra {
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                        line-height: 10px;
                    }
                    .desc {
                        line-height: 12px;
                        margin-bottom: 8px;
                    }
                    .extra {
                        .count {
                            font-size: 10px;
                            margin-right: 12px;
                        }
                    }
                    .price {
                        font-weight: 700;
                        line-height: 24px;
                        .now {
                            margin-right: 8px;
                            font-size: 14px;
                            color: rgb(240, 20, 20);
                        }
                        .old {
                            text-decoration: line-through;
                            font-size: 10px;
                            color: rgb(147, 153, 159);
                        }
                    }
                    .cartcontrol-wrapper{
                        position: absolute;
                        right: 0;
                        bottom:12px;
                    }
                }
            }
        }
    }
}
</style>