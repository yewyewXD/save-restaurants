const nodemailer = require("nodemailer");

exports.sendMail = async ({ from, to, subject, html }) => {
  let senderAccount;

  if (process.env.NODE_ENV === "production") {
    senderAccount = {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD,
    };
  } else {
    senderAccount = await nodemailer.createTestAccount();
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: senderAccount.user,
      pass: senderAccount.pass,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    to,
    subject,
    html,
  });

  // Preview only available when sending through an Ethereal account
  if (process.env.NODE_ENV !== "production") {
    console.log("Preview URL: ", nodemailer.getTestMessageUrl(info));
  }
};
