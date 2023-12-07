const db = require('../db')
const Profiles = require('../models/profiles')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
  const profilesData = [
    {
      profileName: "Kyndal LoCascio",
      profilePhoto: "https://cdn5.vectorstock.com/i/1000x1000/27/74/fisherman-holding-big-fish-by-tail-vector-9462774.jpg",
      profileAboutMe: "Your favorite NYC Programmer, Gamer and Comedian.",
    },
  ]

  await Profiles.insertMany(profilesData)
  console.log('Created Profiles')
}

const run = async () => {
  await main()
//   db.close()
}

run()