const brevo = require('@getbrevo/brevo');

const defaultClient = brevo.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
const apiInstance = new brevo.TransactionalEmailsApi();
const sendSmtpEmail = new brevo.SendSmtpEmail();

const send = (receiver, redirectUrl, message) => {
    apiKey.apiKey = process.env.EMAIL_API_KEY;
    
    sendSmtpEmail.subject = message;
    sendSmtpEmail.htmlContent = `<html><body><h1>${message}</h1><br><p>${redirectUrl}</p></body></html>`;
    sendSmtpEmail.sender = { "name": "John", "email": "example@example.com" };
    sendSmtpEmail.to = [receiver];
    sendSmtpEmail.replyTo = { "email": "example@brevo.com", "name": "sample-name" };
    sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
    // sendSmtpEmail.params = { "parameter": "My param value", "subject": "common subject" };

    apiInstance.sendTransacEmail(sendSmtpEmail).then((data) => {
        console.log('API called successfully. Returned data: ' + JSON.stringify(data));
    }).catch((error) => {
        console.error(error);
    });
};

module.exports = {
    send
};