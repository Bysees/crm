import { GradeUnion, ICall, SourceUnion } from 'types/Call';

const grades: GradeUnion[] = ['no-script', 'good', 'great', 'bad', 'unknown']
const sources: SourceUnion[] = ['firefox', 'yandex', 'google', 'opera']

const random = (list: any[]) => {
  const i = Math.floor(Math.random() * list.length)
  return list[i]
}

export const dataInjection = (list: ICall[]) => {
  return list.map((item) => {

    const withInjectedItem = {
      ...item,
      grade: random(grades),
      source: random(sources)
    }
    
    return withInjectedItem
  })
}