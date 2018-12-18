const axios = require('axios')
const queueFilter = require('./queueFilter')
const detailsFilter = require('./detailsFilter')

module.exports = async (context, cb) => {
  const { DATA_URL } = context.secrets
  const { data } = await axios.get(DATA_URL)
  const result = await main(data)
  cb(null, result)
}

const main = async (data) => {
  return data.map(detailsFilter)
} 

