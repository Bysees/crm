import { ChangeEventHandler, FC, useState } from 'react'
import { getDateTime } from 'src/utils/time'
import { CalendarDisplayDate } from './CalendarDisplayDate'
import styles from './CalendarRange.module.scss'

interface Props {
  onChangeDate?: (date: string) => void
  defaultDate: string
  min?: string
  max?: string
}

const defaultMax = getDateTime(new Date())

const Calendar: FC<Props> = ({defaultDate, onChangeDate, min, max = defaultMax}) => {
  const [date, setDate] = useState<string>(defaultDate)

  const handleChangeDate: ChangeEventHandler<HTMLInputElement> = (e) => {
    setDate(e.target.value)

    if(typeof onChangeDate === 'function') {
      onChangeDate(e.target.value)
    }
  }

  return (
    <div className={styles.calendar__item}>
      <CalendarDisplayDate date={date}/>
      <input type='date' min={min} max={max} value={date} onChange={handleChangeDate} />
    </div>
  )
}

export { Calendar }
