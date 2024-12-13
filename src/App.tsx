import AddTimer from "./components/AddTimer.tsx";
import Header from "./components/Header.tsx";
import Timers from "./components/Timers.tsx";
import TimerContextPovider from "./store/timer-context.tsx";

function App() {
  return (
    <TimerContextPovider>
      <Header />
      <main>
        <AddTimer />
        <Timers />
      </main>
    </TimerContextPovider>
  );
}

export default App;
