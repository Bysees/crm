import { FC, MouseEventHandler, useLayoutEffect, useRef, useState } from 'react'
import styles from './CustomAudio.module.scss'

import { ReactComponent as PlayIcon } from 'icons/audio/play.svg'
import { ReactComponent as StopIcon } from 'icons/audio/stop.svg'
import { ReactComponent as ResetIcon } from 'icons/audio/reset.svg'
import { ReactComponent as LoadIcon } from 'icons/audio/load.svg'
import { secondsToMinutes } from 'src/utils/time'

interface Props {
  src: string
  type: string
}

const CustomAudio: FC<Props> = ({ src, type }) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)
  const progressRef = useRef<HTMLProgressElement>(null)
  const spanRef = useRef<HTMLSpanElement>(null)
  const divRef = useRef<HTMLDivElement>(null)

  const download = () => {
    if (!audioRef.current) return

    const link = document.createElement('a')
    link.href = src
    link.download = 'record.mp3'
    link.click()
    link.remove()
  }

  const play = () => {
    if (!audioRef.current) return
    if (isPlaying) return

    audioRef.current.play()
    setIsPlaying(true)
  }

  const stop = () => {
    if (!audioRef.current) return
    if (!isPlaying) return

    audioRef.current.pause()
    setIsPlaying(false)
  }

  const reset = () => {
    if (!audioRef.current) return
    if (!progressRef.current) return

    audioRef.current.pause()
    audioRef.current.currentTime = 0
    progressRef.current.value = 0
    setIsPlaying(false)
  }

  const changeCurrentTime: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!audioRef.current) return
    if (!progressRef.current) return

    const stepWidth = progressRef.current.max / progressRef.current.clientWidth
    const offsetDistance = e.clientX - e.currentTarget.offsetLeft
    const currentTime = stepWidth * offsetDistance

    audioRef.current.currentTime = currentTime
  }

  const showCurrentTime: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!progressRef.current) return
    if (!audioRef.current) return
    if (!spanRef.current) return

    const stepWidth = progressRef.current.max / progressRef.current.clientWidth
    const offsetDistance = e.clientX - e.currentTarget.offsetLeft

    if (
      offsetDistance < 0 ||
      offsetDistance > progressRef.current.clientWidth
    ) {
      return
    }

    const currentTime = stepWidth * offsetDistance
    const currentTimeText = secondsToMinutes(+currentTime.toFixed(0))

    spanRef.current.style.transform = `translateX(${offsetDistance - 10}px)`
    spanRef.current.textContent = currentTimeText
  }

  let isMousePressed = false

  const handleMouseUp: MouseEventHandler = () => {
    isMousePressed = false
  }

  const handleMouseLeave: MouseEventHandler = () => {
    isMousePressed = false
  }

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    isMousePressed = true
    changeCurrentTime(e)
  }

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    showCurrentTime(e)

    if (isMousePressed) {
      changeCurrentTime(e)
    }
  }

  useLayoutEffect(() => {
    if (!audioRef.current) return
    if (!progressRef.current) return
    if (!divRef.current) return

    const audioEl = audioRef.current
    const progressEl = progressRef.current
    const divEl = divRef.current

    let totalAudioTime = 0

    function onLoadedData(this: HTMLAudioElement) {
      progressEl.max = this.duration
      totalAudioTime = this.duration
      const durationTime = secondsToMinutes(+this.duration.toFixed(0))
      divEl.textContent = durationTime
    }

    function onTimeUpdate(this: HTMLAudioElement) {
      progressEl.value = this.currentTime
      const restTime = totalAudioTime - this.currentTime
      divEl.textContent = secondsToMinutes(+restTime.toFixed(0))
    }

    audioEl.addEventListener('loadeddata', onLoadedData)
    audioEl.addEventListener('timeupdate', onTimeUpdate)
    audioEl.addEventListener('ended', reset)

    return () => {
      audioEl.removeEventListener('loadeddata', onLoadedData)
      audioEl.removeEventListener('timeupdate', onTimeUpdate)
      audioEl.removeEventListener('ended', reset)
    }
  }, [])

  return (
    <div className={styles.audio}>
      <audio ref={audioRef}>
        <source src={src} type={type} />
        Your browser does not support the <code>audio</code> element.
      </audio>

      <div className={styles.audio__time} ref={divRef} />

      {isPlaying ? (
        <button onClick={stop} className={styles.audio__stop}>
          <StopIcon className={styles.stop_icon} />
        </button>
      ) : (
        <button onClick={play} className={styles.audio__play}>
          <PlayIcon className={styles.play_icon} />
        </button>
      )}

      <div
        className={styles.audio__progress}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}>
        <span ref={spanRef} />
        <progress ref={progressRef} />
      </div>

      <button className={styles.audio__download} onClick={download}>
        <LoadIcon />
      </button>

      <button onClick={reset} className={styles.audio__reset}>
        <ResetIcon />
      </button>
    </div>
  )
}

export { CustomAudio }
