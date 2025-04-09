import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

const churchLogo = process.env.CHRIST_BC_LOGO;

export const sendWelcomeEmail = async (
  email,
  firstName,
  otp,
  verificationLink
) => {
  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: "Verify Your Email - Christ Baptist Church",
    html: `
    <div style="background-color: #f4f4f4; padding: 20px; color: #333; border-radius: 5px; text-align: center;">
      <img src="${churchLogo}" alt="Church Logo" style="max-width: 150px; height: auto; margin-bottom: 20px;">
      <h1 style="font-size: 24px; margin-bottom: 20px;">Welcome to Christ Baptist Church, ${firstName}!</h1>
      <p style="font-size: 16px;">We are delighted to have you join our church family.</p>
      <p style="font-size: 16px;">To complete your registration, please verify your email using the OTP below:</p>
      <h2 style="font-size: 22px; color: #4CAF50; font-weight: bold;">${otp}</h2>
      <p style="font-size: 16px; font-weight: bold; color: red;">Do not share this OTP with anyone.</p>
      <p style="font-size: 16px;">This OTP will expire in <strong>10 minutes</strong>.</p>
      <p style="font-size: 16px;">Click the button below to verify your email:</p>
      <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">Verify Email</a>
      <p style="font-size: 16px; margin-top: 10px;">Or copy and paste this link into your browser:</p>
      <p style="font-size: 14px; color: #555;">${verificationLink}</p>
      <br>
      <p style="font-size: 16px;">If you have any questions or need prayer, feel free to reach out to our church team.</p>
      <br>
      <p style="font-size: 16px;">Blessings,</p>
      <p style="font-size: 16px;"><strong>Christ Baptist Church</strong></p>
    </div>
  `,
  };

  return transporter.sendMail(mailOptions);
};

export const sendOtpEmail = async (email, otp, verificationLink) => {
  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: "Your OTP Code - Christ Baptist Church",
    html: `
      <div style="background-color: #f4f4f4; padding: 20px; color: #333; border-radius: 5px; text-align: center;">
        <img src="${churchLogo}" alt="Church Logo" style="max-width: 150px; height: auto; margin-bottom: 20px;">
        <h1 style="font-size: 24px; margin-bottom: 20px;">Your OTP Code</h1>
        <p style="font-size: 16px;">Use the OTP below to verify your action:</p>
        <h2 style="font-size: 22px; color: #4CAF50; font-weight: bold;">${otp}</h2>
        <p style="font-size: 16px; font-weight: bold; color: red;">Do not share this OTP with anyone.</p>
        <p style="font-size: 16px;">This OTP will expire in <strong>10 minutes</strong>.</p>
        <p style="font-size: 16px;">Click the button below to verify your email:</p>
        <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">Verify OTP</a>
        <p style="font-size: 16px; margin-top: 10px;">Or copy and paste this link into your browser:</p>
        <p style="font-size: 14px; color: #555;">${verificationLink}</p>
        <br>
        <p style="font-size: 16px;">If you did not request this code, please ignore this email.</p>
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

export const sendSecretKeyEmail = async (email, secretKey) => {
  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: "New Admin Secret Key - Christ Baptist Church",
    html: `
      <div style="background-color: #f4f4f4; padding: 20px; color: #333; border-radius: 5px; text-align: center;">
        <h1 style="font-size: 24px;">New Admin Secret Key</h1>
        <p style="font-size: 16px;">A new admin has been registered. Here is the updated secret key for future admin registrations:</p>
        <h2 style="font-size: 22px; color: #4CAF50; font-weight: bold;">${secretKey}</h2>
        <p style="font-size: 16px; font-weight: bold; color: red;">Keep this key safe and do not share it.</p>
        <br>
        <p style="font-size: 16px;">Blessings,</p>
        <p style="font-size: 16px;"><strong>Christ Baptist Church</strong></p>
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

export const sendBroadcastEmail = async (
  email,
  subject,
  message,
  imageUrl,
  videoUrl
) => {
  const fullSubject = `${subject} - Christ Baptist Church`;

  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: fullSubject,
    html: `
      <div style="background-color: #f4f4f4; padding: 30px; color: #333; border-radius: 8px; font-family: Arial, sans-serif;">
        <div style="text-align: center;">
          <img src="${churchLogo}" alt="Church Logo" style="max-width: 150px; margin-bottom: 20px;">
        </div>
        <h2 style="text-align: center; color: #2d3748; margin-bottom: 20px;">${subject}</h2>
        
        ${imageUrl ? `<img src="${imageUrl}" alt="Broadcast Image" style="max-width: 100%; margin-bottom: 20px;">` : ""}
        ${
          videoUrl
            ? `<video controls style="max-width: 100%; margin-bottom: 20px;">
                        <source src="${videoUrl}" type="video/mp4">
                        Your browser does not support the video tag.
                      </video>`
            : ""
        }
        
        <p style="font-size: 16px; line-height: 1.6; text-align: center;">${message}</p>
        <br>
        <p style="font-size: 16px; text-align: center;">Blessings,</p>
        <p style="font-size: 16px; font-weight: bold; text-align: center;">Christ Baptist Church</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

export const sendRoleChangeNotification = async (
  email,
  fullName,
  oldRole,
  newRole
) => {
  console.log("Sending role change notification email...");
  console.log("Email:", email);
  console.log("Full Name:", fullName);
  console.log("Old Role:", oldRole);
  console.log("New Role:", newRole);
  try {
    const mailOptions = {
      from: process.env.USER,
      to: email,
      subject: `Your Role Has Been Changed in Christ Baptist Church`,
      html: `
      <div style="background-color: #f4f4f4; padding: 20px; border-radius: 8px; text-align: center; color: #333;">
        <img src="${churchLogo}" alt="Church Logo" style="max-width: 120px; margin-bottom: 20px;" />
        <h2 style="font-size: 20px;">Hello ${fullName},</h2>
        <p>Your role in <strong>Christ Baptist Church</strong> has been changed.</p>
        <p><strong>Previous Role:</strong> ${oldRole}</p>
        <p><strong>New Role:</strong> ${newRole}</p>
        <br />
        <p>If you believe this was done in error, please contact the church admin immediately.</p>
        <p style="margin-top: 30px;">Blessings,<br><strong>Christ Baptist Church</strong></p>
      </div>
    `,
    };
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Email sending failed:", error.message);
    throw error; // rethrow so PATCH route captures it
  }
};



export const sendContributionEmail = async ({
  email,
  fullName,
  amount,
  type,
  paymentMethod,
  week,
  month,
  year,
  createdByName,
  description,
}) => {
  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: "Savings Record Confirmation - Christ Baptist Church Cooperative",
    html: `
      <div style="background-color: #f4f4f4; padding: 20px; color: #333; border-radius: 5px; text-align: center;">
        <img src="${churchLogo}" alt="Church Logo" style="max-width: 150px; height: auto; margin-bottom: 20px;">
        <h1 style="font-size: 24px; margin-bottom: 20px;">Hello ${fullName},</h1>
        <p style="font-size: 16px;">Your savings contribution has been recorded successfully. Please find the details below:</p>
        <div style="text-align: left; margin: 20px auto; display: inline-block;">
          <p><strong>Amount Saved:</strong> ₦${amount.toLocaleString()}</p>
          <p><strong>Contribution Type:</strong> ${type}</p>
          <p><strong>Payment Method:</strong> ${paymentMethod}</p>
          <p><strong>Week:</strong> ${week}</p>
          <p><strong>Month:</strong> ${month}</p>
          <p><strong>Year:</strong> ${year}</p>
          ${description ? `<p><strong>Description:</strong> ${description}</p>` : ""}
          <p><strong>Recorded By:</strong> ${createdByName}</p>
        </div>
        <p style="font-size: 16px;">Thank you for your commitment to your savings goals. Keep up the good work!</p>
        <br>
        <p style="font-size: 16px;">Warm regards,</p>
        <p style="font-size: 16px;"><strong>Christ Baptist Church Cooperative</strong></p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

