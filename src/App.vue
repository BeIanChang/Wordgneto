<script setup lang="ts">
import { onMounted, watch } from "vue"; // 引入 Vue 的生命周期钩子和 watch 函数
import { BaseState, useBaseStore } from "@/stores/base.ts"; // 引入基于 pinia 的 store
import { Dict, DictType } from "@/types.ts"; // 引入类型定义
import { useRuntimeStore } from "@/stores/runtime.ts"; // 引入运行时 store
import { useSettingStore } from "@/stores/setting.ts"; // 引入设置 store
import { cloneDeep } from "lodash-es"; // 引入 lodash 库的深拷贝函数
import Backgorund from "@/components/Backgorund.vue"; // 引入背景组件
import useTheme from "@/hooks/theme.ts"; // 引入主题 hook
import * as localforage from "localforage"; // 引入 localforage 库，用于本地存储
import SettingDialog from "@/components/dialog/SettingDialog.vue"; // 引入设置对话框组件
import ArticleContentDialog from "@/components/dialog/ArticleContentDialog.vue"; // 引入文章内容对话框组件
import CollectNotice from "@/components/CollectNotice.vue"; // 引入收集通知组件
import { SAVE_SETTING_KEY, SAVE_DICT_KEY } from "@/utils/const.ts"; // 引入常量
import { shakeCommonDict } from "@/utils"; // 引入工具函数
import router from "@/router.ts"; // 引入路由

const store = useBaseStore(); // 使用基础 store
const runtimeStore = useRuntimeStore(); // 使用运行时 store
const settingStore = useSettingStore(); // 使用设置 store
const { setTheme } = useTheme(); // 使用主题 hook

// 监听 store 的变化并保存到 localforage
watch(store.$state, (n: BaseState) => {
  localforage.setItem(SAVE_DICT_KEY.key, JSON.stringify({ val: shakeCommonDict(n), version: SAVE_DICT_KEY.version }));
});

// 监听设置 store 的变化并保存到 localStorage
watch(settingStore.$state, (n) => {
  localStorage.setItem(SAVE_SETTING_KEY.key, JSON.stringify({ val: n, version: SAVE_SETTING_KEY.version }));
});

// 检测几个特定词典的变化并更新
watch(store.collect.originWords, (n) => {
  if (n.length === 0) {
    store.collect.words = [];
    store.collect.chapterWords = [];
  } else {
    store.collect.words = cloneDeep(n);
    store.collect.chapterWords = [store.collect.words];
  }
});
watch(store.simple.originWords, (n) => {
  if (n.length === 0) {
    store.simple.words = [];
    store.simple.chapterWords = [];
  } else {
    store.simple.words = cloneDeep(n);
    store.simple.chapterWords = [store.simple.words];
  }
});
watch(store.wrong.originWords, (n) => {
  if (n.length === 0) {
    store.wrong.words = [];
    store.wrong.chapterWords = [];
  } else {
    store.wrong.words = cloneDeep(n);
    store.wrong.chapterWords = [store.wrong.words];
  }
});

// 初始化函数
async function init() {
  store.init().then(() => {
    store.load = true;
  });
  await settingStore.init();
  setTheme(settingStore.theme);
}

// 组件挂载时调用初始化函数
onMounted(() => {
  init();

  if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
    console.log('当前设备是移动设备');
    // router.replace('/mobile'); // 如果是移动设备，则跳转到移动端页面
  }
});
</script>

<template>
  <Backgorund/>
  <router-view/>
  <CollectNotice/>
  <ArticleContentDialog/>
  <SettingDialog/>
</template>

<style scoped lang="scss">
@import "@/assets/css/variable";

.main-page {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 14rem;
  display: flex;
  justify-content: center;
}
</style>
