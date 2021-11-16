const { connect, connection } = require('mongoose')
const config = require('../config/dev')
const fakedb = require('./fakedb')
const Portfolio = require('../database/models/portfolio.model')

connect(config.DB_URI, async () => {
  console.log(`>>> START Populating DB ...`)
  // await fakedb.populate()
  const count = await Portfolio.count({ location: 'Asia' })
  console.log('there are %d asian location', count)
  await connection.close()
  console.log(`>>> FINISHED Populating DB ...`)
})
