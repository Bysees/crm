import { FC } from 'react'
import { Filter } from './Filter'
import styles from './Filters.module.scss'

import { ReactComponent as ResetIcon } from 'icons/audio/reset.svg'

interface Props {
  // TODO Затипизировать бы потом...
  filters: any[]
  resetFilters: () => void
  isFiltred: boolean
}

const Filters: FC<Props> = ({resetFilters, filters, isFiltred}) => {

  return (
    <div className={styles.filters}>
      {/* TODO Добавить поиск по номеру */}
      
      {isFiltred && (
        <div className={styles.reset}>
          <span>Сбросить фильтры</span>
          <button className={styles.reset__button} onClick={resetFilters}>
            <ResetIcon />
          </button>
        </div>
      )}

      {filters.map(({ items, activeItem, setActiveItem }, index) => {
        return (
          <Filter
            key={index}
            activeItem={activeItem}
            items={items}
            setActiveItem={setActiveItem}
          />
        )
      })}
    </div>
  )
}

export { Filters }
