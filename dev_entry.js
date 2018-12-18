/* Entrypoint for development */

const func = require('./index')
require('dotenv').config()

const { 
  DATA_URL,
  DB_URL,
  TEST_DB_URL,
  NODE_ENV
} = process.env


const context = {
  secrets: {
    DATA_URL,
    DB_URL: NODE_ENV === 'test' ? TEST_DB_URL : DB_URL 
  }
}

const cb = (err, res) => {
  if (err) console.error(err)
  else console.log(res)
}

func(context, cb)