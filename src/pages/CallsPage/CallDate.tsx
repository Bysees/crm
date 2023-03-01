import { FC } from 'react'
import cn from 'classnames'
import { getRelativeDisplayDate } from 'src/utils/time'
import styles from './Calls.module.scss'

interface Props {
  date: string
  count: number
}

const CallDate: FC<Props> = ({ date, count }) => {
  const displayDate = getRelativeDisplayDate(date) //* 'сегодня' | 'вчера' | 'позавчера' | string
  const isToday = displayDate === 'сегодня'

  if (isToday) {
    return null
  }

  return (
    <div className={cn(styles.row, styles.row_date)}>
      <div className={styles.rowDate}>
        <div>{displayDate}</div>
        <div className={styles.rowDate__count}>{count}</div>
      </div>
    </div>
  )
}

export { CallDate }
