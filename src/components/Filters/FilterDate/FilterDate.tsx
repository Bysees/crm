import { FC, useState } from 'react'
import cn from 'classnames'
import { Dropdown } from 'components/Dropdown'
import { SelectedDateFilter } from './SelectedDateFilter'
import { DateFilterItemInput } from './DateFilterItemInput'
import { DateFilterItem } from './DateFilterItem'
import { FilterByDate } from 'src/types/Call'
import { getDateTime, getDateTimeAgo } from 'src/utils/time'
import { useActions, useAppSelector } from 'src/store'
import { callsFiltersActions } from 'src/store/slices'
import styles from './FilterDate.module.scss'

import { ReactComponent as ArrowLeftIcon } from 'icons/arrow-filter-left.svg'
import { ReactComponent as ArrowRightIcon } from 'icons/arrow-filter-right.svg'
import { ReactComponent as CalendarIcon } from 'icons/calendar.svg'

export const dates = [
  {
    title: 'days3' as const,
    startDate: getDateTimeAgo(3, 'day'),
    endDate: getDateTime(new Date())
  },
  {
    title: 'week' as const,
    startDate: getDateTimeAgo(7, 'day'),
    endDate: getDateTime(new Date())
  },
  {
    title: 'month' as const,
    startDate: getDateTimeAgo(1, 'month'),
    endDate: getDateTime(new Date())
  },
  {
    title: 'year' as const,
    startDate: getDateTimeAgo(1, 'year'),
    endDate: getDateTime(new Date())
  }
]

export const dateRu = {
  'days3': '3 Дня',
  'week': 'Неделя',
  'month': 'Месяц',
  'year': 'Год'
}
interface Props {
  className?: string
}

const FilterDate: FC<Props> = ({ className }) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const closeDropdown = () => setIsOpenDropdown(false)
  const toogleDropDrown = () => setIsOpenDropdown(!isOpenDropdown)

  const filterByDate = useAppSelector(
    (state) => state.calls.filter.filterByDate
  )

  const { setDateFilter } = useActions(callsFiltersActions)

  const setDateRange = (date: FilterByDate) => () => {
    setDateFilter(date)
  }

  const setInputDateRange = (startDate: string, endDate: string) => {
    setDateFilter({
      title: 'input',
      startDate: startDate,
      endDate: endDate
    })
  }

  return (
    <div className={cn(className, styles.calendar)}>
      <Dropdown isOpen={isOpenDropdown} onHide={closeDropdown}>
        <Dropdown.Head>
          <div className={styles.calendar__title}>
            <button
              className={styles.calendar__button}
              onClick={toogleDropDrown}>
              <ArrowLeftIcon className={styles.icon__arrowLeft} />
              <CalendarIcon className={styles.icon__calendar} />
              <SelectedDateFilter dateRange={filterByDate} />
              <ArrowRightIcon className={styles.icon__arrowRight} />
            </button>
          </div>
        </Dropdown.Head>

        <Dropdown.List>
          {dates.map((date) => {
            const isSelected = filterByDate.title === date.title
            return (
              <DateFilterItem
                key={date.title}
                content={dateRu[date.title]}
                isSelected={isSelected}
                setDateRange={setDateRange(date)}
              />
            )
          })}

          <DateFilterItemInput
            dateRange={filterByDate}
            setDateRange={setInputDateRange}
          />
        </Dropdown.List>
      </Dropdown>
    </div>
  )
}

export { FilterDate }
