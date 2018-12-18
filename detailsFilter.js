const assert = require('assert')
const { tsToMinutesFromMidnight, zip } = require('./utils')

const weekDays = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
]

/** 
 * Format open hours data.
 * 
 * returns object with keys `monday` through `sunday`
 * which have:
 * - objects with keys `start` and `end`
 *   containing numbers (minutes from midnight).
 * - are null if timestamps could not be parsed.
 *  
 * throws error if parameter week is not array of length 7
 */
const formatWeek = (week) => {
  const replacedTimestapms = week.map(({start, end}) => {
    const startMinutes = tsToMinutesFromMidnight(start)
    const endMinutes = tsToMinutesFromMidnight(end)
    if (startMinutes === null || endMinutes === null) return null
    return {
      start: startMinutes,
      end: endMinutes
    }
  })

  const zipped = zip(weekDays, replacedTimestapms)
  return zipped.reduce((obj, [key, value]) => 
    Object.assign({[key]: value}, obj), {})
}

/**
 * Extract certain string properties from object and
 * assert that those really are strings
 */
const extractAndValidiateStrings = ({ slug, name, city, country, address }) => {
  assert(typeof(slug) === 'string', 'valid slug is missing')
  assert(typeof(name) === 'string', 'valid name is missing')
  assert(typeof(city) === 'string', 'valid city is missing')
  assert(typeof(address) === 'string', 'valid address is missing')
  assert(typeof(country) === 'string', 'valid country is missing')
  return { slug, name, city, country, address }
}

/**
 * Returns an object with basic details about barberShop
 * Returns null if some details are missing. 
 */
const detailsFilter = (barberShop) => {
  try {
    const { week, position } = barberShop
    const hours = formatWeek(week)
    const [lat, long] = position
    assert(
      typeof(lat) === 'string' && typeof(long) === 'string',
      'valid lat and long are missing'
    )
    
    const basicDetails = extractAndValidiateStrings(barberShop)
    const otherDetails = {...hours, lat, long}
    return Object.assign(basicDetails, otherDetails)

  } catch (exception) {
    console.log(exception.message)
    return null
  }
}

module.exports = detailsFilter
