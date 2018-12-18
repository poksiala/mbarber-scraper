const Shop = require('./../models/shop')

const getAll = async () => {
  const res = await Shop.find({})
  return res
}

const create = async (data) => {
  try {
    const shop = new Shop(data)
    await shop.save()
  } catch (exception) {
    console.error(exception.message)
  }
}

const updateOrCreate = async (data) => {
  const old = await Shop.findOne({ slug: data.slug })
  if (!old) {
    try {
      const shop = new Shop(data)
      await shop.save()
      console.log(`New shop created with slug '${data.slug}'`)
    } catch (exception) {
      console.error(exception.message)
    }
  } else {
    const id = old._id
    await Shop.findByIdAndUpdate(id, data)
  }
}

module.exports = {
  getAll,
  create,
  updateOrCreate
}