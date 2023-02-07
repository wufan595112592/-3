<script setup>
import {ref} from 'vue'
import { RouterView } from 'vue-router'
import Header from '@/components/Header/index.vue'

const title = ref('小米科技有限责任公司')


</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->
  <Header :title="title" />
  <RouterView />
</template>


<style scoped>

</style>
