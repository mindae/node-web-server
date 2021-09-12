
// fetch("http://puzzle.mead.io/puzzle").then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector("form")
const searchLocation = document.querySelector("input")
const msg1=document.querySelector("#msg1")
const msg2=document.querySelector("#msg2")

weatherForm.addEventListener("submit",(event)=>{
    event.preventDefault()
    msg1.textContent="loading..."
    msg2.textContent=""
    const location = searchLocation.value

    fetch("http://localhost:3000/weather?address="+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
              // console.log(data.error)
              msg1.textContent=data.error
              msg2.textContent=""
            }
            msg1.textContent=data.location
            msg2.textContent=data.forecast
            // console.log(data.location)
            // console.log(data.forecast) 
        })
    })
})