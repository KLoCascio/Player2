import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from '../App';
import ProfileDetails from './ProfileDetails';
import Profile from './profiles';

interface ProfileType {
  id: string;
  name: string;
  photo: string;
  aboutMe: string;
}

interface MainProps {
  profiles: ProfileType[];
}

const Main: React.FC<MainProps> = (props) => {
  return (
    <div className="routes-container">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/profiles" element={<Profile />} />
        <Route
          path="/profiles/:id"
          element={<ProfileDetails profiles={props.profiles} />}
        />
      </Routes>
    </div>
  );
};

export default Main;
