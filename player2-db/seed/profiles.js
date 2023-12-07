const db = require('../db')
const Profiles = require('../models/profiles')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
  const profilesData = [
    {
      profileName: "Kyndal LoCascio",
      profilePhoto: "https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg",
      profileAboutMe: "Your favorite NYC Programmer, Gamer and Comedian.",
    },
    {
      profileName: "Zach LoCascio",
      profilePhoto: "https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg",
      profileAboutMe: "Your second favorite NYC Programmer, Gamer and Comedian.",
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