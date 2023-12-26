<template>
  <div class="bg-white sticky top-0 left-0 z-10 dark:bg-zinc-900">
    <ul ref="ulTarget" class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden">
      <!-- 汉堡按钮 -->
      <li
        class="z-20 fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white shadow-l-white dark:bg-zinc-900 dark:shadow-l-zinc"
        @click="isOpenPopup = !isOpenPopup"
      >
        <m-svg-icon class="w-1.5 h-1.5" name="hamburger"></m-svg-icon>
      </li>
      <!-- 滑块 -->
      <li ref="sliderTarget" class="absolute h-[22px] bg-zinc-900 rounded-lg duration-200 dark:bg-zinc-800" :style="sliderStyle"></li>
      <!-- category item -->
      <li
        v-for="(item, index) in $store.getters.categorys"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-3"
        :class="{
          'text-zinc-100 ': $store.getters.currentCategoryIndex === index,
        }"
        :ref="setItemRef"
        @click="onItemClick(item)"
      >
        {{ item.name }}
      </li>
    </ul>

    <m-popup v-model="isOpenPopup">
      <menu-vue :categorys="$store.getters.categorys" @onItemClick="onItemClick"></menu-vue>
    </m-popup>
  </div>
</template>

<script setup>
import { ref, onBeforeUpdate, watch } from 'vue'
import { useScroll } from '@vueuse/core'
import { useStore } from 'vuex'
import menuVue from '../../menu/index.vue'

const store = useStore()
defineProps({})

// 滑块
const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '52px',
})

// popup 展示
const isOpenPopup = ref(false)

// 选中的 item 下标
const currentCategoryIndex = ref(0)
// 获取填充的所有 item 元素
let itemRefs = []
const setItemRef = (el) => {
  if (el) {
    itemRefs.push(el)
  }
}

onBeforeUpdate(() => {
  itemRefs = []
})

// 获取 ul 元素，以计算偏移位置
const ulTarget = ref(null)
const { x: ulScrollLeft } = useScroll(ulTarget)
// 4.watch 监听
watch(
  () => store.getters.currentCategoryIndex,
  (value) => {
    const { left, width } = itemRefs[value].getBoundingClientRect()
    // 这里可以用 getComputedStyle 获取ul的padding
    let ulPadding = getComputedStyle(ulTarget.value, null).padding.slice(0, -2) // 这里因为这种方法获取的是 8px 这个带有px的字符串
    ulPadding = parseInt(ulPadding)
    sliderStyle.value = {
      // 滑块位置 = ul横向滚动的位置 + 当前元素相对于视口的left - ul的padding
      transform: `translateX(${ulScrollLeft.value + left - ulPadding}px)`,
      width: width + 'px',
    }
    console.log(ulTarget.value.scrollLeft)
    /**
     * 在弹出框打开时，说明这是由点击弹出框菜单触发的tab切换
     * 1.关闭弹出框
     * 2.在navigation点击较为靠后的菜单item时，需要让顶上的tab滚动相应的距离，
     *  不然就会让滑块看不见了（点击navigation显示以外的目录，滚动条不会自动滚到那里）
     */
    if (isOpenPopup.value) {
      isOpenPopup.value = false
      ulTarget.value.scrollLeft = left + ulTarget.value.scrollLeft
    }
  }
)

// item 点击事件
const onItemClick = (item) => {
  store.commit('app/changeCurrentCategory', item)
}
</script>
