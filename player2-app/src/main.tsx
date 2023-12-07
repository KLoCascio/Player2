// DEPENDENCIES
import React from 'react'
import ReactDOM from 'react-dom/client'
import { 
  createBrowserRouter, 
  RouterProvider,
} from "react-router-dom"

// COMPONENTS
import App from './App.tsx'
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'
import Login from './components/login.tsx'
import Match from './components/match.tsx'
import MatchProfile from './components/matchprofile.tsx'
import Messages from './components/messages.tsx'
import Profiles from './components/profiles.tsx'
import SignUp from './components/signup.tsx'

// MISC.
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <>
        <Header />
        <App />
      </>
  },
  {
    path: "/login",
    element:
      <>
        <Header />
        <Login />
      </>
  },
  {
    path: "/match",
    element:
      <>
        <Header />
        <Match />
        <Footer />
      </>
  },
  {
    path: "/matchprofile",
    element:
      <>
        <Header />
        <MatchProfile />
        <Footer />
      </>
  },
  {
    path: "/messages",
    element:
      <>
        <Header />
        <Messages />
        <Footer />
      </>
  },
  {
    path: "/profile",
    element:
      <>
        <Header />
        <Profiles />
        <Footer />
      </>
  },
  {
    path: "/signup",
    element:
      <>
        <Header />
        <SignUp />
      </>
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)