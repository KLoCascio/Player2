import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

interface Profile {
  _id: string
  profileName: string
  profilePhoto: string
  profileAboutMe: string
}

export default function Profiles() {
    const [profiles, setProfile] = useState<Profile[]>([])
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [profile, setProfileName ] = useState(null)
    const { id } = useParams()

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
            const response = await axios.get('http://localhost:3001/profiles')
            const allProfiles = response.data
            console.log('getProfile:', allProfiles)
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

    const [newProfile, setNewProfile] = useState<Profile>({
      profileName: '',
      profilePhoto: '',
      profileAboutMe: '',
    } as Profile)

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
    
      const handleUpdateProfile = async () => {
        const newProfileName = prompt('Enter the new name:')
        if (newProfileName !== null) {
            try {
                const response = await axios.put(`http://localhost:3001/activities/657129208c52c7bd67138ff3`, {
                    profileName: newProfileName,
                })

                const updatedProfileName = response.data

                setProfileName(updatedProfileName)
            } catch (error) {
                console.error('Error updating activity:', error)
            }
        }
    }

  const handleDeleteProfile = async () => {
    try {
        await axios.delete(`http://localhost:3001/profiles/${id}`)
        window.location.href = '/profiles'
    } catch (error) {
        console.error('Error deleting profile:', error)
    }
}

useEffect(() => {
  const getProfileDetails = async () => {
    try {
      if (!id) {
        return
      }

      const response = await axios.get(`http://localhost:3001/profiles/${id}`)
      setProfile(response.data._id)
      console.log('second:', response.data._id)
    } catch (error) {
      console.error('Error Fetching Profile Details:', error)
    }
  }

  getProfileDetails()
}, [id])


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
                    <div className="details-button-container">
                    <button onClick={handleUpdateProfile} className="update-button">
                        Update
                    </button>
                    <button onClick={handleDeleteProfile} className="delete-button">
                        Delete
                    </button>
                </div>
                  </Link>
                </div>
            ))}
            <button onClick={toggleModal} className="edit-profile-btn">
                    <h3>Create Profile</h3>
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