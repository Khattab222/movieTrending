
import './App.css';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom'
import Root from './Root';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import People from './Components/People/People';
import Network from './Components/Network/Network';
import Notfound from './Components/Notfound/Notfound';
import jwt_decode from "jwt-decode";
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import { useState, useEffect } from 'react';
import ItemDetails from './Components/ItemDatails/ItemDetails';
import PersonDetails from './Components/PersonDetails/PersonDetails.jsx';
import TvDetails from './Components/TvDetails/TvDetails.jsx';
import { Provider } from 'react-redux';
import store from './readux/store';

function App() {
 

  useEffect(() => {
    if (localStorage.getItem('user') !== null) {
      getusertoken()
    }
 
  }, [])
  
function Protection(props) {
  if (localStorage.getItem('user') === null) {
    return <Navigate to='/'/>
  }else{
    return props.children
  }
}
  const [userdata, setUserdata] = useState(null);


  let Router = createBrowserRouter([
    {path:'/' ,element:<Root userdata={userdata} logOut={logOut} />, children:[
      {path:'home', element: <Protection> <Home/> </Protection> },
      {path:'register', element:<Register/> },
      {index:true, element: <Login getusertoken={getusertoken}/>},
      {path:'people', element: <Protection> <People/> </Protection>},
      {path:'network', element: <Protection> <Network/> </Protection>},
      {path:'home', element: <Protection> <Home/> </Protection>},
      {path:'datails/:id', element:<Protection> <ItemDetails/> </Protection>},
      {path:'persondetails/:id', element:<Protection> <PersonDetails/> </Protection>},
      {path:'tvdetails/:id', element:<Protection> <TvDetails/> </Protection>},
      {path:'*', element: <Notfound/>},
      
      {path:'movies', element: <Protection> <Movies/> </Protection>},
    ]}
  ])
  

  function getusertoken() {
    let usercode = localStorage.getItem('user');
    var decoded = jwt_decode(usercode);
 
    setUserdata(decoded)

  }


  function logOut() {
    localStorage.removeItem('user');
    setUserdata(null)
    
  }

  return (
    < >
    <Provider store={store}>
     <RouterProvider router={Router}/>
     </Provider>
    </>
  );
}

export default App;
