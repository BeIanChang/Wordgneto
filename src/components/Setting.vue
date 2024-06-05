<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref, watch } from "vue";
import { useSettingStore } from "@/stores/setting.ts";
import { getAudioFileUrl, useChangeAllSound, usePlayAudio, useWatchAllSound } from "@/hooks/sound.ts";
import { getShortcutKey, useDisableEventListener, useEventListener } from "@/hooks/event.ts";
import { $computed, $ref } from "vue/macros";
import { cloneDeep } from "lodash-es";
import { DefaultShortcutKeyMap, Dict, DictType, ShortcutKey } from "@/types.ts";
import BaseButton from "@/components/BaseButton.vue";
import { APP_NAME, EXPORT_DATA_KEY, SAVE_DICT_KEY, SAVE_SETTING_KEY, SoundFileOptions } from "@/utils/const.ts";
import VolumeIcon from "@/components/icon/VolumeIcon.vue";


const emit = defineEmits<{
  toggleDisabledDialogEscKey: [val: boolean]
}>()

const tabIndex = $ref(0)
const settingStore = useSettingStore()
//@ts-ignore

useDisableEventListener(() => undefined)
useWatchAllSound()

let editShortcutKey = $ref('')

const disabledDefaultKeyboardEvent = $computed(() => {
  return editShortcutKey && tabIndex === 2
})

watch(() => disabledDefaultKeyboardEvent, v => {
  emit('toggleDisabledDialogEscKey', !!v)
})

useEventListener('keydown', (e: KeyboardEvent) => {
  if (!disabledDefaultKeyboardEvent) return
  e.preventDefault()

  let shortcutKey = getShortcutKey(e)
  if (editShortcutKey) {
    if (shortcutKey === 'Delete') {
      settingStore.shortcutKeyMap[editShortcutKey] = ''
    } else {
      for (const [k, v] of Object.entries(settingStore.shortcutKeyMap)) {
        if (v === shortcutKey && k !== editShortcutKey) {
          settingStore.shortcutKeyMap[editShortcutKey] = DefaultShortcutKeyMap[editShortcutKey]
          return ElMessage.warning('快捷键重复！')
        }
      }
      settingStore.shortcutKeyMap[editShortcutKey] = shortcutKey
    }
  }
})

</script>

<template>
  <div class="setting">
    <div class="left">
      <div class="tabs">
        <div class="tab" :class="tabIndex === 0 && 'active'" @click="tabIndex = 0">
          <Icon icon="bx:headphone" width="20" color="#0C8CE9"/>
          <span>音效设置</span>
        </div>
        <div class="tab" :class="tabIndex === 1 && 'active'" @click="tabIndex = 1">
          <Icon icon="icon-park-outline:setting-config" width="20" color="#0C8CE9"/>
          <span>拼写设置</span>
        </div>
      </div>
      
    </div>
    <div class="content">
      <div v-if="tabIndex === 0">
        <div class="row">
          <label class="main-title">所有音效</label>
          <div class="wrapper">
            <el-switch v-model="settingStore.allSound"
                       @change="useChangeAllSound"
                       inline-prompt
                       active-text="开"
                       inactive-text="关"
            />
          </div>
        </div>
        <div class="line"></div>
        <div class="row">
          <label class="item-title">单词自动发音</label>
          <div class="wrapper">
            <el-switch v-model="settingStore.wordSound"
                       inline-prompt
                       active-text="开"
                       inactive-text="关"
            />
          </div>
        </div>
        <div class="row">
          <label class="sub-title">单词发音口音</label>
          <div class="wrapper">
            <el-select v-model="settingStore.wordSoundType"
                       placeholder="请选择"
            >
              <el-option label="美音" value="us"/>
              <el-option label="英音" value="uk"/>
            </el-select>
          </div>
        </div>
        <div class="row">
          <label class="sub-title">音量</label>
          <div class="wrapper">
            <el-slider v-model="settingStore.wordSoundVolume"/>
            <span>{{ settingStore.wordSoundVolume }}%</span>
          </div>
        </div>
        <div class="row">
          <label class="sub-title">倍速</label>
          <div class="wrapper">
            <el-slider v-model="settingStore.wordSoundSpeed" :step="0.1" :min="0.5" :max="3"/>
            <span>{{ settingStore.wordSoundSpeed }}</span>
          </div>
        </div>
        <div class="line"></div>
        <div class="row">
          <label class="item-title">按键音</label>
          <div class="wrapper">
            <el-switch v-model="settingStore.keyboardSound"
                       inline-prompt
                       active-text="开"
                       inactive-text="关"
            />
          </div>
        </div>
        <div class="row">
          <label class="item-title">按键音效</label>
          <div class="wrapper">
            <el-select v-model="settingStore.keyboardSoundFile"
                       placeholder="请选择"
            >
              <el-option
                  v-for="item in SoundFileOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
                <div class="el-option-row">
                  <span>{{ item.label }}</span>
                  <VolumeIcon
                      :time="100"
                      @click="usePlayAudio(getAudioFileUrl(item.value)[0])"/>
                </div>
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="row">
          <label class="sub-title">音量</label>
          <div class="wrapper">
            <el-slider v-model="settingStore.keyboardSoundVolume"/>
            <span>{{ settingStore.keyboardSoundVolume }}%</span>
          </div>
        </div>
        
      </div>
      <div v-if="tabIndex === 1">
        <div class="row">
          <label class="item-title">显示上一个/下一个单词</label>
          <div class="wrapper">
            <el-switch v-model="settingStore.showNearWord"
                       inline-prompt
                       active-text="开"
                       inactive-text="关"
            />
          </div>
        </div>
        <div class="desc">
          开启后，练习中会在上方显示上一个/下一个单词
        </div>
        <div class="line"></div>
        <div class="row">
          <label class="item-title">忽略大小写</label>
          <div class="wrapper">
            <el-switch v-model="settingStore.ignoreCase"
                       inline-prompt
                       active-text="开"
                       inactive-text="关"
            />
          </div>
        </div>
        <div class="desc">
          开启后，输入时不区分大小写，如输入“hello”和“Hello”都会被认为是正确的
        </div>
        <div class="line"></div>
        <div class="row">
          <label class="item-title">允许默写模式下显示提示</label>
          <div class="wrapper">
            <el-switch v-model="settingStore.allowWordTip"
                       inline-prompt
                       active-text="开"
                       inactive-text="关"
            />
          </div>
        </div>
        <div class="desc">
          开启后，可以通过鼠标 hover 单词或者按 {{ settingStore.shortcutKeyMap[ShortcutKey.ShowWord] }} 显示正确答案
        </div>
        <div class="line"></div>
        <div class="row">
          <label class="item-title">字体设置(仅可调整单词练习)</label>
        </div>
        <div class="row">
          <label class="sub-title">外语字体</label>
          <div class="wrapper">
            <el-slider
                :min="10"
                :max="100"
                v-model="settingStore.fontSize.wordForeignFontSize"/>
            <span>{{ settingStore.fontSize.wordForeignFontSize }}</span>
          </div>
        </div>
        <div class="row">
          <label class="sub-title">中文字体</label>
          <div class="wrapper">
            <el-slider
                :min="10"
                :max="100"
                v-model="settingStore.fontSize.wordTranslateFontSize"/>
            <span>{{ settingStore.fontSize.wordTranslateFontSize }}</span>
          </div>
        </div>

        <div class="line"></div>
        <div class="row">
          <label class="item-title">其他设置</label>
        </div>
        <div class="row">
          <label class="sub-title">是否自动切换到下一个单词</label>
          <div class="wrapper">
            <el-switch v-model="settingStore.autoNext"
                       inline-prompt
                       active-text="开"
                       inactive-text="关"
            />
          </div>
        </div>
        <div class="desc">
          关闭后，当完成单词输入时，需要再次按下空格键切换下一个
        </div>
        <div class="row">
          <label class="sub-title">自动切换下一个单词延迟</label>
          <div class="wrapper">
            <el-input-number v-model="settingStore.waitTimeForChangeWord"
                             :min="0"
                             type="number"
            />
            <span>毫秒</span>
          </div>
        </div>

        <div class="row">
          <label class="sub-title">默写时是否显示单词长度</label>
          <div class="wrapper">
            <el-switch v-model="settingStore.dictationShowWordLength"
                       inline-prompt
                       active-text="开"
                       inactive-text="关"
            />
          </div>
        </div>
        <div class="desc">
          默写时用下划线 _ 来显示每个字符。关闭后，用空格代替，用户将无法判断单词长度
        </div>
      </div>
        
      </div>
    </div>
</template>

<style scoped lang="scss">
@import "@/assets/css/variable";

.setting {
  width: 40vw;
  height: 70vh;
  display: flex;
  color: var(--color-font-1);

  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .tabs {
      padding: 10rem 20rem;
      display: flex;
      flex-direction: column;
      //align-items: center;
      //justify-content: center;
      gap: 10rem;

      .tab {
        cursor: pointer;
        padding: 10rem 15rem;
        border-radius: 8rem;
        display: flex;
        align-items: center;
        gap: 10rem;

        &.active {
          background: var(--color-item-bg);
        }
      }
    }

    .git-log {
      font-size: 10rem;
      color: gray;
      margin-bottom: 5rem;
    }
  }

  .content {
    background: var(--color-header-bg);
    flex: 1;
    height: 100%;
    overflow: auto;
    padding: 10rem var(--space);

    .row {
      min-height: 40rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: calc(var(--space) * 5);

      .wrapper {
        height: 30rem;
        flex: 1;
        display: flex;
        justify-content: flex-end;
        gap: var(--space);

        span {
          text-align: right;
          //width: 30rem;
          font-size: 12rem;
          color: gray;
        }

        .set-key {
          align-items: center;

          input {
            width: 150rem;
            box-sizing: border-box;
            margin-right: 10rem;
            height: 28rem;
            outline: none;
            font-size: 16rem;
            border: 1px solid gray;
            border-radius: 3rem;
            padding: 0 5rem;
            background: var(--color-second-bg);
            color: var(--color-font-1);
          }
        }
      }

      .main-title {
        font-size: 22rem;
      }

      .item-title {
        font-size: 16rem;
      }

      .sub-title {
        font-size: 14rem;
      }
    }

    .body {
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .scroll {
      flex: 1;
      padding-right: 10rem;
      overflow: auto;
    }

    .footer {
      margin-bottom: 20rem;
    }

    .desc {
      margin-bottom: 10rem;
      font-size: 12rem;
    }

    .line {
      border-bottom: 1px solid #c4c3c3;
    }
  }
}

.el-option-row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .icon-wrapper {
    transform: translateX(10rem);
  }
}

.import {
  display: inline-flex;
  position: relative;

  input {
    position: absolute;
    height: 100%;
    width: 100%;
    opacity: 0;
  }
}

</style>