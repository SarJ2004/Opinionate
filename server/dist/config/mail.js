import nodemailer from "nodemailer";
export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_SMTP_USER,
        pass: process.env.GMAIL_SMTP_PASSWORD,
    },
});
export const sendEMail = async (to, subject, body) => {
    const info = await transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to: to,
        subject: subject,
        html: body,
    });
    console.log("Message sent:", info.messageId);
};
