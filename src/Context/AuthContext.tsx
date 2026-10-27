import { createContext, useEffect, useState , type Dispatch , type ReactNode, type SetStateAction } from "react"
import {jwtDecode} from "jwt-decode"

type AuthContextType = {
  userLogin : string | null,
  setuserLogin : Dispatch<SetStateAction <string | null>>,
userId : string,

}
 // eslint-disable-next-line react-refresh/only-export-components
 export const AuthContext=createContext<AuthContextType>({
userLogin : null,
setuserLogin :()=> {},
userId : "",

 });

export default function AuthContextProvider({children} : {children : ReactNode} ) {

 const [userLogin, setuserLogin] = useState<string | null>(() => localStorage.getItem("userToken"))
 
 const [userId, setuserId] = useState("")
useEffect(() => {
  const token = localStorage.getItem("userToken")
  if(token){
    const {user} : {user :string} = jwtDecode(token)

  setuserId(user)

  }
} , [userLogin])

 
  return (
    <>

     <AuthContext.Provider value={{userLogin, setuserLogin , userId}}>
{children}

     </AuthContext.Provider>

    </>
  )
}
