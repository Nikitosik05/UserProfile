const nodemailer = require('nodemailer')


class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.NODEMAILER_HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.NODEMAILER_LOGIN,
                pass: process.env.NODEMAILER_PASSWORD,
            }
      })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            to,
            from: process.env.NODEMAILER_LOGIN,
            subject: 'Account activation',
            text: '',
            html: `
                <div>
                Thank you for registration. To activate account click <a href="${link}">here</a>
                </div>
            `
        })
    }

}

module.exports = new MailService()