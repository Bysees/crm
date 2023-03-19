import { FC } from 'react'
import { CalendarDisplayDate } from 'src/components/CalendarRange/CalendarDisplayDate'
import { FilterByDate } from 'src/types/Call'
import { dateRu } from './FilterDate'
import styles from './FilterDate.module.scss'

interface Props {
  dateRange: FilterByDate
}

const SelectedDateFilter: FC<Props> = ({ dateRange }) => {
  const { title, endDate, startDate } = dateRange

  if (title === 'input') {
    return (
      <div className={styles.datesRange}>
        <CalendarDisplayDate date={startDate} />
        <span className={styles.datesRange__line}>-</span>
        <CalendarDisplayDate date={endDate} />
      </div>
    )
  }

  return <span>{dateRu[title]}</span>
}

export { SelectedDateFilter }
