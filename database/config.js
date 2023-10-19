const mongoose = require('mongoose')

const MONGO_DB_CDN = process.env.MONGO_DB_CDN

const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_DB_CDN)

    console.log('DB online')
  } catch (err) {
    throw new Error('Something went wrong when trying to connect to DB:', err)
  }
}

module.exports = {
  dbConnection
}
