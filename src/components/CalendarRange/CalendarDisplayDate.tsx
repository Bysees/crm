import { FC } from 'react'
// import styles from './CalendarRange.module.scss'

interface Props {
  //* YYYY-MM-DD
  date: string 
}

const CalendarDisplayDate: FC<Props> = ({date}) => {

  //* YY.MM.DD
  const displayDate  = date ? date.slice(2).replaceAll('-', '.') : '__.__.__'

  return (
    <span>{displayDate}</span>
  )
}

export { CalendarDisplayDate }