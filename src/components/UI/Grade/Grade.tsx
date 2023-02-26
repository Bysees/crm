import { FC } from 'react'
import cn from 'classnames'
import styles from './Grade.module.scss'

interface Props {
  className?: string
  type: 'bad' | 'good' | 'great'
}

const text = {
  bad: 'Плохо',
  good: 'Хорошо',
  great: 'Отлично'
}

const Grade: FC<Props> = ({ className, type = 'great' }) => {
  
 return <div className={cn(className, styles.grade, styles[`grade_${type}`])}>
    {text[type]}
  </div>
}

export { Grade }
