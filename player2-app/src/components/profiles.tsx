import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Profiles() {
    const [profiles, setProfile] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false)

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible)
    }

    const closeOnOutsideClick = (e) => {
        if (isModalVisible && !e.target.closest('.edit-profile')) {
            setIsModalVisible(false)
        }
    }


    useEffect(() => {
        const getProfile = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/profiles`)
            const allProfiles = response.data
            setProfile(allProfiles)
          } catch (error) {
            console.error('Error fetching and sorting Profiles:', error)
          }
        }
        getProfile()
      }, [])

    useEffect(() => {
        document.addEventListener('mousedown', closeOnOutsideClick)
        return () => {
            document.removeEventListener('mousedown', closeOnOutsideClick)
        }
    }, [isModalVisible])

    const [newProfile, setNewProfile] = useState({
        profileName: '',
        profilePhoto: '',
        profileAboutMe: '',
      })

    const handleInputChange = (e) => {
        const { id, value } = e.target
        console.log(`id: ${id}, value: ${value}`)
        setNewProfile((prevProfile) => ({
            ...prevProfile,
            [id]: value,
        }))
    }

    const handleAddProfile = async () => {
        const { profileName, profilePhoto, profileAboutMe } = newProfile
    
        try {
          if (!profileName) {
            console.error('Name is required.')
            return
          }
          const response = await axios.post('http://localhost:3001/profiles', {
            profileName,
            profilePhoto,
            profileAboutMe,
          })
          const newProfileData = response.data
          setProfile((prevProfiles) => [newProfileData, ...prevProfiles])
          toggleModal()
        } catch (error) {
          console.error('Error adding profile:', error)
        }
      }

    return (
        <div className="Profile">
            {profiles &&
                profiles.map((profile) => (
                <div key={profile._id} className="profile-card">
                    <Link to={`/profiles/${profile._id}`} key={profile._id} className="profile-card">
                    <div className="profile">
                        <h2 className="profile-name">{profile.profileName}</h2>
                        <img className="profile-photo" src={profile.profilePhoto} alt="Profile Photo" />
                        <h3 className="profile-aboutMe">{profile.profileAboutMe}</h3>
                    </div>
                  </Link>
                </div>
            ))}

                <button onClick={toggleModal} className="edit-profile-btn">
                    <h3>Edit Profile</h3>
                </button>

                {isModalVisible && (
                    <div id="profile-modal" className="profile-modal">
                        <div className="edit-profile">
                            <h3>Name:</h3>
                            <input
                                name="string"
                                type="text"
                                id="profileName"
                                className="custom-input"
                                value={newProfile.profileName}
                                onChange={handleInputChange}
                            />
                            <h3>Photo:</h3>
                            <input
                                name="string"
                                type="text"
                                id="profilePhoto"
                                className="custom-input"
                                value={newProfile.profilePhoto}
                                onChange={handleInputChange}
                            />
                            <h3>AboutMe:</h3>
                            <input
                                name="string"
                                type="text"
                                id="profileAboutMe"
                                className="custom-input"
                                value={newProfile.profileAboutMe}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="add-profile-btn-container">
                            <button onClick={handleAddProfile} className="add-profile-btn">
                                Save
                            </button>
                        </div>
                    </div>
                    )}
            </div>
    )}