const { Schema, model } = require('mongoose')

const profileSchema = new Schema(
    {
        profileName: { type: String, required: true },
        profilePhoto: { type: String, required: true },
        profileAboutMe: { type: String, required: true },
    },
    { timestamps: true }
)

const Profiles = model('Profiles', profileSchema)

module.exports = { Profiles }