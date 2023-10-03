const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const Contactus = require('../models/contactusModel')
const sendEmail = require('../utils/sendEmail')
const headerHTML = require('../utils/emailtemplate/emailheader');
const footerHTML = require('../utils/emailtemplate/emailfooter');

exports.contactUs = catchAsyncErrors(async (req, res, next) => {
  const { fullname, email, mobileNum, queryType, queryMessage } = req.body

  const newQuery = new Contactus({
    fullname,
    email,
    mobileNum,
    queryType,
    queryMessage,
  })

  await Promise.all([
    contactUsConfirmationUser(fullname,email,ID=newQuery.id),
    // sendEmail({ email: 'no-reply@swasha.org', ...teamEmailInfo }),
    contactUsConfirmationAdmin(fullname,email,ID=newQuery.id),
    newQuery.save(),
  ])


  res.status(201).json({
    success: true,
    message: 'Query submitted successfully!',
    newQuery,
  })
})

//user
async function contactUsConfirmationUser(fullname, email,ID) {
  const emailSubject = `${fullname}- Query Received - ID(${ID})`;
  const html1 = `${headerHTML}
                  <div class="body-text">
                      <p>Dear ${fullname},</p><br>
<p>Thank you for reaching out to us. We have received your query. Your Query ID is <strong>#${ID}</strong>. Our team will revert back to you within 3-5 business days.</p><br>
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
async function contactUsConfirmationAdmin(fullname, email,ID) {
  const emailSubject = `You have received a query (${ID})`;
  const html2 = `${headerHTML}
                      <div class="body-text">
                          <p>Dear Admin,</p><br>
                          <p>A customer tried to reach out to the Swasha team. Details of the query are given below.</p><br>

                          Query ID: #12344<br>
                          Customer Name: <<${fullname}>><br>
                          Mobile Number: << ${mobileNum}>><br>
                          Email ID: <<${email}>><br>
                          Query Subject: <<${queryType}>><br>
                          Query: <<${queryMessage}>><br>
                          Date of Query: <<Query received date and time>>
                          <p>
                          Please revert back to the customer in 3-5 business days.</p><br>
                          
                          <p> Regards,<br>
                          Swasha Website
                          </p>                         
                      </div>
          ${footerHTML}`;

 try {
  await sendEmail({
    email: 'no-reply@swasha.org',
    subject: emailSubject,
    html: html2,
  });

  console.log(`Query confirmation email sent to ${email}`);
} catch (error) {
  console.error('Error sending Query confirmation email:', error.message);
}
};

