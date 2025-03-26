
document.querySelector('.send').addEventListener('click', async(e) => {
    e.preventDefault();
    //traigo los datos del front cuando lo envia 
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const motivo = document.getElementById('motivo').value;
    const tel = document.getElementById('tel').value;
    const form = document.querySelector('.form-container form');

    console.log("datos:",name, email, tel, motivo);

    const messageDiv = document.getElementById('form-message');
    messageDiv.innerHTML = '';

    if (!name || !tel || !email || !motivo) {
        messageDiv.textContent = 'Por favor, completa todos los campos.';
        messageDiv.classList.add('show');
    }else{
        // Enviar los datos al servidor
        try {
            console.log('Enviando datos al servidor...');
            //NO PONEMOS TODA LA URL ya que vercel gestiona automaticamente el dominio
            const response = await fetch('/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, tel, motivo }),
            });
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            // Verificamos si la respuesta tiene un cuerpo JSON
            const result = await response.json(); // Aquí aseguramos que es un JSON

            console.log('Respuesta del servidor:', response.status, result);

            if (response.status === 200) {
                messageDiv.textContent = 'Correo enviado correctamente';
                form.reset();//limpiamos el formulario
            } else {
                messageDiv.textContent = 'Error al enviar el correo';
            }
        } catch (error) {
            messageDiv.textContent = 'Error en la conexión con el servidor';
            console.error('Error en la conexión con el servidor: ', error);
        }
        messageDiv.classList.add('show');
    }

    setTimeout(() => {
        messageDiv.classList.remove('show');
    }, 3000);

});