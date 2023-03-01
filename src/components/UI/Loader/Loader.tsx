import cn from 'classnames'
import { FC } from 'react'
import styles from './Loader.module.scss'

interface Props {
  className?: string
}

const Loader: FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <div className={cn(styles['reverse-spinner'])} />
    </div>
  )
}

export { Loader }
