const { Matches } = require('../models/matches')

async function getMatch(req, res) {
    try {
        const matches = await Matches.find()
        res.status(200).send(matches)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

async function getMatchById(req, res) {
    try {
        const match = await Matches.findById(req.params.id)
        res.status(200).send(match)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

async function createMatch(req, res) {
    try {
        const newMatch = await new Matches(req.body)
        newMatch.save()
        return res.status(201).json(newMatch)
    } catch (e) {
        console.error('Error creating Match:', e)
        console.error('Request Body:', req.body)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function updateMatch(req, res) {
    try {
        const id = req.params.id
        const updatedMatch = await Matches.findByIdAndUpdate(id, req.body, { new: true })
        if (updatedMatch) {
            return res.status(200).json(updatedMatch)
        }
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

async function deleteMatch(req, res) {
    try {
        const id = req.params.id
        const deletedMatch = await Matches.findByIdAndDelete(id, req.body, { new: true })
        if (deletedMatch) {
            return res.status(200).send('Match Deleted')
        }
        throw new Error("Match not found")
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

module.exports = {
    getMatch,
    getMatchById,
    createMatch,
    updateMatch,
    deleteMatch
}
