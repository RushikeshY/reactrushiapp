const mongoose = require('mongoose') // Erase if already required
const validator = require('validator')

// Declare the Schema of the Mongo model
const contactusSchema = new mongoose.Schema(
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
        validator: function(value) {
          return validator.isMobilePhone(value, 'any')
        },
      },
      message: 'Please enter a valid mobile number',
    },
    queryType: {
      type: String,
      required: [
        true,
        'Please select one option, if u choose other then mention in query message',
      ],
      enum: [
        "Order Tracking",
        "Order Return",
        "Order Cancellation",
        "Refund",
        "Wrong/Defective Product",
        "Business Enquiry",
        "Others",
      ],
    },
    queryMessage: {
      type: String,
      maxLength: [1000, 'Message cannot exceed 1000 characters'],
      required: true,
    },
    queryStatus: {
      type: String,
      default: 'notResolved',
      enum: ['notResolved', 'resolved', 'Hold'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

// Export the model
module.exports = mongoose.model('Contactus', contactusSchema)

// contactusSchema.methods.requestEmailVerification = async function (
//   getUrlFromToken,
//   getMessageFromURL
// ) {
//   const token = this.emailVerificationToken()
//   await new EmailVerificationToken({ token }).save()
//   const emailVerificationURL = getUrlFromToken(token)

//   console.log(emailVerificationURL)
//   const message = getMessageFromURL(emailVerificationURL)
//   await sendEmail({
//     email: this.email,
//     subject: 'Verify email for SWASHA',
//     message,
//   })
// }
