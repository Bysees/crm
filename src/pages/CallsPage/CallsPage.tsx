import { FC, Fragment, useEffect } from 'react'
import cn from 'classnames'
import { FilterDate } from 'components/Filters/FilterDate'
import { Balance } from 'components/UI/Balance'
import { Loader } from 'components/UI/Loader'
import { Filters } from 'components/Filters'
import { CallHeader } from './CallHeader'
import { CallDate } from './CallDate'
import { CallItem } from './CallItem'
import { ICall } from 'types/Call'
import { getDateTime } from 'src/utils/time'

import { callsActions } from 'src/store'
import { useActions, useAppSelector } from 'src/store/hooks'
import { getFiltredCallList } from 'src/store/selectors'
import { fetchCallList } from 'src/store/thunks'

import styles from './Calls.module.scss'
import globalStyles from 'styles/global.module.scss'

interface Props {
  className?: string
}

const CallsPage: FC<Props> = ({ className }) => {
  const status = useAppSelector((state) => state.calls.items.status)
  const filterByCriteria = useAppSelector((state) => state.calls.filter.filterByCriteria)
  const callList = useAppSelector((state) =>
    getFiltredCallList(state, filterByCriteria)
  )
  
  const { startDate, endDate } = useAppSelector(
    (state) => state.calls.filter.filterByDate
  )

  const actions = useActions({ ...callsActions, fetchCallList })

  useEffect(() => {
    ;(async () => {
      await actions.fetchCallList({ startDate, endDate })
    })()
  }, [startDate, endDate])

  const callListByDate = callList.reduce((table, callItems) => {
    const dateFormat = getDateTime(new Date(callItems.date))

    if (table[dateFormat]) {
      table[dateFormat].push(callItems)
    } else {
      table[dateFormat] = [callItems]
    }

    return table
  }, {} as { [date: string]: ICall[] })

  const isLoading = status === 'loading'

  return (
    <main className={cn(className, styles.wrapper)}>
      <div className={cn(globalStyles.container, styles.container)}>
        <section className={styles.filters}>
          <div className={styles.filters__row}>
            <Balance count={777} />
            <FilterDate
              className={styles.filters__date}
            />
          </div>

          <div className={styles.filters__row}>
            <Filters />
          </div>
        </section>

        <section
          className={cn(styles.table, isLoading && styles.table_loading)}>
          {isLoading && <Loader className={styles.table__loader} />}

          <CallHeader />

          {Object.keys(callListByDate).map((date) => {
            const callList = callListByDate[date]

            return (
              <Fragment key={date}>
                <CallDate date={date} count={callList.length} />
                {callList.map((callItem) => {
                  return <CallItem key={callItem.id} {...callItem} />
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
