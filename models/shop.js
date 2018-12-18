const mongoose = require('mongoose')

const requiredString = {
  type: String,
  required: true
}

const dayValidator = (value) => {
  if (value === null) return true
  return (
    typeof(value) === 'object'
    && (value.length === 2)
    && typeof(value[0]) === 'number'
    && typeof(value[1]) === 'number'
    && value[0] >= 0
    && value[1] >= 0
    && value[1] > value[0]
    && value[1] < 1440 
  )
} 

const dayOfWeek = {
  type: [Number],
  validate: {
    validator: dayValidator,
    message: 'Week day must be null or number array'
  }
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