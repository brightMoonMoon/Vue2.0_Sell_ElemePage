 <template>
    <div class="header">
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%" alt="">
        </div>
        <div class="content-wrapper">
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar" alt="avatar">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="support" @click="showDetail">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="support-count">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="iconfont icon-arrow-right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper" @click="showDetail">
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="iconfont icon-arrow-right"></i>
        </div>
        <transition name="fade">
            <div class="detail" v-show="detailShow" transition="fade">
                <div class="detail-wraper cleafix">
                    <div class="detail-main clearfix">
                        <h1 class="name">{{seller.name}}</h1>
                        <div class="star-wraper">
                            <v-star :size="48" :score="seller.score"></v-star>
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <div v-if="seller.supports" class="supports">
                            <li class="support-item" v-for="(itemi,index) in seller.supports" :key="index">
                                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                                <span class="text">{{seller.supports[index].description}}</span>
                            </li>
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="bulletin">
                            <div class="content">
                                {{seller.bulletin}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="detail-close" @click="hideDetail">
                    X
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import star from '@/components/star/star'
export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            detailShow: false
        }
    },
    components: {
        'v-star': star
    },
    methods: {
        showDetail() {
            this.detailShow = true;
        },
        hideDetail() {
            this.detailShow = false;
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
}
</script>


<style lang='scss' scoped>
@import '../../common/sass/mixin';
.header {
    color: #fff;
    position: relative;
    overflow: hidden;
    background: rgba(7, 17, 27, 0.5);
    .content-wrapper {
        padding: 24px 12px 18px 24px;
        font-size: 0;
        position: relative;
        .avatar {
            display: inline-block;
            vertical-align: top;
            img {
                border-radius: 2px;
            }
        }
        .content {
            display: inline-block;
            margin-left: 16px;
            font-size: 14px;
            .title {
                margin: 2px 0 8px 0;
                .brand {
                    width: 30px;
                    height: 18px;
                    display: inline-block;
                    @include bg-image('brand');
                    background-size: 30px 18px;
                }
                .name {
                    margin-left: 6px;
                    font-size: 16px;
                    line-height: 18px;
                    font-weight: bolder;
                    vertical-align: top;
                }
            }
            .description {
                margin-bottom: 10px;
                line-height: 12px;
                font-size: 12px;
            }
            .support {
                .icon {
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    margin-right: 4px;
                    background-size: 12px;
                    background-repeat: no-repeat;
                    &.decrease {
                        @include bg-image('decrease_1');
                    }
                    &.discount {
                        @include bg-image('discount_1');
                    }
                    &.guarantee {
                        @include bg-image('guarantee_1');
                    }
                    &.invoice {
                        @include bg-image('guarantee_1')
                    }
                    &.special {
                        @include bg-image('special_1')
                    }
                }
                .text {
                    vertical-align: top;
                    line-height: 12px;
                    font-size: 12px;
                }
            }
        }
        .support-count {
            position: absolute;
            right: 12px;
            bottom: 18px;
            padding: 0 8px;
            height: 24px;
            line-height: 24px;
            border-radius: 14px;
            text-align: center;
            background: rgba(0, 0, 0, 0.2);
            .count {
                display: inline-block;
                font-size: 10px;
                font-weight: 200;
                line-height: 12px;
                color: rgb(255, 255, 255);
                text-align: "center"
            }
            .icon-arrow-right {
                font-size: 10px;
            }
        }
    }
    .bulletin-wrapper {
        background: rgba(7, 17, 27, 0.2);
        position: relative;
        height: 28px;
        line-height: 28px;
        padding: 0 12px 0 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .bulletin-title {
            display: inline-block;
            vertical-align: top;
            margin-top: 8px;
            width: 22px;
            height: 12px;
            @include bg-image('bulletin');
            background-size: 22px 12px;
            background-repeat: no-repeat;
        }
        .bulletin-text {
            vertical-align: top;
            font-size: 10px;
            margin: 0 4px;
        }
        .icon-arrow-right {
            position: absolute;
            font-size: 10px;
            right: 12px;
        }
    }
    .background {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: -1;
        background-color: rgba(7, 17, 27, 0.5);
        filter: blur(10px);
    }
    .detail {
        position: fixed; // fixed是页面脱离视口，党对于窗口来说
        z-index: 22;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background: rgba(7, 17, 27, 0.8);
        &.fade-enter-active,
        &.fade-leave-active {
            transition: all 0.5s;
        }
        &.fade-enter,
        &.fade-leave-to {
            opacity: 0;
        }
    }
    .detail-wraper {
        overflow: hidden;
        width: 100%;
        min-height: 100%; // 这个继承了父元素的高度，所以高度就位这个页面的100%了
        .detail-main {
            margin-top: 64px;
            padding-bottom: 64px;
            .name {
                font-size: 16px;
                font-weight: 700;
                line-height: 16px;
                text-align: center;
            }
            .star-wraper {
                text-align: center;
                margin-top: 18px;
                padding: 2px 0;
            }
            .title {
                display: flex;
                width: 80%;
                margin: 30px auto 24px auto;
                .line {
                    flex: 1;
                    position: relative;
                    top: -6px;
                    border-bottom: 1px solid rgba(255, 55, 255, 0.2)
                }
                .text {
                    font-weight: bolder;
                    padding: 0 12px;
                    font-size: 14px;
                }
            }
            .supports {
                width: 80%;
                margin: 0 auto;
                .support-item {
                    padding: 0 12px;
                    margin-bottom: 12px;
                    font-size: 0;
                    &:last-child {
                        margin-bottom: 0;
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
                            @include bg-image('decrease_2');
                        }
                        &.discount {
                            @include bg-image('discount_2');
                        }
                        &.guarantee {
                            @include bg-image('guarantee_2');
                        }
                        &.invoice {
                            @include bg-image('guarantee_2')
                        }
                        &.special {
                            @include bg-image('special_2')
                        }
                    }
                    .text {
                        line-height: 16px;
                        font-size: 12px;
                    }
                }
            }
            .bulletin {
                width: 80%;
                margin: 0 auto;
                .content {
                    padding: 0 12px;
                    font-size: 12px;
                    line-height: 24px;
                }
            }
        }
    }
    .detail-close {
        position: relative;
        width: 32px;
        height: 32px;
        margin: -64px auto 0 auto;
        clear: both;
        font-size: 32px;
    }
}
</style>
