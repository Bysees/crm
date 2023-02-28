import { FC } from 'react'
import cn from 'classnames'
import { getDateTime, getDisplayDateTime } from 'src/utils/time'
import { ToggleButton } from 'components/UI/ToggleButton'
import styles from './Header.module.scss'
import globalStyles from 'styles/global.module.scss'

import ava from 'images/ava.png'

interface Props {
  className?: string
}

const Header: FC<Props> = ({ className }) => {
  const username = 'ИП Сидорова Александра Михайловна'
  const avatar = ava

  const dateDispay = getDisplayDateTime(new Date())
  const dateTime = getDateTime(new Date())

  return (
    <header className={cn(className, styles.wrapper)}>
      <div className={cn(globalStyles.container, styles.container)}>
        <time className={styles.date} dateTime={dateTime}>
          {dateDispay}
        </time>

        <div className={styles.bars}>
          <div className={cn(styles.bars__item, styles.bars__item_green)}>
            <p>
              Новые звонки <span>20 из 30</span>
            </p>
            <progress value={(20 / 30) * 100} max={100}></progress>
          </div>

          <div className={cn(styles.bars__item, styles.bars__item_yellow)}>
            <p>
              Качество разговоров <span>40%</span>
            </p>
            <progress value={40} max={100}></progress>
          </div>

          <div className={cn(styles.bars__item, styles.bars__item_red)}>
            <p>
              Коверсия заказов <span>67%</span>
            </p>
            <progress value={67} max={100}></progress>
          </div>
        </div>

        <ToggleButton onClick={() => {}} isAcitve={false} className={styles.searchButton} type='loupe' />

        <div className={styles.username}>
          <span> {username}</span>
          <ToggleButton onClick={() => {}} isAcitve={false}  className={styles.arrowButton} type='arrow-medium' />
        </div>

        <div className={styles.avatar}>
          <img src={avatar} alt='user avatar' />
        </div>
        <ToggleButton onClick={() => {}} isAcitve={false} className={styles.arrowButton} type='arrow-small' />
      </div>
    </header>
  )
}

export { Header }
