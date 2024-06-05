import {Dict, DictType, Word} from "@/types.ts";
import {useBaseStore} from "@/stores/base.ts";
import {useRuntimeStore} from "@/stores/runtime.ts";
import {chunk, cloneDeep} from "lodash-es";
import {$ref} from "vue/macros";


export function useWordOptions() {
  const store = useBaseStore()

  function isWordCollect(val: Word) {
    return !!store.collect.originWords.find(v => v.name.toLowerCase() === val.name.toLowerCase())
  }

  function toggleWordCollect(val: Word) {
    let rIndex = store.collect.originWords.findIndex(v => v.name.toLowerCase() === val.name.toLowerCase())
    if (rIndex > -1) {
      store.collect.originWords.splice(rIndex, 1)
    } else {
      let rIndex = store.simple.originWords.findIndex(v => v.name.toLowerCase() === val.name.toLowerCase())
      if (rIndex > -1) {
        store.simple.originWords.splice(rIndex, 1)
      }
      store.collect.originWords.push(val)
    }

    store.collect.length = store.collect.originWords.length
  }

  function isWordSimple(val: Word) {
    return !!store.simple.originWords.find(v => v.name.toLowerCase() === val.name.toLowerCase())
  }

  function toggleWordSimple(val: Word) {
    let rIndex = store.simple.originWords.findIndex(v => v.name.toLowerCase() === val.name.toLowerCase())
    if (rIndex > -1) {
      store.simple.originWords.splice(rIndex, 1)
    } else {
      let rIndex = store.collect.originWords.findIndex(v => v.name.toLowerCase() === val.name.toLowerCase())
      if (rIndex > -1) {
        store.collect.originWords.splice(rIndex, 1)
      }
      store.simple.originWords.push(val)
    }

    store.simple.length = store.simple.originWords.length
  }

  function delWrongWord(val: Word) {
    let rIndex = store.wrong.originWords.findIndex(v => v.name.toLowerCase() === val.name.toLowerCase())
    if (rIndex > -1) {
      store.wrong.originWords.splice(rIndex, 1)
    }
    store.wrong.length = store.wrong.originWords.length
  }

  function delSimpleWord(val: Word) {
    let rIndex = store.simple.originWords.findIndex(v => v.name.toLowerCase() === val.name.toLowerCase())
    if (rIndex > -1) {
      store.simple.originWords.splice(rIndex, 1)
    }
    store.simple.length = store.simple.originWords.length
  }

  return {
    isWordCollect,
    toggleWordCollect,
    isWordSimple,
    toggleWordSimple,
    delWrongWord,
    delSimpleWord
  }
}

export async function checkDictHasTranslate(dict: Dict) {
  let dictResourceUrl = `./dicts/${dict.url}`;
  if ([
    DictType.word,
  ].includes(dict.type)) {
    if (!dict.originWords.length) {
      let r = await fetch(dictResourceUrl)
      let v = await r.json()
      if (dict.translateLanguage === 'common') {
        const runtimeStore = useRuntimeStore()
        let r2 = await fetch('./translate/en2zh_CN-min.json')
        let list: Word[] = await r2.json()

        runtimeStore.translateWordList = list

        dict.originWords = cloneDeep(v)
        dict.words = cloneDeep(v)
        dict.chapterWords = chunk(dict.words, dict.chapterWordNumber)
        dict.chapterWords[dict.chapterIndex].map((w: Word) => {
          let res = list.find(a => a.name === w.name)
          if (res) w = Object.assign(w, res)
        })
      } else {
        dict.originWords = cloneDeep(v)
        dict.words = cloneDeep(v)
        dict.chapterWords = chunk(dict.words, dict.chapterWordNumber)
      }
    }
  }
}

//同步到我的词典列表
export function syncMyDictList(dict: Dict, isCustom = true) {
  const store = useBaseStore()
  //任意修改，都将其变为自定义词典
  dict.isCustom = isCustom
  dict.length = dict.words.length
  

  let rIndex = store.myDictList.findIndex(v => v.id === dict.id)
  if (rIndex > -1) {
    store.myDictList[rIndex] = cloneDeep(dict)
  } else {
    store.myDictList.push(cloneDeep(dict))
  }
}

export function useTranslateWordList() {
  let progress = $ref(0)

  function translate(list: Word) {
    requestIdleCallback(() => {
      let count = 0
      for (let index = 0; index < list.length; index++) {
        let w = list[index]
        if (!w.trans.length) {
          requestIdleCallback(() => {
            if (list.length) {
              let res = runtimeStore.translateWordList.find(a => a.name === w.name)
              if (res) w = Object.assign(w, res)
              count++
              if (count === list.length) {
                progress = 100
              } else {
                if (count % 30 === 0) progress = (count / list.length) * 100
              }
            }
          })
        } else {
          count++
          if (count === list.length) {
            progress = 100
          } else {
            if (count % 30 === 0) progress = (count / list.length) * 100
          }
        }
      }
    })
  }

  return {
    progress,
    translate
  }
}