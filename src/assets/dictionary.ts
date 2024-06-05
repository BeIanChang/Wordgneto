import {DictResource, DictType} from "@/types.ts"

// 中国考试
const chinaExam: DictResource[] = [
  {
    id: 'cet4',
    name: 'CET-4',
    description: '大学英语四级词库',
    category: '中国考试',
    tags: ['大学英语'],
    url: 'CET4_T.json',
    length: 2607,
    translateLanguage: 'common',
    language: 'en',
    type: DictType.word
  },
  {
    id: 'cet6',
    name: 'CET-6',
    description: '大学英语六级词库',
    category: '中国考试',
    tags: ['大学英语'],
    url: 'CET6_T.json',
    length: 2345,
    translateLanguage: 'common',
    language: 'en',
    type: DictType.word
  },
  
]

export const dictionaryResources: DictResource[] = [
  ...chinaExam,
]
