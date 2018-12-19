const index = require('./../index')
const MongoMemoryServer = require('mongodb-memory-server').default
const shopController = require('./../lib/controllers/shop')
const mongoose = require('mongoose')
const Shop = require('./../lib/models/shop')

require('dotenv').config()
const mongoServer = new MongoMemoryServer()


// TODO: Better integration tests
describe('Integration test', async () => {

  const context = { secrets: {} }
  let dbUri

  beforeAll( async () => {
    dbUri = await mongoServer.getConnectionString()
    context.secrets.DB_URL = dbUri
    context.secrets.DATA_URL = process.env.DATA_URL
  })

  afterAll( async () => {
    mongoServer.stop()
    console.log('disconnected database')
  })

  beforeEach( async () => {
    await mongoose.connect(dbUri)
    await Shop.remove({})
    await mongoose.disconnect()
  })

  test('Should work', async () => {
    await mongoose.connect(dbUri)
    const before = await shopController.count()
    await mongoose.disconnect()
    await index(context, (err, res) => {
      expect(err).toBe(null)
      expect(res.jsonLength).toBeGreaterThan(0)
      expect(res.filteredLength).toBeGreaterThan(0)
      expect(res.dbCountBefore).toBe(0)
      expect(res.dbCountAfter).toBe(res.filteredLength)
    })
    await mongoose.connect(dbUri)
    const after = await shopController.count()
    await mongoose.disconnect()
    expect(after).toBeGreaterThan(before)
  }, 10000)
})