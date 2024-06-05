<script setup lang="ts">

import {ShortcutKey} from "@/types.ts";
import {$ref} from "vue/macros";
import BaseIcon from "@/components/BaseIcon.vue";
import Tooltip from "@/components/Tooltip.vue";
import IconWrapper from "@/components/IconWrapper.vue";
import {Icon} from "@iconify/vue";
import useTheme from "@/hooks/theme.ts";
import {useSettingStore} from "@/stores/setting.ts";

const {toggleTheme} = useTheme()
const settingStore = useSettingStore()

</script>

<template>
  <div class="right-bar">
    <Tooltip
        :title="`切换主题(快捷键：${settingStore.shortcutKeyMap[ShortcutKey.ToggleTheme]})`"
    >
      <IconWrapper>
        <Icon icon="ep:moon" v-if="settingStore.theme === 'dark'"
              @click="toggleTheme"/>
        <Icon icon="tabler:sun" v-else @click="toggleTheme"/>
      </IconWrapper>
    </Tooltip>

  </div>
</template>

<style scoped lang="scss">

.right-bar {
  position: fixed;
  right: var(--space);
  top: var(--space);
  z-index: 1;
  display: flex;
  gap: 10rem;
}

</style>