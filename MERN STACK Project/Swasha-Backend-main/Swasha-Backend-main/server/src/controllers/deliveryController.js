const { default: axios } = require('axios')
require('colors')
const axiosInstance = axios.create({
  baseURL: process.env.SHIFT_DOMAIN,
})
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const originPin = 500018
let apiToken = null

// Function to estimate delivery date
const estimatedDelivery = async (destinationPin) => {
  try {
    // Make a POST request to obtain an API token if not already obtained
    if (!apiToken) {
      const loginResponse = await axiosInstance.post(
        `/api/v1/login`,
        {},
        {
          headers: {
            Authorization: `Basic ${process.env.SHIFT_BASIC_TOKEN}`,
          },
        }
      )
      apiToken = loginResponse.data.data
      // console.log(apiToken)
      console.log(`Shift Login Successfully completed...`.bgBlue)
    }

    // Use the obtained API token to fetch delivery date estimation
    console.log(1)
    const apiUrl = process.env.SHIFT_DOMAIN + '/api/v1/shipment/cost-estimates'
    // const apiUrl = 'https://carrierv2-dev.shift.in/api/v1/shipment/cost-estimates'
    console.log(3)
    let response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify JSON content type
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        originPin: originPin,
        destinationPin: destinationPin,
      }),
    })
    const data = await response.json()
    console.log(data)
    let formattedDates = []
    let formattedStartDate = ' '
    let formattedEndDate = ' '
    for (const item of data.data) {
      const estimatedDeliveryDate = new Date(item.estimatedDeliveryDate)
      formattedStartDate = estimatedDeliveryDate.toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      })
      const endDate = new Date(estimatedDeliveryDate)
      endDate.setDate(estimatedDeliveryDate.getDate() + 3)
      formattedEndDate = endDate.toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      })
    }
    formattedDates.push(`${formattedStartDate} - ${formattedEndDate}`)
    return formattedDates.join(', ')

    // let date = "";
    // for (const item of data.data) {
    //   const estimatedDeliveryDate = item.estimatedDeliveryDate;
    //   const isodate = new Date(estimatedDeliveryDate);
    //    date = isodate.toDateString();
    //   console.log('Estimated Delivery Date:', estimatedDeliveryDate);
    //   console.log('Estimated Delivery Date(ist):', date);
    // }

    // return date;
    // return estimatedTime;
  } catch (error) {
    console.log('Error while estimating delivery time:', error.message)
    return null
  }
}

exports.checkPincode = catchAsyncErrors(async (req, res, next) => {

  const { destinationPin } = req.body
  console.log(req.body)

  // Call the function to estimate delivery time
  const estimatedTime = await estimatedDelivery(destinationPin)

  if (estimatedTime !== null) {
    res.json({
      estimatedTime,
    })
  } else {
    res.status(500).json({
      error: 'Error while estimating delivery time',
    })
  }
})
