const index = require('./../index')
const MongoMemoryServer = require('mongodb-memory-server').default
require('dotenv').config()
const mongoServer = new MongoMemoryServer()

// TODO: Better integration tests
describe('Integration test', async () => {

  const context = {}

  beforeAll( async () => {
    const dbUri = await mongoServer.getConnectionString()
    context.DB_URL = dbUri
    context.DATA_URL = process.env.DATA_URL
  })

  afterAll( async () => {
    mongoServer.stop()
    console.log('disconnected database')
  })

  test('Should work', async () => {
    index(context, (err, res) => {
      expect(err).toBe(null)
      expect(res.jsonLength).toBeGreaterThan(0)
      expect(res.filteredLength).toBeGreaterThan(0)
      expect(res.dbCountBefore).toBe(0)
      expect(res.dbCountBefore).toBe(res.filteredLength)
    })
  })
})