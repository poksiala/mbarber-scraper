const zip = require('./../lib/utils').zip

describe('zip', () => {
  describe('should work with valid input', () => {

    test('empty arrays',() => {
      expect(zip([], [])).toEqual([])
    })

    test('with arrays of same size', () => {
      const a = [1, 2]
      const b = ['a', 'b']
      const c = zip(a, b)

      expect(c[0][0]).toBe(1)
      expect(c[0][1]).toBe('a')
      expect(c[1][0]).toBe(2)
      expect(c[1][1]).toBe('b')
    })
  })

  describe('should throw with invalid input', () => {

    test('arrays of different size', () => {
      expect(() =>
        zip([1, 2], [1, 2, 3])
      ).toThrow()
    })

    test('strings', () => {
      expect(() => {
        zip('asd', 'dsa')
      }).toThrow()
    })

    test('null', () => {
      expect(() => {
        zip(null, null)
      }).toThrow()
    })

    test('number', () => {
      expect(() => {
        zip(1, 2)
      }).toThrow()
    })

    test('no parameters', () => {
      expect(() => {
        zip()
      }).toThrow()
    })

    test('one parameter', () => {
      expect(() => {
        zip([])
      }).toThrow()
    })

    test('objects', () => {
      expect(() => {
        zip({}, {})
      }).toThrow()
    })

    test('Maps', () => {
      const a = new Map()
      const b = new Map()
      expect(() => {
        zip(a, b)
      }).toThrow()
    })

    test('Sets', () => {
      const a = new Set()
      const b = new Set()
      expect(() => {
        zip(a, b)
      }).toThrow()
    })
  })
})