<template>
  <div id="app">
    <nav class="navbar">
      <div class="container">
        <h1 class="logo">往生堂市场</h1>
        <div class="cart">
          <span class="cart-count">{{ shopList.length }}</span>
          <i class="fas fa-shopping-cart"></i>
        </div>
      </div>
    </nav>

    <div class="container">
      <div class="product" v-for="product in shopList" :key="product.id">
        <div class="image-container">
          <MyElimage :img="product.img" class="product-image" />
          <div class="image-overlay">
            <button @click="addToCart(product)" class="add-to-cart-button">兑换</button>
          </div>
        </div>
        <div class="product-details">
          <h2 class="product-name">{{ product.name }}</h2>
          <p class="product-description">{{ product.desc }}</p>
          <p class="product-price">价格: ￥{{ product.price }}</p>
        </div>
      </div>
    </div>

    <div class="background-elements">
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
    </div>
  </div>
</template>
<script lang="ts">
export default { name: 'shop' }
</script>
<script setup lang="ts">
import notfound from '@/assets/img/404pagenotfound.png'
import { getShopList } from '@/api/shop'

let shopList = ref([])
let pageInfo = reactive({
  page_no: 1,
  page_size: 10
})
// 获取文章
const getArticle = async () => {
  const { data } = await getShopList(pageInfo)
  if (data.status === 200) {
    shopList.value = data.data.page_list
  } else {
    ElMessage.error(data.message)
  }
}

const addToCart = product => {
  console.log(product)
}
onMounted(() => {
  getArticle()
})
//
</script>
<style lang="less" scoped>
@import url(./styles/shop.less);
</style>
