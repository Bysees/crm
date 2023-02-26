import { Dispatch, ReactNode, SetStateAction, useState, memo } from 'react'
import cn from 'classnames'
import { Dropdown } from 'components/Dropdown'
import { ToggleButton } from 'components/UI/ToggleButton'
import styles from './Filters.module.scss'

interface Props<T> {
  activeItem: T
  items: T[]
  setActiveItem: Dispatch<SetStateAction<T>>
}

const Filter = memo(<T extends { id: number; content: ReactNode }>({
  items,
  activeItem,
  setActiveItem
}: Props<T>) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)

  const closeDropdown = () => {
    setIsOpenDropdown(false)
  }

  const toogleDropDrown = () => {
    setIsOpenDropdown((v) => !v)
  }

  return (
    <Dropdown
      className={styles.filter}
      isOpen={isOpenDropdown}
      onHide={closeDropdown}>
      <Dropdown.Head>
        <div className={styles.filter__head}>
          <div className={styles.filter__title}>{activeItem.content}</div>
          <ToggleButton
            type='arrow-small'
            isAcitve={isOpenDropdown}
            onClick={toogleDropDrown}
          />
        </div>
      </Dropdown.Head>
      <Dropdown.List>
        {items.map((item) => {
          return (
            <div
              onClick={() => setActiveItem(item)}
              className={cn(
                styles.filter__item,
                activeItem.id === item.id && styles.filter__item_active
              )}
              key={item.id}>
              {item.content}
            </div>
          )
        })}
      </Dropdown.List>
    </Dropdown>
  )
})

export { Filter }
