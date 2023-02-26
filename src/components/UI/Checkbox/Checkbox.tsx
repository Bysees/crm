import { ChangeEventHandler, FC, useState } from 'react'
import cn from 'classnames'
import styles from './Checkbox.module.scss'

import { ReactComponent as CheckedIcon } from 'icons/checked.svg'

interface Props {
  className?: string
  id: string
  onChange?: (cheked: boolean) => void
  checked?: boolean
}

const Checkbox: FC<Props> = ({onChange, className, id, checked = false }) => {
  const [isChecked, setIsChecked] = useState(checked)

  const onCheckedChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsChecked(e.target.checked)

    if(typeof onChange === 'function') {
      onChange(e.target.checked)
    }
  }
  
  return (
    <div className={cn(className, styles.checkbox)}>
      <input
        onChange={onCheckedChange}
        checked={isChecked}
        id={id}
        type='checkbox'
      />
      <CheckedIcon />
      <label htmlFor={id} />
    </div>
  )
}

export { Checkbox }
