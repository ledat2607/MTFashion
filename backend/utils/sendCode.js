const nodemailer = require("nodemailer");

const sendCode = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  // Generate a random verification code (you can use a library for more robust code generation)
  const verificationCode = Math.floor(100000 + Math.random() * 900000);

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    html: `
      <div style="text-align: center;">
        <img src="https://img.freepik.com/free-vector/thank-you-lettering_1262-6963.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703635200&semt=ais" alt="Your Store Logo" style="max-width: 100px; margin-top: 20px;" />
        <p style="font-size: 18px; color: #007BFF; font-weight: bold; margin-top: 20px;">
          Đội ngũ hỗ trợ rất vui vì được phục vụ quý khách.
        </p>

      
        <p style="font-size: 16px; margin-top: 10px;">Đây là email được gửi từ đội ngũ hỗ trợ khách hàng. </br> Bên dưới là mã số để xác nhận tài khoản của quý khách</p>
        
      
        <p style="font-size: 16px; margin-top: 10px;">
          Đây là mã xác thực để xác minh tài khoản của bạn
          <p style="font-weight: bold; font-size: 24px; color: #007BFF;">${verificationCode}
          </p>
        </p>
        <i>(Vui lòng không chia sẻ mã này cho bất kỳ ai).</i>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return verificationCode;
  } catch (error) {
    throw new Error("Email không tồn tại !");
  }
};

module.exports = sendCode;
