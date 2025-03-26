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

const Christ_Baptist_Church = process.env.NEXTAUTH_URL;


export const sendResetPasswordEmail = async (email, resetLink, username) => {
  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: "Reset Your Password - Christ Baptist Church",
    html: `
      <div style="background-color: #2E3440; padding: 20px; color: #ffffff; border-radius: 5px">
        <img src="${churchLogo}" alt="Christ Baptist Church Logo" style="max-width: 150px; height: 30px; margin-bottom: 20px;">
        <div style="text-align: center;">
          <h1 style="font-size: 24px; margin-bottom: 20px;">Reset Your Password</h1>
          <p style="font-size: 16px;">You or Someone attempted to reset the password for your account ${username} on <a href="${Christ_Baptist_Church}" style="color: orange;">Christ Baptist Church</a>. Click the link below to reset your password:</p>
          <a href="${resetLink}" style="display: inline-block; background-color: #FF2E51; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px;">Reset Password</a>
          <br>
          <p style="font-size: 16px; margin-top: 20px;">If you did not request a password reset, please ignore this email.</p>
          <br>
          <p style="font-size: 16px;">Best regards,</p>
          <p style="font-size: 16px;">Christ Baptist Church</p>
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

export const sendPasswordChangeEmail = async (email, firstName) => {
  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: "Your Password Has Been Changed - Christ Baptist Church",
    html: `
      <div style="background-color: #2E3440; padding: 20px; color: #ffffff; border-radius: 5px;">
        <img src="${churchLogo}" alt="Christ Baptist Church Logo" style="max-width: 150px; height: 30px; margin-bottom: 20px;">
        <div style="text-align: center;">
          <h1 style="font-size: 24px; margin-bottom: 20px;">Password Change Notification</h1>
          <p style="font-size: 16px;">Hello ${firstName},</p>
          <p style="font-size: 16px;">This is a confirmation that the password for your account on <a href="${Christ_Baptist_Church}" style="color: orange;">Christ Baptist Church</a> has been successfully changed.</p>
          <p style="font-size: 16px;">If you did not make this change, please contact our support team immediately.</p>
          <br>
          <p style="font-size: 16px;">Best regards,</p>
          <p style="font-size: 16px;">Christ Baptist Church</p>
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};



export const sendSupportEmail = async (name, email, message) => {
  const mailOptions = {
    from: email,
    to: process.env.USER, // Replace with your support email
    subject: "Support Request - Christ Baptist Church",
    html: `
      <div style="background-color: #2E3440; padding: 30px; color: #ffffff; border-radius: 8px; font-family: Arial, sans-serif;">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="${gamehubLogo}" alt="GameHub Logo" style="max-width: 150px; height: auto;">
        </div>
        <div style="text-align: left; max-width: 600px; margin: 0 auto;">
          <h1 style="font-size: 26px; margin-bottom: 20px; text-align: center;">Support Request</h1>
          <p style="font-size: 18px; line-height: 1.6;">Dear Support Team,</p>
          <p style="font-size: 18px; line-height: 1.6;">You have received a new support request. Please find the details below:</p>
          <p style="font-size: 18px; line-height: 1.6;"><strong>Name:</strong> ${name}</p>
          <p style="font-size: 18px; line-height: 1.6;"><strong>Email:</strong> ${email}</p>
          <p style="font-size: 18px; line-height: 1.6;"><strong>Message:</strong></p>
          <p style="font-size: 18px; line-height: 1.6;">${message}</p>
          <br>
          <p style="font-size: 18px; line-height: 1.6;">Best regards,</p>
          <p style="font-size: 18px; line-height: 1.6;">The GameHub Team</p>
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};