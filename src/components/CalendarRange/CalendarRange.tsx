import { FC, useState } from 'react'
import { Calendar } from './Calendar'
import { ReactComponent as CalendarIcon } from 'icons/calendar.svg'
import styles from './CalendarRange.module.scss'

interface Props {
  startDate: string
  endDate: string
  setDateRange: (startDate: string, endDate: string) => void
}

const CalendarRange: FC<Props> = ({ setDateRange, startDate, endDate }) => {
  const [dates, setDates] = useState({ startDate: startDate, endDate: endDate })

  const setStartDate = (startDate: string) => {
    setDates(prevDates => ({...prevDates, startDate}))
  }

  const setEndDate = (endDate: string) => {
    setDates(prevDates => ({...prevDates, endDate}))
  }

  const handleClickButton = () => {
    if(!dates.startDate || !dates.endDate) {
      return
    }
    
    setDateRange(dates.startDate, dates.endDate)
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.calendar__items}>
        <Calendar
          defaultDate={dates.startDate}
          onChangeDate={setStartDate}
          max={dates.endDate === '' ? undefined : dates.endDate}
        />
        <span className={styles.calendar__line}>-</span>
        <Calendar
          defaultDate={dates.endDate}
          onChangeDate={setEndDate}
          min={dates.startDate}
        />
      </div>

      <button
        onClick={handleClickButton}
        className={styles.calendar__acceptButton}>
        <CalendarIcon />
      </button>
    </div>
  )
}

export { CalendarRange }
