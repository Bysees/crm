import { Grade } from 'components/UI/Grade'

export const callTypes = {
  'all': {
    content: 'Все типы',
    value: 'all'
  },
  'Incoming': {
    content: 'Входящие',
    value: 'Incoming'
  },
  'Outcoming': {
    content: 'Исходящие',
    value: 'Outcoming'
  }
}

export const sources = {
  'all': {
    content: 'Все источники',
    value: 'all'
  },
  'yandex': {
    content: 'Yandex',
    value: 'yandex'
  },
  'google': {
    content: 'Google',
    value: 'google'
  },
  'firefox': {
    content: 'Firefox',
    value: 'firefox'
  },
  'opera': {
    content: 'Opera',
    value: 'opera'
  }
}

export const grades = {
  'all': {
    content: 'Все оценки',
    value: 'all'
  },
  'no-script': {
    content: 'Скрипт не использован',
    value: 'no-script'
  },
  'unknown': {
    content: 'Распознать',
    value: 'unknown'
  },
  'great': {
    content: <Grade type='great' />,
    value: 'great'
  },
  'good': {
    content: <Grade type='good' />,
    value: 'good'
  },
  'bad': {
    content: <Grade type='bad' />,
    value: 'bad'
  }
}

export const filterItems = {
  callType: callTypes,
  source: sources,
  grade: grades
}