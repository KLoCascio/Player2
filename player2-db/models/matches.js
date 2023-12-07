const { Schema, model } = require('mongoose')

const matchesSchema = new Schema(
    {
        profileName: { type: String, required: true },
        profilePhoto: { type: String, required: true },
        profileAboutMe: { type: String, required: true },
        isMatch: { type: Boolean, required: true }
    },
    { timestamps: true }
)

const Matches = model('Matches', matchesSchema)

module.exports = Matches