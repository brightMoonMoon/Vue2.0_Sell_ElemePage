<template>
    <div class="seller" ref="seller">
        <div class="seller-content">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc">
                    <v-star :size="36" :score="seller.score"></v-star>
                    <span class="text">({{seller.ratingCount}})</span>
                    <span class="text">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <span class="stress">{{seller.minPrice}}</span>
                        </div>
                    </li>
                    <li class="block">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryPrice}}</span>
                        </div>
                    </li>
                    <li class="block">
                        <h2>平均配送时间</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>
                </ul>
                <div class="favorite" @click="toggleFavorite">
                    <i class="iconfont icon-xin" :class="{'active':favorite}"></i>
                    <span class="text">{{favoriteText}}</span>
                </div>
            </div>
            <v-split></v-split>
            <div class="bulletin">
                <h1 class="title">公告与活动</h1>
                <div class="content-wrapper">
                    <p class="content">{{seller.bulletin}}</p>
                </div>
                <div v-if="seller.supports" class="supports">
                    <li class="support-item" v-for="(itemi,index) in seller.supports" :key="index">
                        <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                        <span class="text">{{seller.supports[index].description}}</span>
                    </li>
                </div>
            </div>
            <v-split></v-split>
            <div class="pics">
                <h1 class="title">商家实景</h1>
                <div class="pic-wrapper" ref="picWrapper">
                    <ul class="pic-list" ref="picList">
                        <li class="pic-item" v-for="(pic,index) in seller.pics" :key="index">
                            <img :src="pic" width="120px" height="90px">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import star from '@/components/star/star';
import split from '@/components/split/split';
import BScroll from 'better-scroll';
// import { saveToLocal, loadFromLocal } from '../../common/js/store';
export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
            favorite: (() => {
                return this.loadFromLocal(this.seller.id, 'favorite', false);
            })()
        }
    },
    watch: {
        seller() {
            this._initScroll();
            //因为这个组件中的全部数据都是靠seller撑开的，所以seller的获取是异步的 
            this._initPics();
        }
    },
    mounted() {
        this._initScroll();
        this._initPics();
    },
    computed: {
        favoriteText() {
            return this.favorite ? '收藏' : '未收藏'
        }
    },
    methods: {
        _initScroll() {
            // if (!this.scroll) {
            //     this.scroll = new BScroll(this.$refs.seller, {
            //         click: true
            //     });
            // }
            // else {
            //     this.scroll.refresh();
            // }
            this.$nextTick(() => {
                if (!this.scroll) {
                    console.log(this.seller);
                    this.scroll = new BScroll(this.$refs.seller, {
                        click: true
                    });
                }
                else {
                    this.scroll.refresh()
                }

            });

        },
        _initPics() {
            if (this.seller.pics) {
                let picWidth = 120;
                let margin = 6;
                let width = (picWidth + margin) * this.seller.pics.length - margin;
                this.$refs.picList.style.width = width + 'px';
                this.$nextTick(() => {
                    if (!this.picScroll) {
                        this.picScroll = new BScroll(this.$refs.picWrapper, {
                            scrollX: true,
                            eventPassthrough: 'vertical'
                        });
                    } else {
                        this.picScroll.refresh();
                    }
                });
            }
        },
        toggleFavorite() {
            this.favorite = !this.favorite;
            this.saveToLocal(this.seller.id, 'favorite', this.favorite);


        },
        saveToLocal(id, key, value) {
            let seller = window.localStorage.__seller__;
            if (!seller) {
                seller = {};
                seller[id] = {};
            } else {
                seller = JSON.parse(seller);
                if (!seller[id]) {
                    seller[id] = {};
                }
            }
            seller[id][key] = value;
            window.localStorage.__seller__ = JSON.stringify(seller);
        },
        loadFromLocal(id, key, def) {
            let seller = window.localStorage.__seller__;
            if (!seller) {
                return def;
            }
            seller = JSON.parse(seller)[id];
            if (!seller) {
                return def;
            }
            let ret = seller[key];
            return ret || def;
        }
    },
    components: {
        'v-star': star,
        'v-split': split
    }
}
</script>


<style lang='scss' scoped>
@import '../../common/sass/index.scss';
.seller {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview {
        padding: 18px;
        .title {
            margin-bottom: 8px;
            line-height: 14px;
            color: rgb(7, 17, 27);
            font-size: 14px;
        }
        .desc {
            padding-bottom: 18px;
            @include border-1px(rgba(7, 17, 27, 0.1));
            font-size: 0;
            .star {
                display: inline-block;
                margin-right: 8px;
                vertical-align: top;
            }
            .text {
                display: inline-block;
                margin-right: 12px;
                line-height: 18px;
                vertical-align: top;
                font-size: 10px;
            }
        }
        .remark {
            display: flex;
            padding-top: 18px;
            .block {
                flex: 1;
                text-align: center;
                border-right: 1px solid rgba(7, 17, 27, 0.1);
                &:last-child {
                    border: none;
                }
                h2 {
                    margin-bottom: 4px;
                    line-height: 10px;
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                }
                .content {
                    line-height: 24px;
                    font-size: 10px;
                    color: rgb(7, 17, 27);
                    .stress {
                        font-size: 24px;
                    }
                }
            }
        }
        .favorite {
            position: absolute;
            right: 11px;
            top: 18px;
            text-align: center;

            .icon-xin {
                display: block;
                margin-bottom: 4px;
                line-height: 24px;
                font-size: 24px;
                width: 50px;
                color: #d4d6d9;
                &.active {
                    color: rgb(240, 20, 20);
                }
            }
            .text {
                line-height: 10px;
                font-size: 10px;
                color: rgb(77, 85, 93);
            }
        }
    }
    .bulletin {
        padding: 18px 18px 0 18px;
        .title {
            margin-bottom: 8px;
            line-height: 14px;
            color: rgb(7, 17, 27);
            font-size: 14px;
        }
        .content-wrapper {
            padding: 0 12px 16px 12px;
            @include border-1px(rgba(7, 17, 27, 0.10));
            .content {
                line-height: 24px;
                font-size: 12px;
                color: rgb(240, 20, 20);
            }
        }
        .supports {
            .support-item {
                padding: 16px 12px;
                @include border-1px(rgba(7, 17, 27, 0.1));
                font-size: 0;
                &:last-child {
                    @include border-none();
                }
                .icon {
                    display: inline-block;
                    width: 16px;
                    vertical-align: top;
                    height: 16px;
                    margin-right: 6px;
                    background-size: 16px 16px;
                    background-repeat: no-repeat;
                    &.decrease {
                        @include bg-image('decrease_4');
                    }
                    &.discount {
                        @include bg-image('discount_4');
                    }
                    &.guarantee {
                        @include bg-image('guarantee_4');
                    }
                    &.invoice {
                        @include bg-image('guarantee_4')
                    }
                    &.special {
                        @include bg-image('special_4')
                    }
                }
                .text {
                    line-height: 16px;
                    font-size: 12px;
                    color: rgb(7, 17, 27);
                }
            }
        }
    }
    .pics {
        padding: 18px;
        .title {
            margin-bottom: 12px;
            line-height: 14px;
            color: rgb(7, 17, 27);
            font-size: 14px;
        }
        .pic-wrapper {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            .pic-list {
                font-size: 0;
                .pic-item {
                    display: inline-block;
                    margin-right: 6px;
                    width: 120px;
                    height: 90px;
                    &:last-child {
                        margin: 0;
                    }
                }
            }
        }
    }
}
</style>