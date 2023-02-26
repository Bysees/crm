import { FC } from 'react'
import { Sidebar } from 'components/Sidebar'
import { Header } from 'components/Header'
import { CallsPage } from 'src/pages/CallsPage'
import styles from './App.module.scss'

const App: FC = () => {
  return (
    <div className={styles.layout}>
      <Sidebar className={styles.layout__sidebar} />
      <Header className={styles.layout__header} />
      <CallsPage className={styles.layout__content} />
    </div>
  )
}

export { App }
