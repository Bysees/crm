import { FC, MouseEventHandler, useState } from 'react'
import cn from 'classnames'
import { ApiService } from 'src/service/api'
import { ICall } from 'src/types/Call'
import { transformPhone } from 'src/utils/phone'
import { getTimeOnly, secondsToMinutes } from 'src/utils/time'
import { CustomAudio } from 'components/CustomAudio'
import { Checkbox } from 'components/UI/Checkbox'
import styles from './Calls.module.scss'

import { ReactComponent as Incoming } from 'icons/incoming.svg'
import { ReactComponent as Outgoing } from 'icons/outgoing.svg'
import web from 'icons/web.svg'
import mockAvatar from 'images/ava2.png'
import { Loader } from 'src/components/UI/Loader'

interface Props extends ICall {}

const CallItem: FC<Props> = ({
  id,
  in_out,
  date,
  person_avatar,
  from_number,
  source,
  time,
  status,
  errors,
  from_site,
  partnership_id,
  record,
  person_name
}) => {
  const hasPersonName = !person_name.includes('**')
  const hasAvatar = !person_avatar.includes('noavatar.jpg')
  const avatarSrc = hasAvatar ? person_avatar : mockAvatar
  const hasError = !!errors[0]
  const isIncoming = in_out === 1
  const isFailedCall = status === 'Не дозвонился'
  const isSuccessCall = status === 'Дозвонился'

  const [audio, setAudio] = useState<Blob | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isShowAudio, setIsShowAudio] = useState(false)

  const hideAudio: MouseEventHandler = (e) => {
    e.stopPropagation()
    setIsShowAudio(false)
  }

  const loadAudio = async () => {
    if (record && !isLoading) {
      setIsLoading(true)

      const audio = await ApiService.getRecord(record, partnership_id)
      setAudio(audio)

      setIsLoading(false)
    }
  }

  const showAudio = async () => {
    if (audio) {
      setIsShowAudio(true)
    }

    if (!audio) {
      await loadAudio()
      setIsShowAudio(true)
    }
  }

  return (
    <div
      className={cn(styles.row, styles.row_content, record && styles.pointer)}
      onClick={showAudio}>
      <Checkbox checked={false} id={String(id)} />

      <div>
        {isIncoming ? (
          <Incoming className={cn(isFailedCall && styles.missed)} />
        ) : (
          <Outgoing className={cn(isFailedCall && styles.missed)} />
        )}
      </div>

      <div>{getTimeOnly(date)}</div>

      <div className={styles.employee}>
        <img className={styles.employee__ava} src={avatarSrc} alt='avatar' />
        {from_site === 0 && (
          <img className={styles.employee__webIcon} src={web} alt='icon web' />
        )}
      </div>

      <div className={styles.call}>
        {hasPersonName && (
          <div className={styles.call__name}>{person_name}</div>
        )}
        <div
          className={cn(
            styles.call__number,
            hasPersonName && styles.call__number_secondary
          )}>
          {transformPhone(from_number)}
        </div>
      </div>

      <div className={styles.source}>{source}</div>

      <div className={styles.grade}>
        {hasError && <div className={styles.grade__error}>{errors[0]}</div>}
      </div>

      <div className={cn(styles.duration, styles.row__duration)}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {isShowAudio && audio && (
              <CustomAudio
                src={URL.createObjectURL(audio)}
                type={'audio/mpeg'}
                onHide={hideAudio}
              />
            )}
            {!isShowAudio && isSuccessCall && (
              <div> {secondsToMinutes(time)}</div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export { CallItem }
