class Hangman {
     letterContainer = document.querySelector("#letter-container")
     optionsContainer = document.querySelector("#options-container")
     userInputSection = document.querySelector("#user-input-section")
     newGameContainer =document.querySelector("#new-game-container")
     resultText =document.querySelector("#result-text")
     newGameBtn =document.querySelector("#new-game-button")
     winMusic =document.querySelector("#winMusic")
     loseMusic =document.querySelector("#loseMusic")
name=null
constructor(name){
    this.name=name
}
winCount = 0;
count = 0;
chosenWord = "";

 options = {
    fruits: ["Apple","Blueberry","Mandarin","Pineapple","Pomegranate","Watermelon","Orange"],
    animals: ["Tortoise","Tiger","Donkey","Fish","Rabbit","Eagle","Wolf"],
    countries:["India","Switzerland","Azerbaijan","China","Israel","Turkey","Serbia","Thailand"]
    }
    
    
    
     displayOptions(){
       this.optionsContainer.innerHTML =`<h3>Please Select An Option </h3>`
        let buttonCon =document.createElement("div")
        for(let value in this.options){
            buttonCon.innerHTML += `<button
             class="options" onclick="game1.generateWord('${value}')"> ${value} </button>`
        }
        this.optionsContainer.appendChild(buttonCon);
    }
    //Block all the buttons
    
     blocker(){
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
        this.newGameContainer.classList.remove("hide")
    };
    
    // Word Generator 
     generateWord(optionValue) {
        let optionsButtons =document.querySelectorAll(".options");
        optionsButtons.forEach((button) => {
            if(button.innerText.toLowerCase() === optionValue){
                button.classList.add("active")
            }
            button.disabled = true;
        });
        //initially hide letters,clear previous word 
        this.letterContainer.classList.remove("hide");
        this.userInputSection.innerText = "";
    
        let optionArray = this.options[optionValue]
        // choose random word
        this.chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)]
        this.chosenWord =this.chosenWord.toUpperCase()
      //console.log(chosenWord)
    
    
    
    
       //replace every letter with span containing dash 
       let displayItem =this.chosenWord.replace(/./g,`<span class = "dashes">_</span>`)
       //Display each element as span
       this.userInputSection.innerHTML =displayItem;
    };
    
    newGamebtnFunc(){
        this.newGameBtn.addEventListener("click",this.initializer())
    }
     initializer(){
        this.winCount =0;
        this.count =0;
        // initially erase all content and hide letters and new game button 
        this.userInputSection.innerHTML ="";
        this.optionsContainer.innerHTML = "";
        this.letterContainer.classList.add("hide");
         this.newGameContainer.classList.add("hide");
         this.letterContainer.innerHTML= "";
    console.log(this.userInputSection)
    // For creating letter buttons
        for(let i=65; i<91; i++){
    let button = document.createElement("button");
    button.classList.add("letters");
    // Number to ASCII [A-Z]
    button.innerText = String.fromCharCode(i)
    // character button click
    button.addEventListener("click", () => {
        let charArray = this.chosenWord.split("")
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
                    this.winCount += 1
                    // If wincount equals word length 
                    if(this.winCount === charArray.length){
                        this.resultText.innerHTML=` 
                     <img src ="./assents/images/smile.png" class="win-image"><h2 class ="win-msg">Congratulations You win!!!</h2>
                        <p>The word was <span> ${this.chosenWord}</span></p>`
                        //block all buttons
                        this.winMusic.play()
                        this.blocker()
                    }
                }
    
            })
                
            
        }
        else {
            // lose count 
            this.count +=1;
            if(this.count == 6){
                this.resultText.innerHTML =`<img src = "./assents/images/sad.png" class="sad-image"><h2 class ="lose-msg">Oh no You lost!!!</h2>
                <p> The word was  <span> ${this.chosenWord}</span> </p>`
                this.loseMusic.play()
                this.blocker()
            }
            console.log(this.count)
        }
        //disable clicked button
        button.disabled =true
    })
       this.letterContainer.append(button)
        }
        this.displayOptions()
    }

}

var game1 =new Hangman("Sabuhi")
game1.newGamebtnFunc()
window.onload =game1.initializer()