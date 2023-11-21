document.addEventListener("DOMContentLoaded",()=>{
    const formDOM = document.getElementsByTagName('form')[0]
    const submitBtn = document.getElementById("submitBtn")
    formDOM.addEventListener("submit",(event)=>{
        event.preventDefault()
        //console.log(formDOM.elements)
        let datos = {
            name: document.getElementById('nombre').value,
            lastname: document.getElementById('apellido').value,
            email: document.getElementById('correo').value,
            country: document.getElementById('pais').value,
            occupation: document.getElementById('ocupacion').value,
            description: document.getElementById('descripcion').value
        }
        let reqOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos)
        }
        console.log(reqOptions)
        fetch("http://localhost:3000", reqOptions).then(
            (response)=>response.json()
            ).then((res)=>{
            console.log(res)
        })
        .catch((err)=>{console.log(err)})
        console.log(datos)
    })
})