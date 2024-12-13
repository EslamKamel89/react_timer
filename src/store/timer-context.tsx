import { createContext, ReactNode, useContext, useReducer } from "react";

type Timer = {
  name: string;
  duration: number;
};
type TimersState = {
  isRunning: boolean;
  timers: Timer[];
};

const initialState: TimersState = {
  isRunning: false,
  timers: [],
};

type TimersContextValue = TimersState & {
  addTimer: (timerData: Timer) => void;
  startTimers: () => void;
  stopTimers: () => void;
};

export const TimersContext = createContext<TimersContextValue | null>(null);

export function useTimersContext(): TimersContextValue {
  const timerCtx = useContext(TimersContext);
  if (timerCtx == null) {
    throw new Error("Something went wrong");
  }
  return timerCtx;
}

type TimersContextProviderProps = {
  children: ReactNode;
};

type StartTimersAction = {
  type: "START_TIMERS";
};
type StopTimersAction = {
  type: "STOP_TIMERS";
};
type AddTimersAction = {
  type: "ADD_TIMER";
  payload: Timer;
};

type Action = StartTimersAction | StopTimersAction | AddTimersAction;

function timersReducer(state: TimersState, action: Action): TimersState {
  if (action.type == "START_TIMERS") {
    return {
      ...state,
      isRunning: true,
    };
  }
  if (action.type == "ADD_TIMER") {
    return {
      ...state,
      timers: [
        ...state.timers,
        { name: action.payload.name, duration: action.payload.duration },
      ],
    };
  }
  if (action.type == "STOP_TIMERS") {
    return {
      ...state,
      isRunning: false,
    };
  }
  return state;
}

export default function TimerContextPovider({
  children,
}: TimersContextProviderProps) {
  const [timersState, disptach] = useReducer(timersReducer, initialState);
  const ctx: TimersContextValue = {
    timers: timersState.timers,
    isRunning: timersState.isRunning,
    addTimer(timerData: Timer) {
      disptach({ type: "ADD_TIMER", payload: timerData });
    },
    startTimers() {
      disptach({ type: "START_TIMERS" });
    },
    stopTimers() {
      disptach({ type: "STOP_TIMERS" });
    },
  };

  return (
    <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
  );
}
