import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import BackIcon from "../assets/icons/BackIcon.svg"
import axios from 'axios'

export default function ProfileDetails() {
    const [profile, setProfile] = useState(null)
    const { id } = useParams()

    const handleUpdateProfile = async () => {
        const newName = prompt('Enter Your Name')
        if (newName !== null) {
            try {
                const response = await axios.put('http://localhost:3001/profiles/657129208c52c7bd67138ff3', {
                    profileName: newProfileName,
                })
                
                const updatedProfileName = response.data

                setProfile(updatedProfileName)
            } catch (e) {
                console.error('Error updating name:', e)
            }
        }
    }

    const handleDeleteProfile = async () => {
        try {
            await axios.delete('http://localhost:3001/profiles/657129208c52c7bd67138ff3')
            window.location.href = '/profiles'
        } catch (error) {
            console.error('Error deleting profile:', error)
        }
    }
    
    useEffect(() => {
        const getProfileDetails = async () => {
            try {
                const response = await axios.get('http://localhost:3001/profiles/657129208c52c7bd67138ff3')
                setProfile(response.data)
            } catch (error) {
                console.error('Error Fetching Profile Details:', error)
            }
        }

        getProfileDetails()
    }, [id])

    return profile ? (
        <>
            <div className="profile-details">
                <img className="profile-photo" src={`/${profile.profilePhoto}`} alt="Profile Photo" />
                <h2 className="profile-name">{profile.profileName}</h2>
                <h3 className="profile-aboutMe">{profile.profileAboutMe}</h3>
                
            </div>
            <Link to="/profiles" className="return-link">
                <img src={BackIcon} />
            </Link>
        </>
    ) : (
        <h2 className="Loading">Loading Profile!</h2>
    )
}