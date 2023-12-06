const db = require('../db')
const Matches = require('../models/matches')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
  const matchesData = [
    {
        name: "Danny McTinder",
        photo: "https://www.realmenrealstyle.com/wp-content/uploads/2023/10/Essential-Pieces-for-Cottagecore-linen-shirt-suspenders.jpg",
        aboutMe: "Danny is the man.",
        isMatch: true,
    },
    {
        name: "Amanda Tori Meeting",
        photo: "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2023/04/20/16819946402834.jpg",
        aboutMe: "Amanda is the woman.",
        isMatch: true,
    },
    {
        name: "Justin Time",
        photo: "https://nypost.com/wp-content/uploads/sites/2/2022/02/men-fishing-3.jpg?quality=90&strip=all",
        aboutMe: "Justin is the fisherman.",
        isMatch: false,
    },
  ]

  await Matches.insertMany(matchesData)
  console.log('Created Matches')
}

const run = async () => {
  await main()
//   db.close()
}

run()