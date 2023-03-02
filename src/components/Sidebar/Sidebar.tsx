import { FC, useState } from 'react'
import cn from 'classnames'
import { Button } from 'components/UI/Button'
import styles from './Sidebar.module.scss'

import logo from 'icons/logo.svg'
import result from 'icons/result.svg'
import offer from 'icons/offer.svg'
import message from 'icons/message.svg'
import call from 'icons/call.svg'
import agent from 'icons/agent.svg'
import document from 'icons/document.svg'
import executor from 'icons/executor.svg'
import report from 'icons/report.svg'
import dataset from 'icons/dataset.svg'
import setting from 'icons/setting.svg'

interface Props {
  className?: string
}

const navList = [
  { icon: result, title: 'итоги' },
  { icon: offer, title: 'заказы' },
  { icon: message, title: 'сообщения' },
  { icon: call, title: 'звонки' },
  { icon: agent, title: 'контрагенты' },
  { icon: document, title: 'документы' },
  { icon: executor, title: 'исполнители' },
  { icon: report, title: 'отчёты' },
  { icon: dataset, title: 'база знаний' },
  { icon: setting, title: 'настройки' }
] as const

type Titles = typeof navList[number]['title']

const Sidebar: FC<Props> = ({className}) => {
  const [activeItem, setActiveItem] = useState<Titles>('звонки')

  return (
    <aside className={cn(className, styles.wrapper)}>
      <nav>
        <img className={styles.logo} src={logo} alt='logo' />

        <ul className={styles.list}>
          {navList.map(({ icon, title }) => (
            <li
              onClick={() => setActiveItem(title)}
              key={title}
              className={cn(
                styles.list__item,
                activeItem === title && styles.list__item_active
              )}>
              <img src={icon} alt={`icon ${title}`} />
              <span>{title}</span>
            </li>
          ))}
        </ul>

        <Button className={styles.addButton} onClick={() => {}} type='plus'>
          Добавить заказ
        </Button>
        <Button className={styles.offerButton} onClick={() => {}} type='alarm'>
          Оплата
        </Button>
      </nav>
    </aside>
  )
}

export { Sidebar }
