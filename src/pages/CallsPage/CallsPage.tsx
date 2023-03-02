import { FC, Fragment, useEffect, useMemo, useState } from 'react'
import cn from 'classnames'
import { FilterDate } from 'components/Filters/FilterDate'
import { Balance } from 'components/UI/Balance'
import { Loader } from 'components/UI/Loader'
import { Filters } from 'components/Filters'
import { CallHeader } from './CallHeader'
import { CallDate } from './CallDate'
import { CallItem } from './CallItem'
import { ICall } from 'types/Call'
import { ApiService } from 'service/api'
import {
  callTypes,
  employees,
  errorTypes,
  grades,
  sources,
  types,
  dates
} from 'src/pages/CallsPage/filters-mock'
import { getDateTime } from 'src/utils/time'

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

  const [chekedCallIds, setChekedCallIds] = useState<number[]>([])
  const [isPressedAllCheked, setIsPressedAllCheked] = useState(false)

  const toogleAllChekedIds = () => {
    if (isPressedAllCheked) {
      setChekedCallIds([])
      setIsPressedAllCheked(false)
      return
    }

    setChekedCallIds(callList.map((item) => item.id))
    setIsPressedAllCheked(true)
  }

  const toogleChekedId = (id: number) => {
    setChekedCallIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((_id) => _id !== id)
        : prevIds.concat(id)
    )
  }

  const filtredCallList = useMemo(() => {
    let filtredList: ICall[] = callList

    if (currentType.value !== 'all') {
      filtredList = filtredList.filter(
        (callItem) => callItem.in_out === currentType.value
      )
    }

    if (currentSource.value !== 'all') {
      filtredList = filtredList.filter(
        (callItem) => callItem.source === currentSource.value
      )
    }

    if (currentGrade.value !== 'all') {
      filtredList = filtredList.filter(
        (callItem) => callItem.errors[0] === currentGrade.value
      )
    }

    return filtredList
  }, [callList, currentType.id, currentSource.id, currentGrade.id])

  const [currentDateRange, setCurrentDateRange] = useState(() => {
    const { startDate, endDate } = dates[0]

    return {
      startDate,
      endDate
    }
  })

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      const { startDate, endDate } = currentDateRange
      setIsLoading(true)

      const { results: callListData } = await ApiService.getList(
        startDate,
        endDate
      )

      setIsLoading(false)
      setCallList(callListData)
    })()
  }, [currentDateRange.startDate, currentDateRange.endDate])

  const callListByDate = filtredCallList.reduce((table, callItems) => {
    const dateFormat = getDateTime(new Date(callItems.date))

    if (table[dateFormat]) {
      table[dateFormat].push(callItems)
    } else {
      table[dateFormat] = [callItems]
    }

    return table
  }, {} as { [date: string]: ICall[] })

  return (
    <main className={cn(className, styles.wrapper)}>
      <div className={cn(globalStyles.container, styles.container)}>
        <section className={styles.filters}>
          <div className={styles.filters__row}>
            <Balance count={777} />
            <FilterDate
              dates={dates}
              setCurrentDateRange={setCurrentDateRange}
              className={styles.filters__date}
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

        <section
          className={cn(styles.table, isLoading && styles.table_loading)}>
          {isLoading && <Loader className={styles.table__loader} />}

          <CallHeader
            isCheked={isPressedAllCheked}
            toggleCheckbox={toogleAllChekedIds}
          />

          {Object.keys(callListByDate).map((date) => {
            const callList = callListByDate[date]

            return (
              <Fragment key={date}>
                <CallDate date={date} count={callList.length} />
                {callList.map((callItem) => {
                  return (
                    <CallItem
                      key={callItem.id}
                      isCheked={chekedCallIds.includes(callItem.id)}
                      toggleCheckbox={toogleChekedId}
                      {...callItem}
                    />
                  )
                })}
              </Fragment>
            )
          })}
        </section>
      </div>
    </main>
  )
}

export { CallsPage }
