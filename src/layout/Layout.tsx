 
import Footer from '../component/Footer/Footer'
import Navbar from '../component/Navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return <>
      <Navbar/>


 
<div className= "container mx-auto px-4 pt-20">
<Outlet/>
 </div>

<Footer/>



    </>
  
}
