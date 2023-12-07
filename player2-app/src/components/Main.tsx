import React from 'react'
import { Route, Routes } from 'react-router-dom'
import App from '../App'
import ProfileDetails from './ProfileDetails'
import Profiles from './profiles'

interface YourProfileType {
    id: string
    name: string
    photo: string
    aboutMe: string
    // Add other properties as needed
}

interface MainProps {
    profiles: YourProfileType[]
}

const Main: React.FC<MainProps> = (props) => {
    return (
        <div className="routes-container">
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/profiles" element={<Profiles profiles={props.profiles} />} />
                <Route path="/profiles/:id" element={<ProfileDetails />} />
            </Routes>
        </div>
    )
}

export default Main