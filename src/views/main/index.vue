<template>
  <div
    ref="containerTarget"
    class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
  >
    <navigation-vue></navigation-vue>

    <!-- list瀑布流布局 -->
    <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
      <list-vue></list-vue>
    </div>

    <!-- 页面切换 -->
    <m-trigger-menu v-if="isMobileTerminal" class="fixed bottom-6 m-auto left-0 right-0 w-[220px]">
      <m-trigger-menu-item icon="home" iconClass="fill-zinc-900 dark:fill-zinc-200"> 首页 </m-trigger-menu-item>
      <m-trigger-menu-item
        @click="onVipClick"
        v-if="$store.getters.token"
        icon="vip"
        iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500"
      >
        VIP
      </m-trigger-menu-item>
      <m-trigger-menu-item @click="onMyClick" icon="profile" iconClass="fill-zinc-400 dark:fill-zinc-500" textClass="text-zinc-400 dark:text-zinc-500">
        {{ $store.getters.token ? '我的' : '去登录' }}
      </m-trigger-menu-item>
    </m-trigger-menu>
  </div>
</template>

<script>
export default {
  name: 'home',
}
</script>

<script setup>
import { ref, onActivated } from 'vue'
import { isMobileTerminal } from '@/utils/flexible'
import navigationVue from './components/navigation/index.vue'
import listVue from './components/list/index.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useScroll } from '@vueuse/core'

const store = useStore()
const router = useRouter()

/**
 * VIP 按钮点击事件
 */
const onVipClick = () => {
  // 配置跳转方式
  store.commit('app/changeRouterType', 'push')
  router.push('/member')
}
/**
 * 我的按钮点击事件
 */
const onMyClick = () => {
  // 配置跳转方式
  store.commit('app/changeRouterType', 'push')
  if (store.getters.token) {
    router.push('/profile')
  } else {
    router.push('/login')
  }
}

/**
 * 记录页面滚动位置
 */
const containerTarget = ref(null)
const { y: containerTargetScrollY } = useScroll(containerTarget)

// 被缓存的组件再次可见，会回调 onActivated 方法
onActivated(() => {
  if (!containerTarget.value) {
    return
  }
  containerTarget.value.scrollTop = containerTargetScrollY.value
})
</script>
