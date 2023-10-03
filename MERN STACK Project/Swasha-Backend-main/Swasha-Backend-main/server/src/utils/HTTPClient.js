const axios = require('axios').default

const msg91Client = axios.create({
  baseURL: 'https://control.msg91.com/api/v5/',
  headers: {
    authkey: '387001ApRXvDIL63a03926P1',
  },
})

exports.sendOTP = async ({ mobileNo, otp }) => {
  return msg91Client.post('/flow', {
    template_id: '6448c7c2d6fc0542ca222cd2',
    sender: 'Nirmaan',
    short_url: '0',
    mobiles: mobileNo,
    otp,
    time: '5',
  })
}
