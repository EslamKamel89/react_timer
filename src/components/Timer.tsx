import { useEffect, useRef, useState } from "react";
import {
  Timer as TimerProps,
  useTimersContext,
} from "../store/timer-context.tsx";
import Container from "./UI/Container.tsx";

export default function Timer({ name, duration }: TimerProps) {
  const [remainingTime, setRemainingTime] = useState(duration * 1000);
  const interval = useRef<number>();
  const timerCtx = useTimersContext();

  if (remainingTime <= 0) {
    clearInterval(interval.current);
  }
  useEffect(() => {
    let timer: number | undefined;
    if (timerCtx.isRunning) {
      timer = setInterval(() => {
        setRemainingTime((prev) => prev - 50);
      }, 50);
      interval.current = timer;
    } else {
      if (timer) clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [timerCtx.isRunning]);
  const formatedRemainingTime = (remainingTime / 1000).toFixed(2);
  return (
    <Container as="article">
      <h2>{name}</h2>
      <p>{`Duration: ${duration} seconds`}</p>
      <p>{`Remaining Time: ${formatedRemainingTime} seconds`}</p>
      <p>
        <progress max={duration * 1000} value={remainingTime} />
      </p>
    </Container>
  );
}
// Moustafa@97
