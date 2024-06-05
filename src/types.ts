import bookFlag from "@/assets/img/flags/book.png";
import enFlag from "@/assets/img/flags/en.png";
import codeFlag from "@/assets/img/flags/code.png";
import myFlag from "@/assets/img/flags/my.png";
import {DefaultChapterWordNumber} from "@/stores/setting.ts";

export type Word = {
  "name": string,
  "usphone": string,
  "ukphone": string,
  "trans": string[]
  checked?: boolean,
  id?: any,
}

export const DefaultWord: Word = {
  name: '',
  usphone: '',
  ukphone: '',
  trans: []
}

export const PronunciationApi = 'https://dict.youdao.com/dictvoice?audio='

export type TranslateLanguageType = 'en' | 'zh-CN' | 'ja' | 'de' | 'common' | ''
export type LanguageType = 'en' | 'ja' | 'de' | 'code'

export type DictResource = {
  id: string
  name: string
  description: string
  url: string
  length: number
  category: string
  tags: string[]
  translateLanguage: TranslateLanguageType
  type: DictType
  language: LanguageType
}


export enum DictType {
  collect = 'collect',
  simple = 'simple',
  wrong = 'wrong',
  word = 'word',
}

export enum TranslateType {
  custom = 'custom',
  network = 'network',
  none = 'none'
}

export interface Statistics {
  startDate: number,//开始日期
  endDate: number//结束日期
  spend: number,//花费时间
  total: number//单词数量
  wrongWordNumber: number//错误数
  correctRate: number//正确率
}

export interface DisplayStatistics extends Statistics {
  wrongWords: Word[]
  inputWordNumber: number//输入数
}

export const DefaultDisplayStatistics: DisplayStatistics = {
  startDate: Date.now(),
  endDate: -1,
  spend: -1,
  total: -1,
  correctRate: -1,
  wrongWordNumber: -1,
  inputWordNumber: -1,
  wrongWords: [],
}

export enum Sort {
  normal = 0,
  random = 1,
  reverse = 2
}

export const ShortcutKeyMap = {
  Show: 'Escape',
  Ignore: 'Tab',
  Remove: '`',
  Collect: 'Enter',
}

export enum ShortcutKey {
  ShowWord = 'ShowWord',
  Next = 'Next',
  Previous = 'Previous',
  ToggleSimple = 'ToggleSimple',
  ToggleCollect = 'ToggleCollect',
  NextChapter = 'NextChapter',
  PreviousChapter = 'PreviousChapter',
  RepeatChapter = 'RepeatChapter',
  DictationChapter = 'DictationChapter',
  PlayWordPronunciation = 'PlayWordPronunciation',
  ToggleShowTranslate = 'ToggleShowTranslate',
  ToggleDictation = 'ToggleDictation',
  OpenSetting = 'OpenSetting',
  OpenDictDetail = 'OpenDictDetail',
  ToggleTheme = 'ToggleTheme',
  ToggleConciseMode = 'ToggleConciseMode',
  TogglePanel = 'TogglePanel'
}

export const DefaultShortcutKeyMap = {
    [ShortcutKey.ShowWord]: 'Escape', // 显示当前单词
    [ShortcutKey.Previous]: 'Alt+⬅', // 上一个单词
    [ShortcutKey.Next]: 'Tab', // 下一个单词
    [ShortcutKey.ToggleSimple]: '`', // 切换到简单模式
    [ShortcutKey.ToggleCollect]: 'Enter', // 收藏单词
    [ShortcutKey.PreviousChapter]: 'Ctrl+⬅', // 上一章
    [ShortcutKey.NextChapter]: 'Ctrl+➡', // 下一章
    [ShortcutKey.RepeatChapter]: 'Ctrl+Enter', // 重复当前章节
    [ShortcutKey.DictationChapter]: 'Alt+Enter', // 切换到听写模式
    [ShortcutKey.PlayWordPronunciation]: 'Ctrl+P', // 播放单词发音
    [ShortcutKey.ToggleShowTranslate]: 'Ctrl+Z', // 显示/隐藏翻译
    [ShortcutKey.ToggleDictation]: 'Ctrl+I', // 显示/隐藏听写模式
    [ShortcutKey.OpenSetting]: 'Ctrl+S', // 打开设置
    [ShortcutKey.ToggleTheme]: 'Ctrl+Q', // 切换主题
    [ShortcutKey.OpenDictDetail]: 'Ctrl+J', // 打开词典详情
    [ShortcutKey.ToggleConciseMode]: 'Ctrl+M', // 切换简洁模式
    [ShortcutKey.TogglePanel]: 'Ctrl+L', // 显示/隐藏面板
  }
  


export const languageCategoryOptions = [
  {id: 'my', name: '我的', flag: myFlag},
]

export const DefaultDict: Dict = {
  id: '',
  name: '',
  description: '',
  sort: Sort.normal,
  originWords: [],//原始单词
  words: [],
  chapterWordNumber: DefaultChapterWordNumber,//章节单词数量
  chapterWords: [],
  residueWords: [],//未分配单词
  chapterIndex: 0,//章节下标
  wordIndex: 0,//单词下标
  statistics: [],
  isCustom: false,
  length: 0,
  /*资源属性*/
  resourceId: '',
  url: '',
  category: '',
  tags: [],
  translateLanguage: 'common',
  type: DictType.word,
  language: 'en',
}

export interface Dict {
  id: string,
  name: string,
  description: string,
  sort: Sort,
  originWords: Word[],//原始单词
  words: Word[],
  chapterWordNumber: number,//章节单词数量
  chapterWords: Word[][],
  residueWords: Word[],
  chapterIndex: number,//章节下标
  wordIndex: number,//单词下标
  statistics: Statistics[],
  isCustom: boolean,
  length: number,
  /*资源属性*/
  resourceId: string,
  category: string
  tags: string[]
  language: LanguageType
  type: DictType
  translateLanguage: TranslateLanguageType
  url: string,
}

