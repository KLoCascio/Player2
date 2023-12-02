// DEPENDENCIES
import React from 'react'
import ReactDOM from 'react-dom/client'
import { 
  createBrowserRouter, 
  RouterProvider,
} from "react-router-dom"

// COMPONENTS
import App from './App.tsx'
import Login from './components/login.tsx'
import Match from './components/match.tsx'
import MatchProfile from './components/matchprofile.tsx'
import Messages from './components/messages.tsx'
import Profile from './components/profile.tsx'
import SignUp from './components/signup.tsx'


// MISC.
import './index.css'

const router = createBrowserRouter([
  {
      path: "/",
      element:<App />,
  },
  {
    path: "/login",
    element:<Login />,
  },
  {
    path: "/match",
    element:<Match />,
  },
  {
    path: "/matchprofile",
    element:<MatchProfile />,
  },
  {
    path: "/messages",
    element:<Messages />,
  },
  {
    path: "/profile",
    element:<Profile />,
  },
  {
    path: "/signup",
    element:<SignUp />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
          <RouterProvider router={router} />
  </React.StrictMode>,
)