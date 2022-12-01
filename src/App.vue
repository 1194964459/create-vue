<script setup lang="ts">
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'

import HelloWorld from './components/HelloWorld.vue'
import AntdMenu from './antd/menu/index.vue'

// import AntdTree from './antd/tree/index_originDom.vue'
import AntdTree from './antd/tree/index_style.vue'
const router = useRouter()

const goToUser = ()=>{
  router.push({ name: 'user', params: { username: 'eduardo' } })
}

</script>

<template>
    <div id="nav">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <!-- <RouterLink to="/brazil">Brazil</RouterLink> -->
        <div @click="goToUser">goToUser</div>
    </div>

    <div class="container">
      <RouterView />
    </div>
</template>

<style lang="scss" scoped>
#nav{
  a, div{
    width: 100px;
    display: inline-block;
  }
}
.container{
  min-width: 960px;
  margin-top: 20px;
  background: #e0e0e0;
  min-height: 200px;
}
</style>

