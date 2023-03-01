import { Dispatch, FC, ReactNode, SetStateAction, useState } from 'react'
import cn from 'classnames'
import { Dropdown } from 'components/Dropdown'
import { DateItemType } from '../../../pages/CallsPage/filters-mock'
import styles from './FilterDate.module.scss'

import { ReactComponent as ArrowLeftIcon } from 'icons/arrow-filter-left.svg'
import { ReactComponent as ArrowRightIcon } from 'icons/arrow-filter-right.svg'
import { ReactComponent as CalendarIcon } from 'icons/calendar.svg'
import { CalendarRange } from 'src/components/CalendarRange'
import { CalendarDisplayDate } from 'src/components/CalendarRange/CalendarDisplayDate'

interface Props {
  className?: string
  dates: DateItemType[]
  setCurrentDateRange: Dispatch<
    SetStateAction<{ startDate: string; endDate: string }>
  >
}

const FilterDate: FC<Props> = ({ className, dates, setCurrentDateRange }) => {
  const [_dates, setDates] = useState(dates)
  const [dateRange, setDateRange] = useState<DateItemType>(_dates[0])

  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const closeDropdown = () => setIsOpenDropdown(false)

  const toogleDropDrown = () => {
    setIsOpenDropdown(!isOpenDropdown)
  }

  const setPrevDateRange = () => {
    // TODO - Пока выключил, т.к. работает некорректно и нужно переделать  
    // setDateRange((prevDateRange) => {
    //   const index = _dates.findIndex((item) => item.id === prevDateRange.id)
    //   return index === 0 ? prevDateRange : _dates[index - 1]
    // })
  }

  const setNextDateRange = () => {
    // TODO - Пока выключил, т.к. работает некорректно и нужно переделать  
    // setDateRange((prevDateRange) => {
    //   const index = _dates.findIndex((item) => item.id === prevDateRange.id)
    //   return index === _dates.length - 1 ? prevDateRange : _dates[index + 1]
    // })
  }

  const setMockDatesRange = (_dateRange: DateItemType) => () => {
    setDateRange(_dateRange)
    const { startDate, endDate } = _dateRange

    setCurrentDateRange({ startDate, endDate })
  }

  const setManuallyDatesRange = (startDate: string, endDate: string) => {
    const newDates = _dates.map((date) => {
      if (date.content === 'manually') {
        return { ...date, startDate, endDate }
      }
      return date
    })

    setDateRange(newDates.filter((date) => date.content === 'manually')[0])
    setDates(newDates)

    setCurrentDateRange({ startDate, endDate })
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
              {dateRange.content === 'manually' ? (
                <div className={styles.datesRange}>
                  <CalendarDisplayDate date={dateRange.startDate} />
                  <span className={styles.datesRange__line}>-</span>
                  <CalendarDisplayDate date={dateRange.endDate} />
                </div>
              ) : (
                dateRange.content
              )}
            </button>

            <button
              onClick={setNextDateRange}
              className={styles.calendar__button}>
              <ArrowRightIcon />
            </button>
          </div>
        </Dropdown.Head>

        <Dropdown.List>
          {_dates.map((dateRangeItem) => {
            if (dateRangeItem.content === 'manually') {
              return (
                <div
                  key={dateRangeItem.id}
                  className={cn(styles.calendar__item, styles.calendar__date)}>
                  <div
                    className={cn(
                      styles.calendar__date_title,
                      dateRangeItem.id === dateRange.id &&
                        styles.calendar__item_active
                    )}>
                    Указать даты
                  </div>
                  <CalendarRange
                    startDate={dateRange.startDate}
                    endDate={dateRange.endDate}
                    setRangeDate={setManuallyDatesRange}
                  />
                </div>
              )
            }

            return (
              <div
                key={dateRangeItem.id}
                onClick={setMockDatesRange(dateRangeItem)}
                className={cn(
                  styles.calendar__item,
                  dateRangeItem.id === dateRange.id &&
                    styles.calendar__item_active
                )}>
                {dateRangeItem.content}
              </div>
            )
          })}
        </Dropdown.List>
      </Dropdown>
    </div>
  )
}

export { FilterDate }
