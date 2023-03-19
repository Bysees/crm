import { FC } from 'react'
import styles from './FilterDate.module.scss'
import cn from 'classnames'

interface Props {
  isSelected: boolean
  setDateRange: () => void
  content: string
}

const DateFilterItem: FC<Props> = ({ content, setDateRange, isSelected }) => {
  return (
    <div
      onClick={setDateRange}
      className={cn(
        styles.calendar__item,
        isSelected && styles.calendar__item_active
      )}>
      {content}
    </div>
  )
}

export { DateFilterItem }
