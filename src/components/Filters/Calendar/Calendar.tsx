import { Dispatch, FC, SetStateAction, useState } from 'react'
import cn from 'classnames'
import { Dropdown } from 'components/Dropdown'
import { DateItemType } from '../../../pages/CallsPage/filters-mock'
import styles from './Calendar.module.scss'

import { ReactComponent as ArrowLeftIcon } from 'icons/arrow-filter-left.svg'
import { ReactComponent as ArrowRightIcon } from 'icons/arrow-filter-right.svg'
import { ReactComponent as CalendarIcon } from 'icons/calendar.svg'

interface Props {
  className?: string
  dates: readonly DateItemType[]
  setCurrentDateRange: Dispatch<SetStateAction<DateItemType>>
  currentDateRange: DateItemType
}

const Calendar: FC<Props> = ({
  className,
  dates,
  setCurrentDateRange,
  currentDateRange
}) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const closeDropdown = () => setIsOpenDropdown(false)

  const toogleDropDrown = () => {
    setIsOpenDropdown(!isOpenDropdown)
  }

  const setPrevDateRange = () => {
    setCurrentDateRange((prevDateRange) => {
      const index = dates.findIndex((item) => item.id === prevDateRange.id)
      return index === 0 ? prevDateRange : dates[index - 1]
    })
  }

  const setNextDateRange = () => {
    setCurrentDateRange((prevDateRange) => {
      const index = dates.findIndex((item) => item.id === prevDateRange.id)
      return index === dates.length - 1 ? prevDateRange : dates[index + 1]
    })
  }

  return (
    <div className={cn(className, styles.calendar)}>
      <Dropdown isOpen={isOpenDropdown} onHide={closeDropdown}>
        <Dropdown.Head>
          <div className={styles.calendar__buttons}>
            <button
              onClick={setPrevDateRange}
              className={styles.calendar__button}>
              <ArrowLeftIcon />
            </button>

            <button
              className={cn(
                styles.calendar__button,
                styles.calendar__button_text
              )}
              onClick={toogleDropDrown}>
              <CalendarIcon />
              <span>{currentDateRange.content}</span>
            </button>

            <button
              onClick={setNextDateRange}
              className={styles.calendar__button}>
              <ArrowRightIcon />
            </button>
          </div>
        </Dropdown.Head>
        <Dropdown.List>
          {dates.map((dateRangeItem) => (
            <div
              key={dateRangeItem.id}
              onClick={() => setCurrentDateRange(dateRangeItem)}
              className={cn(
                styles.calendar__item,
                dateRangeItem.id === currentDateRange.id &&
                  styles.calendar__item_active
              )}>
              {dateRangeItem.content}
            </div>
          ))}
        </Dropdown.List>
      </Dropdown>
    </div>
  )
}

export { Calendar }
