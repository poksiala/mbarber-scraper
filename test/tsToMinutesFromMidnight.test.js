const ts = require('./../utils').tsToMinutesFromMidnight

describe('tsToMinutesFromMidnight', () => {
  describe('On invalid input return null.', () => {

    test('input null', () => {
      expect(ts(null)).toBe(null)
    })

    test('input {}', () => {
      expect(ts({})).toBe(null)
    })

    test('input ""', () => {
      expect(ts('')).toBe(null)
    })

    test('input 600', () => {
      expect(ts(600)).toBe(null)
    })

    test('input "11:333"', () => {
      expect(ts('11:333')).toBe(null)
    })

    test('input "-11:01"', () => {
      expect(ts('-11:01')).toBe(null)
    })

    test('input "11:01 ap"', () => {
      expect(ts('11:01 ap')).toBe(null)
    })
  })
  
  describe('24h clock.', () => {

    test('Works on valid input', () => {
      expect(ts('11:01')).toBe(661)
    })

    test('Works with one digit hour', () => {
      expect(ts('1:01')).toBe(61)
    })

    test('Works with leading zero hour', () => {
      expect(ts('01:01')).toBe(61)
    })

    test('null with minute >= 60', () => {
      expect(ts('01:60')).toBe(null)
      expect(ts('01:72')).toBe(null)
    })

    test('null with hour >= 24', () => {
      expect(ts('24:00')).toBe(null)
      expect(ts('33:00')).toBe(null)
    })
  })

  describe('12h clock.', () => {

    test('Works on valid input', () => {
      expect(ts('11:01 am')).toBe(661)
      expect(ts('11:01 pm')).toBe(1381)
    })

    test('Works with one digit hour', () => {
      expect(ts('1:01 am')).toBe(61)
      expect(ts('1:01 pm')).toBe(781)
    })

    test('Works with leading zero hour', () => {
      expect(ts('01:01 am')).toBe(61)
      expect(ts('01:01 pm')).toBe(781)
    })

    test('null with minute >= 60', () => {
      expect(ts('01:60 am')).toBe(null)
      expect(ts('01:72 am')).toBe(null)
      expect(ts('01:60 pm')).toBe(null)
      expect(ts('01:72 pm')).toBe(null)
    })

    test('null with hour >12', () => {
      expect(ts('13:00 am')).toBe(null)
      expect(ts('13:00 pm')).toBe(null)
    })
    
    test('null with hour 0', () => {
      expect(ts('00:01 am')).toBe(null)
      expect(ts('00:01 pm')).toBe(null)
    })

    test('12:30 am to be 30', () => {
      expect(ts('12:30 am')).toBe(30)
    })

    test('12:30 pm to be 750', () => {
      expect(ts('12:30 pm')).toBe(750)
    })
    
  })
})
