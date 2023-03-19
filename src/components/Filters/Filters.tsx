import { FC } from 'react'
import { Filter } from './Filter'
import styles from './Filters.module.scss'

import { ReactComponent as ResetIcon } from 'icons/audio/reset.svg'
import { useActions, useAppSelector } from 'src/store'
import { filterItems } from 'src/components/Filters/filters-mock'
import { callsFiltersActions } from 'src/store/slices'
import { checkIsFiltred } from 'src/store/selectors/callsSelectors'

interface Props {}

const Filters: FC<Props> = ({}) => {
  const filterByCriteria = useAppSelector((state) => state.calls.filter.filterByCriteria)
  const isFiltred = checkIsFiltred(filterByCriteria)
  const { resetFilter } = useActions(callsFiltersActions)

  const filters = Object.keys(filterItems) as (keyof typeof filterItems)[]

  return (
    <div className={styles.filters}>
      {/* TODO Добавить поиск по номеру */}

      {isFiltred && (
        <div className={styles.reset}>
          <span>Сбросить фильтры</span>
          <button
            className={styles.reset__button}
            onClick={() => resetFilter()}>
            <ResetIcon />
          </button>
        </div>
      )}

      {filters.map((filter) => {
        return <Filter key={filter} filter={filter} />
      })}
    </div>
  )
}

export { Filters }
