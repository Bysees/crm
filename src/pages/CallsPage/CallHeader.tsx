import { FC } from 'react'
import cn from 'classnames'
import styles from './Calls.module.scss'
import { Checkbox } from 'src/components/UI/Checkbox'

interface Props {
  
}

const CallHeader: FC<Props> = ({}) => {

  return (
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
  )
}

export { CallHeader }