import { FC } from 'react'
import cn from 'classnames'
import styles from './Balance.module.scss'

import { ReactComponent as PlusIcon } from 'icons/plus.svg'

interface Props {
  className?: string
  count: number
  onClick?: () => void
}

const Balance: FC<Props> = ({ count = 100, className, onClick }) => {
  return (
    <div className={cn(className, styles.balance)}>
      <span className={styles.balance__title}>Баланс:</span>
      <span className={styles.balance__count}>{count} &#8381;</span>
      <button onClick={onClick} className={styles.balance__button}>
        <PlusIcon />
      </button>
    </div>
  )
}

export { Balance }
