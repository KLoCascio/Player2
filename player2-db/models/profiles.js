const { Schema, model } = require('mongoose')

const profileSchema = new Schema(
    {
        name: { type: String, required: true },
        photo: { type: String, required: true },
        aboutMe: { type: String, required: true },
    },
    { timestamps: true }
)

const Profiles = model('Profiles', profileSchema)

module.exports = { Profiles }