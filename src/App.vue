<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
    <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Header from '@/components/header/header';
import {urlParse} from './common/js/util.js'
export default {
  data() {
    return {
      seller: {
        id:(()=>{
          let queryParam = urlParse();
          return queryParam.id;
          //查询商家的id值 
        })()
      }
    }
  },
  components: {
    'v-header': Header
  },
  created() {
    this.axios('/api/seller?id='+this.seller.id).then(response => {
      this.seller = response.data.data;
    }).catch(error => {
      alert('数据请求失败')
    })
  }
}
</script>

<style lang="scss" scoped>
@import "./common/sass/index";
// 解决1px像素的问题
#app {
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    @include border-1px(rgba(7, 17, 27, 0.1));
    .tab-item {
      flex: 1;
      text-align: center;
      &>a {
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);
        &.active {
          color: rgb(240, 20, 20)
        }
      }
    }
  }
}
</style>
