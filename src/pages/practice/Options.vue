<script setup lang="ts">

import BaseIcon from "@/components/BaseIcon.vue";
import {useSettingStore} from "@/stores/setting.ts";
import {ShortcutKey} from "@/types.ts";

defineProps<{
  showEdit?: boolean,
  isCollect: boolean,
  isSimple: boolean
}>()

const emit = defineEmits<{
  toggleCollect: [],
  toggleSimple: [],
  edit: [],
  skip: [],
}>()

const settingStore = useSettingStore()

</script>

<template>
  <div class="options">
    <BaseIcon
        v-if="!isSimple"
        class="collect"
        @click="$emit('toggleSimple')"
        :title="`标记为简单词(快捷键：${settingStore.shortcutKeyMap[ShortcutKey.ToggleSimple]})`"
        icon="material-symbols:check-circle-outline-rounded"/>
    <BaseIcon
        v-else
        class="fill"
        @click="$emit('toggleSimple')"
        :title="`取消标记简单词(快捷键：${settingStore.shortcutKeyMap[ShortcutKey.ToggleSimple]})`"
        icon="material-symbols:check-circle-rounded"/>

    <BaseIcon
        v-if="!isCollect"
        class="collect"
        @click="$emit('toggleCollect')"
        :title="`收藏(快捷键：${settingStore.shortcutKeyMap[ShortcutKey.ToggleCollect]})`"
        icon="ph:star"/>
    <BaseIcon
        v-else
        class="fill"
        @click="$emit('toggleCollect')"
        :title="`取消收藏(快捷键：${settingStore.shortcutKeyMap[ShortcutKey.ToggleCollect]})`"
        icon="ph:star-fill"/>
  </div>
</template>

<style scoped lang="scss">
.options {
  margin-top: 10rem;
  display: flex;
  gap: 15rem;
  font-size: 18rem;
}
</style>