/* Entrypoint for development */

const func = require('./index')
require('dotenv').config()

const { DATA_URL } = process.env

const context = {
  secrets: {
    DATA_URL
  }
}

const cb = (err, res) => {
  if (err) console.error(err)
  else console.log(res)
}

func(context, cb)