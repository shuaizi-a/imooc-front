<template>
  <mobile-navigation-vue v-if="isMobileTerminal"  />
  <pc-navigation-vue v-else :data="categoryData" />
</template>

<script setup>
import { isMobileTerminal } from "@/utils/flexible";
import mobileNavigationVue from "./mobile/index.vue";
import pcNavigationVue from "./pc/index.vue";
import { getCategory } from "@/api/category";
import { ref } from "vue";
import { ALL_CATEGORY_ITEM } from "@/constants/index";
import { useStore } from "vuex";

const categoryData = ref([]);

const store = useStore();
// 触发 category 数据获取动作
store.dispatch("category/useCategoryData");
</script>
