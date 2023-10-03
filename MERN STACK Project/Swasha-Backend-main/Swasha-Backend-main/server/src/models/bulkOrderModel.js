const mongoose = require('mongoose') // Erase if already required
const validator = require('validator')

// Declare the Schema of the Mongo model
const BulkOrderSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, 'Please Enter Your Full Name'],
      maxLength: [30, 'Name cannot exceed 30 characters'],
      minLength: [4, 'Name should have more than 4 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please Enter Your Email'],
      trim: true,
      validate: [validator.isEmail, 'Please Enter a valid Email'],
    },
    mobileNum: {
      type: String,
      required: [true, 'mobile number is required'],
      validate: {
        validator: function (value) {
          return validator.isMobilePhone(value, 'any')
        },
      },
      message: 'Please enter a valid mobile number',
      unique: true,
    },
    alternativeMobileNum: {
      type: String,
      required: [true, 'mobile number is required'],
      validate: {
        validator: function (value) {
          return validator.isMobilePhone(value, 'any')
        },
      },
      message: 'Please enter a valid mobile number',
      unique: true,
    },
    fullAddress: {
      type: String,
      required: [true, 'Please enter full address with proper landmark'],
    },
    pinCode: {
      type: Number,
      required: [true, 'Enter Your pin code'],
    },
    city: {
      type: String,
      required: [true, 'Enter Your City Name'],
    },
    state: {
      type: String,
      required: true,
    },

    preferableTimeForContact: {
      type: String,
      required: [true, 'Please select one option'],
      enum: ['9 am - 12 pm', '01 pm - 06 pm', 'Anytime Between 09 am to 06 pm'],
    },
    queryMessage: {
      type: String,
      maxLength: [
        1000,
        'Please provide more details to help us understand your query. Maximum character limit is 1000.',
      ],
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

// Export the model
module.exports = mongoose.model('BulkOrder', BulkOrderSchema)
