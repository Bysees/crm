import { FC } from 'react'
import cn from 'classnames'
import styles from './Checkbox.module.scss'

import { ReactComponent as CheckedIcon } from 'icons/checked.svg'

interface Props {
  className?: string
  id: string
  onChange: () => void
  checked: boolean
}

const Checkbox: FC<Props> = ({ onChange, className, id, checked }) => {
  return (
    <div className={cn(className, styles.checkbox)}>
      <input onChange={onChange} checked={checked} id={id} type='checkbox' />
      <CheckedIcon />
      <label htmlFor={id} />
    </div>
  )
}

export { Checkbox }
