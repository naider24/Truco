import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CreateRoom from '../CreateRoomAndLogin/createRoom.jsx'
import Login from '../CreateRoomAndLogin/Login.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  
  {
    path: "/",
    element: <CreateRoom/>,
  },

  {
    path: "/room/:id",
    element: <App/>,
  },

  {
    path: "/enterRoom/:id",
    element: <Login/>,
  },

  
  
 
]);


ReactDOM.createRoot(document.getElementById('root')).render(

  <RouterProvider router={router} />

)
