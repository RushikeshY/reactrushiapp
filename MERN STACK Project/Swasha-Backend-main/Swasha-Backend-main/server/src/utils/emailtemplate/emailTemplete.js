const emailTemplates = {
  contactUsUserSideEmail: {
    subject: `We're on It! Acknowledging Your Query Very Soon!`,
    body: 'Dear {{fullname}},\n\n Your Query has been received by us and will be resolved soon. \n\n Query Details are down below:- \n Query ID:- {{newQueryId}}\n Mobile Number: {{mobileNum}} \n Query Type:{{queryType}}\n Query Message:- {{queryMessage}}\n\n Thank You!!! \n Swasha Team ',
  },

  contactUsSwashaTeamSideEmail: {
    subject: 'Swasha - Contact Us New Query',
    body: 'Dear team,\n\nA query has been received from user {{fullname}}.  \n\n Query Details are down below:- \n Query ID:- {{newQueryId}} \nMobile Number: {{mobileNum}}\n Query Type:{{query}}\n Query Message:- {{queryMessage}}\n\n Please resolve as soon as possible. \n\n Thank you.',
  },

  // Add more email templates here as needed
}

module.exports = emailTemplates
