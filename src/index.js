document.addEventListener("DOMContentLoaded", ()=> {
    getDogData()
    const dogInfo = document.querySelector("#dog-info")
    
})
let dogs;
function getDogData(){
    return fetch("http://localhost:3000/pups")
    .then(res=> res.json())
    .then(pups => {
        dogs = pups;
        display(pups)
    })
 }

function display(pups){
    const dogBar = document.getElementById("dog-bar");
    pups.forEach(element => { 
        dogBar.innerHTML += `
            <span>${element.name}</span>
        `
    });
    const span = document.querySelectorAll("span")
    for (let element of span){
        element.addEventListener('click', handleClick)
    }
 }
 const image = document.createElement('img')
 const h2 = document.createElement("h2")
 const button = document.createElement("button")

 function handleClick(event){
    let name = event.target.textContent
    const dog = dogs.find((elem)=> {
        if (elem.name=== name){
            return elem
        }
    })
    buildDogInfo(dog)
    
 }

 function buildDogInfo(dogObj){
    const dogInfo = document.querySelector("#dog-info")
    image.src = dogObj.image
    image.id = dogObj.id
    h2.textContent = dogObj.name
    if (dogObj.isGoodDog){
        button.textContent= "Good Dog!"
    }
    else{
        button.textContent= "Bad Dog!"
    }
    button.addEventListener("click", toggle)
    dogInfo.appendChild(image)
    dogInfo.appendChild(h2)
    dogInfo.appendChild(button)
 }
//  ivan
 function toggle(e){
    let id = e.target.parentNode.firstElementChild.id
    const text = e.target.textContent
    let gooDog = {isGoodDog:true }
    if (text === "Good Dog!"){
        gooDog.isGoodDog = false
        button.textContent = "Bad Dog!"
    }
    else{
        gooDog.isGoodDog = true
        button.textContent = "Good Dog!"
    }
    fetch(`http://localhost:3000/pups/${id}`,{
        method: "PATCH",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(gooDog),
    })
    .then(res => res.json())
    .then(pup => pup)

 }