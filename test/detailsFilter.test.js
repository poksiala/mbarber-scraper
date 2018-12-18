const detailsFilter = require('./../detailsFilter')

describe('detailsFilter', () => {
  describe('With valid input...', () => {

    test('Works correctly when finnish store is closed', () => {
      const data = JSON.parse(validJsonFinnishClosed)
      const expected = {
        slug: 'espoo-tapiola',
        name: 'Tapiola',
        city: 'Espoo',
        country: 'finland',
        address: 'Länsituulentie',
        saturday: [540, 1020],
        friday: [540, 1140],
        thursday: [540, 1140],
        wednesday: [540, 1140],
        tuesday: [540, 1140],
        monday: [540, 1140],
        sunday: null,
        lat: '60.17553549999999',
        long: '24.80225680000001',
        timezone: 'Europe/Helsinki'
      }

      expect(detailsFilter(data)).toEqual(expected)
    })

    test('Works correctly when american store is closed', () => {
      const data = JSON.parse(validJsonUSAClosed)
      const expected =  {
        slug: 'naples-park-shore-plaza',
        name: 'Park Shore Plaza',
        city: 'Naples',
        country: 'usa',
        address: 'address',
        saturday: [540, 1020],
        friday: [540, 1200],
        thursday: [540, 1200],
        wednesday: [540, 1200],
        tuesday: [540, 1140],
        monday: [540, 1020],
        sunday: null,
        lat: '26.200283',
        long: '-81.800330',
        timezone: 'America/New_York'
      }
      expect(detailsFilter(data)).toEqual(expected)
    })
  })
  describe('Return null when missing field...', () => {
    let data

    beforeEach(() => {
      data = JSON.parse(validJsonFinnishClosed)
    })

    test('slug', () => {
      data.slug = undefined
      expect(detailsFilter(data)).toBe(null)
    })

    test('address', () => {
      data.address = undefined
      expect(detailsFilter(data)).toBe(null)
    })

    test('name', () => {
      data.name = undefined
      expect(detailsFilter(data)).toBe(null)
    })

    test('city', () => {
      data.city = undefined
      expect(detailsFilter(data)).toBe(null)
    })

    test('country', () => {
      data.country = undefined
      expect(detailsFilter(data)).toBe(null)
    })

    test('position', () => {
      data.position = undefined
      expect(detailsFilter(data)).toBe(null)
    })

    test('week', () => {
      data.week = undefined
      expect(detailsFilter(data)).toBe(null)
    })

    test('day in week', () => {
      data.week.pop()
      expect(detailsFilter(data)).toBe(null)
    })
  })
})

const validJsonFinnishClosed = `{
  "id": 84,
  "slug": "espoo-tapiola",
  "name": "Tapiola",
  "city": "Espoo",
  "start": "09:00",
  "end": "19:00",
  "week": [
    {
      "start": null,
      "end": null
    },
    {
      "start": "09:00",
      "end": "19:00"
    },
    {
      "start": "09:00",
      "end": "19:00"
    },
    {
      "start": "09:00",
      "end": "19:00"
    },
    {
      "start": "09:00",
      "end": "19:00"
    },
    {
      "start": "09:00",
      "end": "19:00"
    },
    {
      "start": "09:00",
      "end": "17:00"
    }
  ],
  "phone": "asdfasdf",
  "email": "easdfasdf",
  "address": "Länsituulentie",
  "streetaddress": "asdf",
  "position": [
    "60.17553549999999",
    "24.80225680000001"
  ],
  "postcode": "021sd",
  "postoffice": "Espoo",
   "hide_in_reservation": false,
  "queue": {
    "count": "closed",
    "names": null,
    "employees": 0
  },
  "country": "finland"
}`

const validJsonUSAClosed = `{
  "id": 5,
  "slug": "naples-park-shore-plaza",
  "name": "Park Shore Plaza",
  "city": "Naples",
  "start": "9:00 am",
  "end": "5:00 pm",
  "week": [
    {
      "start": null,
      "end": null
    },
    {
      "start": "9:00 am",
      "end": "5:00 pm"
    },
    {
      "start": "9:00 am",
      "end": "7:00 pm"
    },
    {
      "start": "9:00 am",
      "end": "8:00 pm"
    },
    {
      "start": "9:00 am",
      "end": "8:00 pm"
    },
    {
      "start": "9:00 am",
      "end": "8:00 pm"
    },
    {
      "start": "9:00 am",
      "end": "5:00 pm"
    }
  ],
  "phone": "23gsdsdf",
  "email": "parkshorsdgsdf",
  "address": "address",
  "streetaddress": "dsgdfsdf",
  "position": [
    "26.200283",
    "-81.800330"
  ],
  "postcode": "34sdfsdf",
  "postoffice": "Naples",
  "info": "",
  "details": "",
  "hide_in_reservation": false,
  "queue": {
    "count": "closed",
    "names": null,
    "employees": 1
  },
  "country": "usa"
}`