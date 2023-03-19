import { FC } from 'react'
import cn from 'classnames'
import { Checkbox } from 'components/UI/Checkbox'
import styles from './Calls.module.scss'
import { callsActions, useActions, useAppSelector } from 'src/store'

interface Props {}

const CallHeader: FC<Props> = () => {
  const isAllIdsChecked = useAppSelector(
    (state) => state.calls.items.checkedIds.length === state.calls.items.initialList.length
  )

  const { toogleAllCheckedIds } = useActions(callsActions)

  return (
    <header className={cn(styles.row, styles.row_header)}>
      <Checkbox
        className={cn(styles.checkbox, true && styles.checkbox_visible)}
        checked={isAllIdsChecked}
        onChange={() => toogleAllCheckedIds()}
        id='checkbox-head'
      />
      <div>Тип</div>
      <div>Время</div>
      <div>Сотрудник</div>
      <div>Звонок</div>
      <div>Источник</div>
      <div>Оценка</div>
      <div className={styles.row__duration}>Длительность</div>
    </header>
  )
}

export { CallHeader }
