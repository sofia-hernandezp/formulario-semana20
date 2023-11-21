function enviarDatos() {
    // Obtén los datos del formulario
    const formulario = document.getElementById('miFormulario');
    const formData = new FormData(formulario);
    
    console.log(formData)
  
    // Realiza la solicitud POST al servidor
    fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Respuesta del servidor:', data);
        alert("Los datos de las incripción fueron enviados exitosamente")
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
        alert("No sen enviaron los datos.")
      });
  }

  document.getElementById('btn').addEventListener('click', enviarDatos());
  

