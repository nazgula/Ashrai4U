import { useState, useEffect } from 'react'

type TTimerProps = {
  initMinute?: number
  initSeconds?: number
  onEndTimer: () => void
  onReset?: () => void
}

export const Timer = ({
  initMinute = 4,
  initSeconds = 59,
  onReset,
  onEndTimer,
}: TTimerProps) => {
  const [minutes, setMinutes] = useState(initMinute)
  const [seconds, setSeconds] = useState(initSeconds)

  useEffect(() => {
    setMinutes(4)
    setSeconds(59)
  }, [onReset])

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval)
        } else {
          setMinutes(minutes - 1)
          setSeconds(59)
        }
      }
      if (seconds === 0 && minutes === 0) {
        onEndTimer()
      }
    }, 1000)
    return () => {
      clearInterval(myInterval)
    }
  })

  return (
    <span className="timer">
      {minutes < 10 ? `0${minutes}` : minutes}:
      {seconds < 10 ? `0${seconds}` : seconds}
    </span>
  )
}
