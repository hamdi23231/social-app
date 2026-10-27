import { Navigate } from "react-router-dom"

 import type { ReactNode } from "react"

export default function Protectroute({ children }: { children: ReactNode }) {



    if(localStorage.getItem("userToken"))
     return <Navigate  to={"/home"} />
  return (
    <div>
     {children} 
    </div>
  )
}
