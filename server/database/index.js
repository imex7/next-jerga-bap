const mongoose = require('mongoose')
const config = require('../config/dev')

exports.connect = () => {
  mongoose.connect(config.DB_URI, () => {
    console.log(`>>> Connection successfull!!!`)
  })
}
