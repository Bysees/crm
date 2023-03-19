import { FC } from 'react'
import cn from 'classnames'
import { CalendarRange } from 'src/components/CalendarRange'
import { FilterByDate } from 'src/types/Call'
import styles from './FilterDate.module.scss'

interface Props {
  dateRange: FilterByDate
  setDateRange: (startDate: string, endDate: string) => void
}

const DateFilterItemInput: FC<Props> = ({ dateRange, setDateRange }) => {
  let { title, endDate, startDate } = dateRange
  let isSelected = true

  if (title !== 'input') {
    isSelected = false
    endDate = ''
    startDate = ''
  }

  return (
    <div className={cn(styles.calendar__item, styles.calendar__date)}>
      <div
        className={cn(
          styles.calendar__date_title,
          isSelected && styles.calendar__item_active
        )}>
        Указать даты
      </div>
      <CalendarRange
        startDate={startDate}
        endDate={endDate}
        setDateRange={setDateRange}
      />
    </div>
  )
}

export { DateFilterItemInput }
