const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

const GMAIL_PASS = process.env.GMAIL_PASS;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "pastor.bernal@educacionit.com",
        pass: GMAIL_PASS,
    },
});

// async..await is not allowed in global scope, must use a wrapper
async function enviarMail(nombre, email) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
        to: `${email}`, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<h1>Gracias ${ nombre }por registrarte en nuestra app!</h1> <br>
        <a href="https://www.educacionit.com/" target= "_blank">Visitanos</a>`, // html body
    });

    //console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

//main().catch(console.error);

module.exports = enviarMail;