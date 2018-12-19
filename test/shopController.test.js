/*eslint no-unused-vars: "off"*/

const shopController = require('./../lib/controllers/shop')
const Shop = require('./../lib/models/shop')
const mongoose = require('mongoose')
const MongoMemoryServer = require('mongodb-memory-server').default

const mongoServer = new MongoMemoryServer()

describe('shopController', async () => {

  beforeAll( async () => {
    const dbUri = await mongoServer.getConnectionString()
    await mongoose.connect(dbUri)
    console.log('connected to the database')
  })

  afterAll( async () => {
    await mongoose.connection.close()
    mongoServer.stop()
    console.log('disconnected database')
  })

  describe('Whend database is empty', async () => {
    beforeEach(async () => {
      await Shop.remove({})
    })

    test('getAll should work', async () => {
      const result = await shopController.getAll()
      expect(result).toEqual([])
    })

    test('count should work', async() => {
      const result = await shopController.count()
      expect(result).toBe(0)
    })

    describe('With valid input', async () => {

      test('create should create new entry', async () => {
        const before = await Shop.countDocuments({})
        await shopController.create(validData)
        const after = await Shop.countDocuments({})
        expect(after).toBe(before + 1)
      })

      test('updateOrCreate should create new entry', async () => {
        const before = await Shop.countDocuments({})
        await shopController.updateOrCreate(validData)
        const after = await Shop.countDocuments({})
        expect(after).toBe(before + 1)
      })
    })

    describe('with invalid input', async () => {

      test('create should not create new entry when name is missing', async () => {
        const before = await Shop.countDocuments({})
        const { name, ...invalidData } = validData
        await shopController.create(invalidData)
        const after = await Shop.countDocuments({})
        expect(after).toBe(before)
      })

      test('updateOrCreate should not create new entry when name is missing', async () => {
        const before = await Shop.countDocuments({})
        const { name, ...invalidData } = validData
        await shopController.updateOrCreate(invalidData)
        const after = await Shop.countDocuments({})
        expect(after).toBe(before)
      })

      test('create should not create new entry when monday is missing', async () => {
        const before = await Shop.countDocuments({})
        const { monday, ...invalidData } = validData
        await shopController.create(invalidData)
        const after = await Shop.countDocuments({})
        expect(after).toBe(before)
      })

      test('updateOrCreate should not create new entry when monday is missing', async () => {
        const before = await Shop.countDocuments({})
        const { monday, ...invalidData } = validData
        await shopController.updateOrCreate(invalidData)
        const after = await Shop.countDocuments({})
        expect(after).toBe(before)
      })
    })
  })

  describe('when database is not empty', async () => {

    beforeEach(async () => {
      await Shop.remove({})
      const shop = new Shop(validData)
      await shop.save()
    })

    test('getAll should work', async () => {
      const result = await shopController.getAll()
      expect(result.length).toBe(1)
    })

    test('count should work', async() => {
      const result = await shopController.count()
      expect(result).toBe(1)
    })

    describe('when slug does not exist in database', async () => {

      test('create should create new entry', async () => {
        const before = await Shop.countDocuments({})
        await shopController.create(validData2)
        const after = await Shop.countDocuments({})
        expect(after).toBe(before + 1)
      })

      test('updateOrCreate should create new entry', async () => {
        const before = await Shop.countDocuments({})
        await shopController.updateOrCreate(validData2)
        const after = await Shop.countDocuments({})
        expect(after).toBe(before + 1)
      })
    })

    describe('when slug exists in database', async () => {
      test('create should not create new entry', async () => {
        const before = await Shop.countDocuments({})
        await shopController.create(validData)
        const after = await Shop.countDocuments({})
        expect(after).toBe(before)
      })

      test('updateOrCreate should not create new entry', async () => {
        const before = await Shop.countDocuments({})
        await shopController.updateOrCreate(validData)
        const after = await Shop.countDocuments({})
        expect(after).toBe(before)
      })

      test('create should not update the entry', async () => {
        const monday = [300, 600]
        const slug = validData.slug
        const validDataWithNewHours = { ...validData, monday }
        await shopController.create(validDataWithNewHours)
        const after = await Shop.findOne({ slug })
        expect(after.monday[0]).toBe(420)
        expect(after.monday[1]).toBe(1080)
      })

      test('updateOrCreate should update the entry', async () => {
        const monday = [300, 600]
        const slug = validData.slug
        const validDataWithNewHours = { ...validData, monday }
        await shopController.updateOrCreate(validDataWithNewHours)
        const after = await Shop.findOne({ slug })
        expect(after.monday[0]).toBe(monday[0])
        expect(after.monday[1]).toBe(monday[1])
      })
    })
  })
})

const validData = {
  slug: 'slug-one',
  name: 'Name',
  city: 'City',
  country: 'Country',
  address: 'address',
  saturday: [600, 960],
  friday: [420, 1080],
  thursday: [420, 1080],
  wednesday: [420, 1080],
  tuesday: [420, 1080],
  monday: [420, 1080],
  sunday: null,
  lat: '33.333',
  long: '44.444',
  timezone: 'Continent/City'
}

const validData2 = {
  slug: 'slug-two',
  name: 'Name2',
  city: 'City2',
  country: 'Country2',
  address: 'address2',
  saturday: [600, 960],
  friday: [420, 1080],
  thursday: [420, 1080],
  wednesday: [420, 1080],
  tuesday: [420, 1080],
  monday: [420, 1080],
  sunday: null,
  lat: '33.3332',
  long: '44.4442',
  timezone: 'Continent2/City2'
}
