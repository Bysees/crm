import { FC, ReactNode } from 'react'
import cn from 'classnames'
import styles from './Button.module.scss'

import { ReactComponent as AlarmIcon } from 'icons/alarm.svg'
import { ReactComponent as PlusIcon } from 'icons/plus.svg'

interface Props {
  className?: string
  children: ReactNode
  onClick: () => void
  type?: 'alarm' | 'plus'
}

const Button: FC<Props> = ({ className, children, onClick, type }) => {
  return (
    <button onClick={onClick} className={cn(className, styles.button)}>
      <span>{children}</span>
      {type && type === 'alarm' ? <AlarmIcon /> : <PlusIcon />}
    </button>
  )
}

export { Button }
