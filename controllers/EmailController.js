const nodemailer = require("nodemailer");
require("dotenv").config();

class EmailController {
  constructor() {
    // Configuração do transporte do Nodemailer para Gmail
    this.transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      auth: {
        user: "contato@melotechconsulting.com", // E-mail do remetente
        pass: "Maneka261085*", // Senha ou senha de aplicativo
      },
    });
  }

  sendContact = async (req, res) => {
    try {
      const { name, email, phone, message } = req.body;
      const result = await this.sendEmail({
        name,
        email,
        phone,
        subject: 'Contato via site da ARCTRONIC',
        message,
      });
      return res.status(200).json(result);
    } catch (error) {
      console.log("erro: ", error);
      return res.status(500).json({ error: error.message });
    }
  };

  async sendEmail({ name, email, phone, subject, message }) {
    try {
      // Configuração do e-mail
      const mailOptions = {
        from: "contato@melotechconsulting.com", // Remetente
        // to: 'contato@arctronic.com.br', // Destinatário (mesmo e-mail para contato)
        to: `eduardo017melo@gmail.com`,
        subject: `Nova Mensagem de Contato: ${subject}`, // Assunto do e-mail
        html: `
          <h2>Nova Mensagem de ${name}</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Telefone:</strong> ${phone || "Não informado"}</p>
          <p><strong>Assunto:</strong> ${subject}</p>
          <p><strong>Mensagem:</strong> ${message}</p>
        `, // Corpo do e-mail em HTML
      };

      // Enviar o e-mail
      const info = await this.transporter.sendMail(mailOptions);
      return { success: true, message: "E-mail enviado com sucesso!" };
    } catch (error) {
      console.error("Erro ao enviar e-mail: ", error);
      throw new Error("Erro ao enviar e-mail. Tente novamente.");
    }
  }
}

module.exports = new EmailController();
