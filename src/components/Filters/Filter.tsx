import { useState, memo } from 'react'
import cn from 'classnames'
import { Dropdown } from 'components/Dropdown'
import { ToggleButton } from 'components/UI/ToggleButton'
import styles from './Filters.module.scss'
import { useActions, useAppSelector } from 'src/store'
import { filterItems } from 'src/components/Filters/filters-mock'
import { callsFiltersActions } from 'src/store/slices'

interface Props {
  filter: keyof typeof filterItems
}

const Filter = memo(({ filter }: Props) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const closeDropdown = () => {
    setIsOpenDropdown(false)
  }
  const toogleDropDrown = () => {
    setIsOpenDropdown((v) => !v)
  }

  const filterValue = useAppSelector(
    (state) => state.calls.filter.filterByCriteria[filter]
  )
  const { setFilter } = useActions(callsFiltersActions)

  const filterTable = filterItems[filter]
  const filterList = Object.values(filterTable)
  //@ts-ignore
  const activeFilter = filterTable[filterValue].content

  return (
    <Dropdown
      className={styles.filter}
      isOpen={isOpenDropdown}
      onHide={closeDropdown}>
      <Dropdown.Head>
        <div className={styles.filter__head}>
          <div className={styles.filter__title}>{activeFilter}</div>
          <ToggleButton
            type='arrow-small'
            isAcitve={isOpenDropdown}
            onClick={toogleDropDrown}
          />
        </div>
      </Dropdown.Head>
      <Dropdown.List>
        {filterList.map(({ content, value }) => {
          return (
            <div
              onClick={() => setFilter({ [filter]: value })}
              className={cn(
                styles.filter__item,
                filterValue === value && styles.filter__item_active
              )}
              key={value}>
              {content}
            </div>
          )
        })}
      </Dropdown.List>
    </Dropdown>
  )
})

export { Filter }
