const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');


const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port =3000;

// Middleware para parsear JSON
app.use(express.json());
app.use(cors({
    origin: '*'
}));
// Ruta para recibir los datos del formulario
app.post('/send-email', async(req, res) => {
    
    const { name, email, tel, motivo } = req.body;
    console.log("datos recibidos:",name, email, tel, motivo);
    try {
        // Configurar transporte de correo
         // Configurar el transportador de Nodemailer
        const transporter = nodemailer.createTransport({
            host:process.env.EMAIL_HOST,
            port:process.env.EMAIL_PORT,
            secure:false,
            auth: {
                user:process.env.EMAIL_DESTINO,
                pass:process.env.EMAIL_PASS
            }
        });
        // Verificamos si se están cargando las variables de entorno correctamente
        console.log("EMAIL_DESTINO:", process.env.EMAIL_DESTINO);
        console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Cargado" : "No cargado");

        // Opciones del correo
        const mailOptions = {
            from: ` ${req.body.name} `,
            to: process.env.EMAIL_DESTINO,
            subject: 'Nuevo mensaje de contacto del portfolio',
            text: `Nombre: ${name}\nEmail: ${email}\nTel: ${tel}\nMotivo: ${motivo}`,
        };
        // Enviar el correo
        const info = await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Correo enviado' });
    } catch (error) {
        console.error('Error al enviar correo: ', error);//muestro el error
        res.status(500).json({ error: 'Error al enviar correo' });
    }

 });



//  const PORT = port || 8080;
//  app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));  
module.exports = app;