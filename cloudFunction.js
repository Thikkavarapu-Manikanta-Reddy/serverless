const functions = require('@google-cloud/functions-framework');
const mailgun = require("mailgun-js")
const mysql = require('mysql2/promise');

const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAIL_GUN_DOMAIN_NAME})

subscribeMessage = async (event) => {
  try {
    
    const { userData, verificationCode } =  event;

    // Send verification email to the user
    await sendVerificationEmail( userData, verificationCode);

    console.log('Verification email sent to user');

  } catch (error) {
    console.error(error);
    throw new Error('Error processing user added event');
  }
};

async function sendVerificationEmail(email, token) {

    const verificationLink = `http://${process.env.DOMAIN_NAME}:8080/v1/user/verify?token=${token}&email=${email}`;

    const data = {
      from: "Excited User <noreply@manikanta.me>",
      to: email,
      subject: "Welcome to WebApp - Verify Your Email",
      html: `
        <p>Hello User,</p>
        <p>Welcome to WebApp! Click the link below to verify your email address:</p>
        <p>Verification Link: <a href="${verificationLink}">Verify Email</a></p>
        <p>Note: Link expires in 2 mins. If you did not create an account on WebApp, please ignore this email.</p>
      `
  };
    mg.messages().send(data, function(err, body){
        console.log(body)
    })
  
}

functions.cloudEvent('helloPubSub', async cloudEvent => {
  const base64name = cloudEvent.data.message.data;
  const buffer = Buffer.from(base64name, 'base64').toString();
  const jsonObject = JSON.parse(buffer);
  subscribeMessage(jsonObject);
  try {
    const pool = mysql.createPool({
      host: process.env.hostname,
      user: process.env.username,
      password: process.env.password,
      database: process.env.db
    });

    
    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Execute the update query
    const updateQuery = 'INSERT INTO EmailLogs (email, email_sent) VALUES (?, CURRENT_TIMESTAMP()) ON DUPLICATE KEY UPDATE email_sent = CURRENT_TIMESTAMP();';
    await connection.execute(updateQuery, [jsonObject.userData]);
    await connection.release();
    console.log('Mail sent field updated successfully for user:', jsonObject.userData);  
    console.log('Database connected successfully!');

  } catch(err) {
    console.error('Error connecting to the database:', err);

  }

});