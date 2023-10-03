const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const BulkOrder = require('../models/bulkOrderModel')
const sendEmail = require('../utils/sendEmail')
const headerHTML = require('../utils/emailtemplate/emailheader');
const footerHTML = require('../utils/emailtemplate/emailfooter');

exports.bulkOrderQuery = catchAsyncErrors(async (req, res, next) => {
  const {
    fullname,
    email,
    mobileNum,
    alternativeMobileNum,
    fullAddress,
    pinCode,
    city,
    state,
    preferableTimeForContact,
    queryMessage,
  } = req.body

  const newBulkQuery = new BulkOrder({
    fullname,
    email,
    mobileNum,
    alternativeMobileNum,
    fullAddress,
    pinCode,
    city,
    state,
    preferableTimeForContact,
    queryMessage,
  })

//   const emailInfo = {
//     subject: `You raise for Bulk Order Query, We will get back to you in between ${preferableTimeForContact}`,
//     message: `Dear ${fullname},
//     Your Bulk query has been received by us and will get back to you soon. 
//     Query details:
//     Query ID: ${newBulkQuery.id}
//     Email Id: ${email}
//     Your Preferable Timing is: ${preferableTimeForContact}
//     Query Message: ${queryMessage}

//     Thank you.
// `,
//   }
//   const teamEmailInfo = {
//     subject: 'Swasha - Recived one New Bulk Query',
//     message: `A Bulk query has been received from ${fullname}, Please contact him/her as soon as possible.
//     Query details:
//     Query ID: ${newBulkQuery.id}
//     Email: ${email}
//     Mobile: ${mobileNum}
//     Alternative Mobile Number: ${alternativeMobileNum}
//     Full Address: ${fullAddress}, ${state}
//     Pin Code ${pinCode}
//     Perferable time slot: ${preferableTimeForContact}
//     Query Message: ${queryMessage}

//     Thank you.
// `,
//   }

  await Promise.all([
    // sendEmail({ email, ...emailInfo }),
    // sendEmail({ email: 'testing242627@gmail.com', ...teamEmailInfo }),
    bulkOrderConfirmationUser(fullname,email,ID=newBulkQuery.id),
    
    bulkOrderConfirmationAdmin(fullname,email,ID=newBulkQuery.id),
    newBulkQuery.save(),
  ])

  res.status(201).json({
    success: true,
    message: 'Bulk Query submitted successfully!',
    newBulkQuery,
  })
})
//user
async function bulkOrderConfirmationUser(fullname,email,ID) {
  const emailSubject = `${fullname}, Your Bulk Order Enquiry is Received (ID: ${ID})`;
  const html1 = `${headerHTML}
                          <div class="body-text">
                             <p>Dear ${fullname},</p><br>
                             <p>Thank you for showing interest in our products. Your support and encouragement means a lot to us. Your Enquiry ID is <strong>#${ID}</strong>. Our team will revert back to you within 3-5 business days.</p><br>
                             <p>For any queries related to your enquiry, please write to us at <a href="orders@swasha.org">orders@swasha.org </a>.
                             </p><br>
<p>Best Wishes,<br>Swasha Team</p> 
                          </div>
                  ${footerHTML}`;

 try {
  await sendEmail({
    email,
    subject: emailSubject,
    html: html1,
  });

  console.log(`Query confirmation email sent to ${email}`);
} catch (error) {
  console.error('Error sending Query confirmation email:', error.message);
}
};

//admin

async function bulkOrderConfirmationAdmin(fullname, email,ID) {
  const emailSubject = `A Bulk Order Request (#${ID}) is received`;
  const html1 = `${headerHTML}
                             <p>Dear Admin,</p><br>
<p>A customer has shown interest in bulk order. Please find the details below.</p><br>
<p>
<b>Enquiry ID</b>: #${ID}<br>
<b>Customer Name</b>: ${fullname}<br>
<b>Mobile Number</b>: ${mobileNum}<br>
<b>Alternative Number</b>: ${ alternativeMobileNum}<br>
<b>Email ID</b>: ${mobileNum}<br>
<b>Customer Address</b>: <br>
${fullAddress}<br>
${city}<br>
${state} - ${pinCode}<br>
<b>Preferred Time to Call</b>: ${preferableTimeForContact}<br>
<b>Query</b>: ${queryMessage}
</p><br>
<p>Please revert back to the customer in 3-5 business days.</p><br>

<p>Regards,<br>
Swasha Website
</p> 
${footerHTML}`;

 try {
  await sendEmail({
    email:'orders@swasha.org',
    subject: emailSubject,
    html: html1,
  });

  console.log(`Query confirmation email sent to ${email}`);
} catch (error) {
  console.error('Error sending Query confirmation email:', error.message);
}
};