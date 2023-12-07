const { Profiles } = require('../models/profiles')

async function getProfile(req, res) {
    try {
        const profiles = await Profiles.find()
        res.status(200).send(profiles)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

async function getProfileById(req, res) {
    try {
        const profile = await Profiles.findById(req.params.id)

        if (!profile) {
            // If the profile with the given ID is not found, send a 404 response.
            return res.status(404).json({ error: 'Profile not found' })
        }

        res.status(200).send(profile)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

async function createProfile(req, res) {
    try {
        const newProfile = await new Profiles(req.body)
        newProfile.save()
        return res.status(201).json(newProfile)
    } catch (e) {
        console.error('Error creating Profile:', e)
        console.error('Request Body:', req.body)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function updateProfile(req, res) {
    try {
        const id = req.params.id
        const updatedProfile = await Profiles.findByIdAndUpdate(id, req.body, { new: true })

        if (updatedProfile) {
            return res.status(200).json(updatedProfile)
        }

        // If the profile with the given ID is not found, send a 404 response.
        return res.status(404).json({ error: 'Profile not found' })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

async function deleteProfile(req, res) {
    try {
        const id = req.params.id
        const deletedProfile = await Profiles.findByIdAndDelete(id)

        if (deletedProfile) {
            return res.status(200).send('Profile Deleted')
        }

        // If the profile with the given ID is not found, send a 404 response.
        return res.status(404).json({ error: 'Profile not found' })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

module.exports = {
    getProfile,
    getProfileById,
    createProfile,
    updateProfile,
    deleteProfile
}
