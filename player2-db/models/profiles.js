const { Schema, model } = require('mongoose')

const profilesSchema = new Schema(
    {
        name: { type: String, required: true },
        photo: { type: String, required: true },
        aboutMe: { type: String, required: true },
    },
    { timestamps: true }
)

const Profiles = model('Profiles', profilesSchema)

module.exports = Profiles