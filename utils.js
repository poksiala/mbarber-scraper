const assert = require('assert')

/**
 * Convert `HH:MM` or `HH:MM AM/PM` to minutes from midnight.
 * Return Number on success or null if not recognized.
*/
const tsToMinutesFromMidnight = (ts) => {
  const regexp12h = /^(\d+):(\d\d) (am|pm)$/
  const regexp24h = /^(\d+):(\d\d)$/
  if (!ts) {
    return null
  } else if (regexp12h.test(ts)) {
    const regexpResults = regexp12h.exec(ts)
    const [ hours, minutes ] = regexpResults.slice(1, 3).map(Number)
    const ampm = regexpResults[3]
    if (minutes < 0 || minutes > 59 || hours < 1 || hours > 12) return null
    return minutes + 60 * ((hours === 12 ? 0 : hours) + (ampm === 'pm' ? 12 : 0))
  } else if (regexp24h.test(ts)) {
    const [ hours, minutes ] = regexp24h.exec(ts).slice(1, 3).map(Number)
    if (minutes < 0 || minutes > 59 || hours < 0 || hours > 23 ) return null
    return minutes + 60 * hours
  } else {
    console.error(`Could not parse timestamp '${ts}'.`)
    return null
  }
}

const zip = (arr1, arr2) => {
  assert(
    typeof(arr1) === 'object' && typeof(arr1.length) === 'number',
    'arr1 is not a valid array'
  )
  assert(
    typeof(arr2) === 'object' && typeof(arr2.length) === 'number',
    'arr2 is not a valid array'
  )
  assert(arr1.length === arr2.length, 'Arrays must be of same size')
  return arr1.map((e, i) => [e, arr2[i]])
}

module.exports = {
  tsToMinutesFromMidnight,
  zip
}