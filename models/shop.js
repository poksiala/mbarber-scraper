const mongoose = require('mongoose')

const requiredString = {
  type: String,
  required: true
}

const dayOfWeek = {
  start: {
    type: Number
  },
  end: {
    Number
  },
} 

const shopSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  name: requiredString,
  country:requiredString,
  city: requiredString,
  address: requiredString,
  lat: requiredString,
  long: requiredString,
  monday: dayOfWeek,
  tuesday: dayOfWeek,
  wednesday: dayOfWeek,
  thursday: dayOfWeek,
  friday: dayOfWeek,
  saturday: dayOfWeek,
  sunday: dayOfWeek,
})

const Shop = mongoose.model('Shop', shopSchema)

module.exports = Shop