import { FC, MouseEventHandler, useState } from 'react'
import cn from 'classnames'
import { ApiService } from 'service/api'
import { ICall } from 'types/Call'
import { transformPhone } from 'src/utils/phone'
import { getTimeOnly, secondsToMinutes } from 'src/utils/time'
import { CustomAudio } from 'components/CustomAudio'
import { Checkbox } from 'components/UI/Checkbox'
import { Loader } from 'components/UI/Loader'
import styles from './Calls.module.scss'

import { ReactComponent as IncomingIcon } from 'icons/incoming.svg'
import { ReactComponent as OutgoingIcon } from 'icons/outgoing.svg'
import { ReactComponent as WebIcon } from 'icons/web.svg'
import mockAvatar from 'images/ava2.png'

interface Props extends ICall {
  isCheked: boolean
  toggleCheckbox: (id: number) => void
}

const CallItem: FC<Props> = ({
  toggleCheckbox,
  isCheked,
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
  const hasRecord = !!record

  const [audio, setAudio] = useState<Blob | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isShowAudio, setIsShowAudio] = useState(false)

  const loadAudio = async () => {
    if (hasRecord && !isLoading) {
      setIsLoading(true)

      const audio = await ApiService.getRecord(record, partnership_id)
      setAudio(audio)

      setIsLoading(false)
    }
  }

  const showAudio = async () => {
    if (!audio) {
      await loadAudio()
    }

    setIsShowAudio(true)
  }

  const hideAudio: MouseEventHandler = (e) => {
    e.stopPropagation()
    setIsShowAudio(false)
  }

  return (
    <div className={cn(styles.row, styles.row_content)}>
      <Checkbox
        onChange={() => toggleCheckbox(id)}
        checked={isCheked}
        id={String(id)}
      />

      <div className={cn(isFailedCall && styles.failed)}>
        {isIncoming ? <IncomingIcon /> : <OutgoingIcon />}
      </div>

      <div>{getTimeOnly(date)}</div>

      <div className={styles.employee}>
        <img className={styles.employee__ava} src={avatarSrc} alt='avatar' />
        {from_site === 0 && <WebIcon className={styles.employee__webIcon} />}
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

      <div
        className={cn(
          styles.duration,
          styles.row__duration,
          hasRecord && styles.pointer
        )}
        onClick={showAudio}>
        {isLoading ? (
          <Loader className={styles.duration__loader} />
        ) : (
          <>
            {isShowAudio && audio && (
              <CustomAudio
                src={URL.createObjectURL(audio)}
                type={'audio/mpeg'}
                onHide={hideAudio}
              />
            )}
            {!isShowAudio && hasRecord && <div>{secondsToMinutes(time)}</div>}
          </>
        )}
      </div>
    </div>
  )
}

export { CallItem }
