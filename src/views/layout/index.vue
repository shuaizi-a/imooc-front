<template>
  <div class="h-screen">
    <!-- 需要在 tailwind 中定义 h-header 高度 -->
    <header-vue class="h-header" v-if="!isMobileTerminal"></header-vue>
    <div class="h-main">
      <main-vue></main-vue>
    </div>
    <floating-vue></floating-vue>
  </div>
</template>

<script setup>
import headerVue from './components/header/index.vue'
import mainVue from './components/main.vue'
import floatingVue from './components/floating/index.vue'
import {} from 'vue'
import { isMobileTerminal } from '@/utils/flexible'
</script>
