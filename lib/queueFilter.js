module.exports = ({ slug, queue }) => {
  const { count, names } = queue
  if (typeof(count) === 'string') {
    // it probably reads 'closed'
    return {
      slug,
      total: 0,
      silver: 0,
      gold: 0,
      platinium: 0,
      other: 0
    }
  } else {
    // who knows. field "names" is null atm.
    return {
      slug,
      total: count,
      silver: 0,
      gold: 0,
      platinium: 0,
      other: 0
    }
  }
}
