import { FC } from 'react'
import cn from 'classnames'
import styles from './Crumbs.module.scss'

interface Props {
  className?: string
  type: 'bad' | 'good' | 'great'
}

const Crumbs: FC<Props> = ({ type = 'great', className }) => {
  return (
    <div className={cn(className, styles.crumbs, styles[`crumbs_${type}`])}>
      <span />
      <span />
      <span />
    </div>
  )
}

export { Crumbs }
