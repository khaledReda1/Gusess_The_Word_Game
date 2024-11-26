// Sitting Game Name
let gameName = "Guess The Word";

document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Game Created By Khaled Reda`;

// Sitting Game Opations

let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;
let numberOfHInts = 3;

//mange words
let wordToguess = "";
const words = ["Create","Update", "Delete", "Master","Branch", "Mainly", "Khaled","School"];

wordToguess = words [Math.floor(Math.random() * words.length)].toLowerCase();
let massageArea = document.querySelector(".massege");

//mange hints
document.querySelector(".hint span").innerHTML = numberOfHInts;
const getHintButton  = document.querySelector(".hint");
getHintButton.addEventListener("click", getHint);

// console.log(wordToguess);

function generateInput () {
    const inputCotainer = document.querySelector(".input");
    // create try Div
    for (let i = 1; i<=numberOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML= `<span>Try ${i}</span>`;

    if (i !== 1) tryDiv.classList.add("disabled-inputs");
// create Inputes
    for (let j = 0; j<numberOfLetters; j++) {
        const input = document.createElement("input");
        input.type = "text";
        input.id = `guess${i}-letter-${j}`;
        input.setAttribute("maxlength", "1");
        tryDiv.appendChild(input);
    }
            
    inputCotainer.appendChild(tryDiv);
    }
    inputCotainer.children[0].children[1].focus();

    //disable Al input except first one

    const inputsInDisabledDiv = document.querySelectorAll(".disabled-inputs input");
    inputsInDisabledDiv.forEach((input) => (input.disabled = true));

    // add navegation
    const Inputs = document.querySelectorAll("input");
    Inputs.forEach((input, index) => {
        input.addEventListener("input", function() {
            this.value= this.value.toUpperCase();
            // console.log(index);
            const nextinput = Inputs[index + 1];
            if(nextinput) nextinput.focus();
        });

        input.addEventListener("keydown", function (event) {
        // console.log(event);
        const currentIndex = Array.from(Inputs).indexOf(event.target);// or this
        // console.log(currentIndex);
        if(event.key==="ArrowRight") {
            const nextinput = currentIndex + 1;
            if (nextinput < Inputs.length) Inputs[nextinput].focus();
        }
        if(event.key ==="ArrowLeft") {
            const previnput = currentIndex - 1;
            if (previnput >=0) Inputs[previnput].focus();
        }
        });
    });
}

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuess);

console.log(wordToguess);

function handleGuess() {
    let successGuess = true;
    console.log(wordToguess);
    for(let i = 0; i < numberOfLetters; i++) {
        const inputField = document.querySelector(`#guess${currentTry}-letter-${i}`);
        // console.log(inputField)// 
        const letter = inputField.value.toLowerCase();
        // console.log(letter);
        const actualLetter = wordToguess[i];

        if(letter === actualLetter){
            //letter of currect and in place
            inputField.classList.add("yes-in-place");
        } else if (wordToguess.includes(letter) && letter !== "") {
            //letter of currect and not place
            inputField.classList.add("not-in-place");
            successGuess = false;
        } else {
            inputField.classList.add("no");
            successGuess = false;
        }
    }

    //check if user win or lose 
    if (successGuess) {
        massageArea.innerHTML = `You Win The Word Is  <span>${wordToguess}</span>`;

        if(numberOfHInts ===2) {
            massageArea.innerHTML = `<p>Congrate You Didn't USe Hints</p>`;
        }

        let alltries = document.querySelectorAll(".input > div");
        alltries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));
        // diesable gesuss botton
        guessButton.disabled = true;
        getHintButton.disabled = true;

    } else {
        document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");
        const currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
        currentTryInputs.forEach((input) => (input.disabled = true));
        currentTry++;

        
        const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
        nextTryInputs.forEach((input) => (input.disabled = false));

let el = document.querySelector(`.try-${currentTry}`);

if(el) {
    document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs");
    el.children[1].focus();
}else {
    guessButton.disabled = true;
    getHintButton.disabled = true;
    massageArea.innerHTML = `You Lose The Word Is <span>${wordToguess}<span/>`;
}
    }
}

function getHint (){
    if(numberOfHInts > 0) {
        numberOfHInts--;
        document.querySelector(".hint span").innerHTML = numberOfHInts;
    }
    if(numberOfHInts === 0) {
        getHintButton.disabled = true;
    }


    // input inable
const enableInput = document.querySelectorAll("input:not([disabled])");
// console.log(enableInput)
const emptyEnableInputs = Array.from(enableInput).filter((input)=> input.value === "");
if(emptyEnableInputs.length > 0) {
    const randomindex = Math.floor(Math.random() * emptyEnableInputs.length);
    // console.log(randomindex)
    const randominput = emptyEnableInputs[randomindex];
    // console.log(randomindex)
    //  console.log(randominput)
    const indextoFill = Array.from(enableInput).indexOf(randominput);
    if(indextoFill !== -1) {
        randominput.value = wordToguess[indextoFill].toUpperCase();
    }
    }
    }

    function handelBack(event) {
    if(event.key === "Backspace") {
        const inputs = document.querySelectorAll("input:not([disabled])");
        const currentIndex = Array.from(inputs).indexOf(document.activeElement);
        // console.log(currentIndex);
    if(currentIndex > 0) {
        const current = inputs[currentIndex];
        const priv = inputs[currentIndex -1];
        current.value = "";
        priv.value = "";
        priv.focus();
    }
    }
    }
document.addEventListener("keydown",handelBack );
window.onload = function () {
    generateInput()
};