<template>
  <!-- 一级路由出口 -->
  <div class="h-screen fixed top-0 left-0 w-screen">
    <m-transition-router-view mainComponentName="home" :routerType="$store.getters.routerType"></m-transition-router-view>
  </div>
</template>
<style lang="scss" scoped></style>
