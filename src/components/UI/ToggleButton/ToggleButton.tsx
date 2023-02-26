import { FC } from 'react'
import cn from 'classnames'
import { ReactComponent as ArrowMediumIcon } from 'icons/arrow-medium.svg'
import { ReactComponent as ArrowSmallIcon } from 'icons/arrow-small.svg'
import { ReactComponent as LoupeIcon } from 'icons/loupe.svg'
import styles from './ToggleButton.module.scss'

interface Props {
  className?: string
  onClick: () => void
  isAcitve: boolean
  type: 'arrow-small' | 'arrow-medium' | 'loupe'
}

const ToggleButton: FC<Props> = ({ className, onClick, isAcitve, type }) => {
  const Icon = {
    loupe: <LoupeIcon />,
    'arrow-small': <ArrowSmallIcon />,
    'arrow-medium': <ArrowMediumIcon />
  }

  return (
    <button
      onClick={onClick}
      className={cn(className, styles.button, styles[`button_${type}`], isAcitve && styles.button_active)}>
     {Icon[type]}
    </button>
  )
}

export { ToggleButton }
