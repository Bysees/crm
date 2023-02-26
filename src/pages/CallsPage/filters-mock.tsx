import { Crumbs } from '../../components/UI/Crumbs'
import { Grade } from '../../components/UI/Grade'

export const types = [
  { id: 0, content: 'Все типы', value: null },
  { id: 1, content: 'Входящие', value: 0 },
  { id: 2, content: 'Исходящие', value: 1 }
]

export const employees = [
  { id: 0, content: 'Все сотрудники' },
  { id: 1, content: 'Константин К.' },
  { id: 2, content: 'Полина З.' }
]

export const callTypes = [
  { id: 0, content: 'Все звонки' },
  { id: 1, content: 'Все клиенты' },
  { id: 2, content: 'Все исполнители' },
  { id: 4, content: 'Через приложение' },
  { id: 5, content: 'Прочие звонки' }
]

export const sources = [
  { id: 0, content: 'Все источники', value: null },
  { id: 1, content: 'Yandex', value: 'Yandex' }
]

export const errorTypes = [
  { id: 0, content: 'Все ошибки' },
  { id: 1, content: 'Приветствие' },
  { id: 2, content: 'Имя' },
  { id: 3, content: 'Цена' },
  { id: 4, content: 'Скидка' },
  { id: 5, content: 'Предзаказ' },
  { id: 6, content: 'Благодарность' },
  { id: 7, content: 'Стоп слова' }
]

export const grades = [
  { id: 0, content: 'Все оценки', value: null },
  { id: 1, content: 'Распознать', value: null },
  { id: 2, content: 'Скрипт не использован', value: 'Скрипт не использован' },
  { id: 3, content: <Grade type='bad' />, value: null },
  { id: 4, content: <Grade type='good' />, value: null },
  { id: 5, content: <Grade type='great' />, value: null },
  { id: 6, content: <Crumbs type='bad' />, value: null },
  { id: 7, content: <Crumbs type='good' />, value: null },
  { id: 8, content: <Crumbs type='great' />, value: null }
]

export const dates = [
  { id: 0, content: '3 дня', value: { count: 3, type: 'day' } },
  { id: 1, content: 'Неделя', value: { count: 7, type: 'day' } },
  { id: 2, content: 'Месяц', value: { count: 1, type: 'month' } },
  { id: 3, content: 'Год', value: { count: 1, type: 'year' } }
] as const

export type DateItemType = typeof dates[number]
