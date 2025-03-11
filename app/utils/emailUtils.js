import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

const churchLogo = process.env.CHRIST_BC_LOGO;

export const sendWelcomeEmail = async (email, firstName) => {
  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: "Welcome to Christ Baptist Church",
    html: `
    <div style="background-color: #f4f4f4; padding: 20px; color: #333; border-radius: 5px; text-align: center;">
      <img src="${churchLogo}" alt="Church Logo" style="max-width: 150px; height: auto; margin-bottom: 20px;">
      <h1 style="font-size: 24px; margin-bottom: 20px;">Welcome to Christ Baptist Church, ${firstName}!</h1>
      <p style="font-size: 16px;">We are delighted to have you join our church family.</p>
      <p style="font-size: 16px;">At Christ Baptist Church, we worship together, grow in faith, and serve the community with love.</p>
      <p style="font-size: 16px;">We invite you to join our Sunday services, Bible studies, and other fellowship activities.</p>
      <p style="font-size: 16px;">If you have any questions or need prayer, feel free to reach out to our church team.</p>
      <p style="font-size: 16px;"><strong>May God bless you abundantly!</strong></p>
      <br>
      <p style="font-size: 16px;">Blessings,</p>
      <p style="font-size: 16px;"><strong>Christ Baptist Church</strong></p>
    </div>
  `,
  };

  return transporter.sendMail(mailOptions);
};
