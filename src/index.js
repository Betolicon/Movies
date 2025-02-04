import "./style.css"
const KEY =  '3499950c'

const div = document.querySelectorAll('div')

div.forEach(element => {
    if(element.classList.contains('content')){
        const h1 = document.createElement('h1')
        h1.innerText = 'Hola'
        element.appendChild(h1)
    }
    else{
        const h2 = document.createElement('h2')
        h2.innerText = 'Prueba'
        element.style.backgroundColor = "Red"
        element.appendChild(h2)
    }
})