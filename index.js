const axios = require('axios')

module.exports = async (context, cb) => {
  const { DATA_URL } = context.secrets
  const { data } = await axios.get(DATA_URL)
  const result = await main(data)
  cb(null, result)
}

const main = async (data) => {
  return data.map(queueFilter)
} 

const queueFilter = ({ slug, queue }) => {
  const { count, names } = queue
  if (typeof(count) === 'string') {
    // it probably reads 'closed'
    return {
      slug,
      total: 0,
      silver: 0,
      gold: 0,
      platinium: 0,
      other: 0
    }
  } else {
    // who knows. field "names" is null atm.
    return {
      slug,
      total: count,
      silver: 0,
      gold: 0,
      platinium: 0,
      other: 0
    }
  }
}
