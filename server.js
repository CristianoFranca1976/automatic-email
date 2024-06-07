// require('dotenv').config();
// const express = require('express');
// const nodemailer = require('nodemailer');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(bodyParser.json());
// app.use(express.static('public')); // Servir arquivos estáticos da pasta public

// app.post('/send-email', async (req, res) => {
//     const { name, email } = req.body;

//     let transporter = nodemailer.createTransport({
//         host: 'smtp-mail.outlook.com',
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS
//         }
//     });

//     // Opções de e-mail para o cliente
//     let clientMailOptions = {
//         from: process.env.EMAIL_USER,
//         to: email,
//         subject: 'Obrigado pelo seu contato',
//         text: `Olá ${name},\n\nObrigado por entrar em contato conosco. Em breve retornaremos o seu contato.\n\nAtenciosamente,\nEquipe`
//     };

//     // Opções de e-mail para você
//     let adminMailOptions = {
//         from: process.env.EMAIL_USER,
//         to: process.env.EMAIL_USER, // Ou outro endereço de e-mail
//         subject: 'Novo feedback/contato recebido',
//         text: `Você recebeu um novo feedback/contato.\n\nNome: ${name}\nEmail: ${email}\n\nPor favor, verifique e responda adequadamente.`
//     };

//     try {
//         // Enviar e-mail para o cliente
//         await transporter.sendMail(clientMailOptions);
        
//         // Enviar e-mail para o administrador
//         await transporter.sendMail(adminMailOptions);

//         res.status(200).send('Email enviado com sucesso.');
//     } catch (error) {
//         console.error('Erro ao enviar e-mail:', error);
//         res.status(500).send('Erro ao enviar e-mail.');
//     }
// });

require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // Servir arquivos estáticos da pasta public

app.post('/send-email', async (req, res) => {
    const { name, email } = req.body;

    let transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Verificação e ajustes nos campos 'from' e 'to'
    const fromEmail = process.env.EMAIL_USER;
    const toClientEmail = email;
    const toAdminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER; // Adiciona a opção de um email de admin separado

    // Opções de e-mail para o cliente
    let clientMailOptions = {
        from: fromEmail,
        to: toClientEmail,
        subject: 'Obrigado pelo seu contato',
        text: `Olá ${name},\n\nObrigado por entrar em contato conosco. Em breve retornaremos o seu contato.\n\nAtenciosamente,\nEquipe`
    };

    // Opções de e-mail para você
    let adminMailOptions = {
        from: fromEmail,
        to: toAdminEmail,
        subject: 'Novo feedback/contato recebido',
        text: `Você recebeu um novo feedback/contato.\n\nNome: ${name}\nEmail: ${email}\n\nPor favor, verifique e responda adequadamente.`
    };

    try {
        // Enviar e-mail para o cliente
        await transporter.sendMail(clientMailOptions);
        
        // Enviar e-mail para o administrador
        await transporter.sendMail(adminMailOptions);

        res.status(200).send('Email enviado com sucesso.');
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        res.status(500).send('Erro ao enviar e-mail.');
    }
});

const PORT = process.env.PORT || 3021;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: http://localhost:${PORT}`);
});
