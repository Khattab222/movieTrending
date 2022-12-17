import React from 'react'
import Navbar from './Components/Navbar/Navbar'

import {Outlet} from 'react-router-dom'

export default function Root({userdata,logOut}) {
  return (
    <div>
      <Navbar userdata={userdata} logOut={logOut}/>
     <div className="container my-5">
     <Outlet/>
     </div>
    </div>
  )
}
