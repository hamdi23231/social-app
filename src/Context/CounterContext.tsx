import { createContext, type ReactNode , useState } from "react"

export const CounterContext = createContext<any>(undefined)

export default function CounterContextProvider({ children }: { children: ReactNode }) {

  const [counter, setcounter] = useState(0);

  function sayHello() {
    console.log("hello");
  }

  return (
    <CounterContext.Provider value={{ counter, setcounter, sayHello }}>
      {children}
    </CounterContext.Provider>
  );
}