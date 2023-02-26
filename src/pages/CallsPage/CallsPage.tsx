import { FC, useEffect, useMemo, useState } from 'react'
import cn from 'classnames'
import { Call } from './Call'
import { Checkbox } from 'components/UI/Checkbox'
import { Balance } from 'src/components/UI/Balance'
import { Calendar } from 'src/components/Filters/Calendar'
import { Filters } from 'src/components/Filters'
import { ICall } from 'src/types/Call'
import { ApiService } from 'src/service/api'
import {
  callTypes,
  DateItemType,
  dates,
  employees,
  errorTypes,
  grades,
  sources,
  types
} from 'src/pages/CallsPage/filters-mock'
import { getDateRange } from 'src/utils/time'

import styles from './Calls.module.scss'
import globalStyles from 'styles/global.module.scss'

interface Props {
  className?: string
}

const CallsPage: FC<Props> = ({ className }) => {
  const [currentType, setCurrentType] = useState(types[0])
  const [currentEmployee, setCurrentEmployee] = useState(employees[0])
  const [currentCallType, setCurrentCallType] = useState(callTypes[0])
  const [currentSource, setCurrentSource] = useState(sources[0])
  const [currentGrade, setCurrentGrade] = useState(grades[0])
  const [currentErrorType, setCurrentErrorType] = useState(errorTypes[0])

  const [currentDateRange, setCurrentDateRange] = useState<DateItemType>(
    dates[0]
  )

  const filters = [
    { items: types, activeItem: currentType, setActiveItem: setCurrentType },
    {
      items: employees,
      activeItem: currentEmployee,
      setActiveItem: setCurrentEmployee
    },
    {
      items: callTypes,
      activeItem: currentCallType,
      setActiveItem: setCurrentCallType
    },
    {
      items: sources,
      activeItem: currentSource,
      setActiveItem: setCurrentSource
    },
    { items: grades, activeItem: currentGrade, setActiveItem: setCurrentGrade },
    {
      items: errorTypes,
      activeItem: currentErrorType,
      setActiveItem: setCurrentErrorType
    }
  ]

  const resetFilters = () => {
    setCurrentType(types[0])
    setCurrentEmployee(employees[0])
    setCurrentCallType(callTypes[0])
    setCurrentSource(sources[0])
    setCurrentGrade(grades[0])
    setCurrentErrorType(errorTypes[0])
  }

  const isFiltred = () => {
    if (
      currentType.id !== types[0].id ||
      currentEmployee.id !== employees[0].id ||
      currentCallType.id !== callTypes[0].id ||
      currentSource.id !== sources[0].id ||
      currentGrade.id !== grades[0].id ||
      currentErrorType.id !== errorTypes[0].id
    ) {
      return true
    }
    return false
  }

  const [callList, setCallList] = useState<ICall[]>([])

  useEffect(() => {
    ;(async () => {
      const count = currentDateRange.value.count
      const type = currentDateRange.value.type
      const { startDate, endDate } = getDateRange(count, type)

      const { results: callListData } = await ApiService.getList(
        startDate,
        endDate
      )
      setCallList(callListData)
    })()
  }, [currentDateRange.id])

  const filtredCallList = useMemo(() => {
    let filtredList: ICall[] = callList

    if (currentType.value !== null) {
      filtredList = filtredList.filter(
        (callItem) => callItem.in_out === currentType.value
      )
    }

    if (currentSource.value !== null) {
      filtredList = filtredList.filter(
        (callItem) => callItem.source === currentSource.value
      )
    }

    if (currentGrade.value !== null) {
      filtredList = filtredList.filter(
        (callItem) => callItem.errors[0] === currentGrade.value
      )
    }

    return filtredList
  }, [callList, currentType.id, currentSource.id, currentGrade.id])

  return (
    <main className={cn(className, styles.wrapper)}>
      <div className={cn(globalStyles.container, styles.container)}>
        <section className={styles.filters}>
          <div className={styles.filters__row}>
            <Balance count={777} />
            <Calendar
              dates={dates}
              currentDateRange={currentDateRange}
              setCurrentDateRange={setCurrentDateRange}
              className={styles.calendar}
            />
          </div>

          <div className={styles.filters__row}>
            <Filters
              isFiltred={isFiltred()}
              filters={filters}
              resetFilters={resetFilters}
            />
          </div>
        </section>

        <section className={styles.table}>
          <header className={cn(styles.row, styles.row_header)}>
            <Checkbox
              className={cn(styles.checkbox, true && styles.checkbox_visible)}
              checked={false}
              id='checkbox-head'
            />
            <div>Тип</div>
            <div>Время</div>
            <div>Сотрудник</div>
            <div>Звонок</div>
            <div>Источник</div>
            <div className={styles.row__grade}>Оценка</div>
            <div className={styles.row__duration}>Длительность</div>
          </header>

          {filtredCallList.map((callItem) => {
            return <Call key={callItem.id} {...callItem} />
          })}
        </section>
      </div>
    </main>
  )
}

export { CallsPage }
