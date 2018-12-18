const axios = require('axios')
const detailsFilter = require('./detailsFilter')
const shopController = require('./controllers/shop')
const mongoose = require('mongoose')

module.exports = async (context, cb) => {
  const { DATA_URL, DB_URL } = context.secrets
  await mongoose.connect(DB_URL)
  console.log('connected to db')

  const { data } = await axios.get(DATA_URL)
  const result = await main(data)
  await mongoose.disconnect()
  console.log('disconnected from db')
  cb(null, result)
}

const main = async (data) => {
  const jsonLength = data.length

  const filteredData = data
    .map(detailsFilter)
    .filter(res => res !== null)

  const filteredLength = filteredData.length
  const dbCountBefore = await shopController.count()
  for (const shop of filteredData) {
    await shopController.updateOrCreate(shop)
  }

  const dbCountAfter = await shopController.count()

  return { jsonLength, filteredLength, dbCountBefore, dbCountAfter }
}