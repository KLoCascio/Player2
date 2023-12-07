const { Schema, model } = require('mongoose')

const matchesSchema = new Schema(
    {
        name: { type: String, required: true },
        photo: { type: String, required: true },
        aboutMe: { type: String, required: true },
        isMatch: { type: Boolean, required: true }
    },
    { timestamps: true }
)

const Matches = model('Matches', matchesSchema)

module.exports = { Matches }