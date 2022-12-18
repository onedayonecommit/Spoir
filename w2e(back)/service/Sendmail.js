const nodemailer = require('nodemailer');
const dot = require("dotenv").config();
// 메일발송 객체
const mailSender = {
    // 메일발송 함수
    sendGmail: (param) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',   // 메일 보내는 곳
            prot: 587,
            host: 'smtp.gmail.com',
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.mailsender,  // 보내는 메일의 주소
                pass: process.env.mailsenderpassword   // 보내는 메일의 비밀번호
            }
        });
        // 메일 옵션
        var mailOptions = {
            from: process.env.mailsender, // 보내는 메일의 주소
            to: param.toEmail, // 수신할 이메일
            subject: param.subject, // 메일 제목
            html: param.html // 메일 내용
        };

        // 메일 발송    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}

module.exports = mailSender;