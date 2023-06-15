const nodemailer = require('nodemailer');

// Configurar el transportador de correo electrónico
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'motorcyclesdinamo@gmail.com', // tu dirección de correo electrónico
    pass: 'ysutvdijpdiyvwwd' // tu contraseña de correo electrónico
  }
});


const sendNotificationEmail = async (req, res) => {
  const { destination, body, title } = req.body;

  const missingParameters = [];

  if (!destination) missingParameters.push('destination');
  if (!body) missingParameters.push('body');
  if (!title) missingParameters.push('title');

  
  try {

    if (missingParameters.length > 0) {
      const errorMessage = `The following parameters are missing: ${missingParameters.join(', ')}`;
      throw new Error(errorMessage);
    }

    const mailOptions = {
      from: 'motorcyclesdinamo@gmail.com',
      to: destination,
      subject: title,
      text: body
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw new Error(error);
      } else {
        res.status(200).send('E-mail sent: ' + info.response);
      }
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = {
  sendNotificationEmail,
};