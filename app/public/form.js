
document.querySelector('.send').addEventListener('click', async(e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const motivo = document.getElementById('motivo').value;
    const tel = document.getElementById('tel').value;
    const form = document.querySelector('.form-container form');

    const messageDiv = document.getElementById('form-message');
    messageDiv.innerHTML = '';

    if (!name || !tel || !email || !motivo) {
        messageDiv.textContent = 'Por favor, completa todos los campos.';
        messageDiv.classList.add('show');
    }else{
        // Enviar los datos al servidor
        try {
            const response = await fetch('http://localhost:3000/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, tel, motivo }),
            });

            const result = await response.json();
            if (response.status === 200) {
                messageDiv.textContent = 'Correo enviado correctamente';
                form.reset();//limpiamos el formulario
            } else {
                messageDiv.textContent = 'Error al enviar el correo';
            }
        } catch (error) {
            messageDiv.textContent = 'Error en la conexión con el servidor';
        }
        messageDiv.classList.add('show');
    }

    setTimeout(() => {
        messageDiv.classList.remove('show');
    }, 3000);

});