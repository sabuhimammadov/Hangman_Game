let options = {
fruits: ["Apple","Blueberry","Mandarin","Pineapple","Pomegranate","Watermelon","Orange"],
animals: ["Tortoise","Tiger","Donkey","Fish","Rabbit","Eagle","Wolf"],
countries:["India","Switzerland","Azerbaijan","China","Israel","Turkey","Serbia","Thailand"]
}

let winCount = 0;
let count = 0;
let chosenWord = "";

function displayOptions(){
    optionsContainer.innerHTML =`<h3>Please Select An Option </h3>`
    let buttonCon =document.createElement("div")
    for(let value in options){
        buttonCon.innerHTML += `<button
         class="options" onclick="generateWord('${value}')"> ${value} </button>`
    }
    optionsContainer.appendChild(buttonCon);
}
//Block all the buttons

const blocker = () => {
    let optionsButtons =document.querySelectorAll(".options");
    let letterButtons =document.querySelectorAll(".letters")

    //disable all options
    optionsButtons.forEach((button) =>{
        button.disabled = true;
    });
    // disable all letters 
    letterButtons.forEach((button) =>{
        button.disabled = true;
    });
    newGameContainer.classList.remove("hide")
};

// Word Generator 
const generateWord = (optionValue) => {
    let optionsButtons =document.querySelectorAll(".options");
    optionsButtons.forEach((button) => {
        if(button.innerText.toLowerCase() === optionValue){
            button.classList.add("active")
        }
        button.disabled = true;
    });
    //initially hide letters,clear previous word 
    letterContainer.classList.remove("hide");
    userInputSection.innerText = "";

    let optionArray = options[optionValue]
    // choose random word
    chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)]
    chosenWord =chosenWord.toUpperCase()
  console.log(chosenWord)




   //replace every letter with span containing dash 
   let displayItem =chosenWord.replace(/./g,`<span class = "dashes">_</span>`)
   //Display each element as span
   userInputSection.innerHTML =displayItem;
};

const initializer = () => {
    winCount =0;
    count =0;
    // initially erase all content and hide letters and new game button 
    userInputSection.innerHTML = "";
    optionsContainer.innerHTML = "";
    letterContainer.classList.add("hide");
     newGameContainer.classList.add("hide");
     letterContainer.innerHTML= "";
console.log(userInputSection)
// For creating letter buttons
    for(let i=65; i<91; i++){
let button = document.createElement("button");
button.classList.add("letters");
// Number to ASCII [A-Z]
button.innerText = String.fromCharCode(i)
// character button click
button.addEventListener("click", () => {
    let charArray = chosenWord.split("")
    console.log(charArray)
    let dashes =document.querySelectorAll(".dashes")
   // console.log(dashes)
    // If Array contains clicked value replace the mathched dash with letter
    if(charArray.includes(button.innerText)) {
        charArray.forEach((char,index) => {
            // If character in array is same as clicked button
            if(char === button.innerText){
                // replace dashed with letter
                dashes[index].innerText = char;
                // increment counter
                winCount += 1
                // If wincount equals word length 
                if(winCount === charArray.length){
                    resultText.innerHTML=` 
                 <img src ="./assents/images/smile.png" class="win-image"><h2 class ="win-msg">Congratulations You win!!!</h2>
                    <p>The word was <span> ${chosenWord}</span></p>`
                    //block all buttons
                    winMusic.play()
                    blocker()
                }
            }

        })
            
        
    }
    else {
        // lose count 
        count +=1;
        if(count == 6){
            resultText.innerHTML =`<img src = "./assents/images/sad.png" class="sad-image"><h2 class ="lose-msg">Oh no You lost!!!</h2>
            <p> The word was  <span> ${chosenWord}</span> </p>`
            loseMusic.play()
            blocker()
        }
        console.log(count)
    }
    //disable clicked button
    button.disabled =true
})
   letterContainer.append(button)
    }
    displayOptions()
}
newGameBtn.addEventListener("click",initializer)
window.onload =initializer();