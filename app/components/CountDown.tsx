import { useEffect, useState } from "react";

interface Props {
  from: number
  callback: Function
}

export const CountDown = ({ from, callback }:Props) => {
  const [time, setTime] = useState(from)
  let timer: NodeJS.Timeout;

  const iterate = () => {
    setTime(time - 1)
    if (time > 0) {
      timer = setTimeout(iterate, 1000)
    } else {
      callback()
    }
  }

  useEffect(() => {
    if (timer) clearTimeout(timer)
    if (time > 0) {
      timer = setTimeout(iterate, 1000)
    } else {
      callback()
    }
    return () => clearTimeout(timer);
  }, [time]);
  
  return (
    <span>{`${time}s`}</span>
  )
}