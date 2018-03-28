
const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
};

const buildDomString = animalArray => {
    let domString = "";
    animalArray.forEach((animal) => {
        if(animal.isCarnivore){
            domString += `<div class="animal carnivore">`;
        } else{
            domString += `<div class="animal vegetable">`;
        }
        domString +=    `<h1>${animal.name}</h1>`;
        domString +=    `<h3>${animal.number}</h3>`;
        domString +=    `<img src ="${animal.imageUrl}">`;
        domString +=    `<div class="button-container">`;
        domString +=        `<button class="escaped">Escaped</button>`;
        domString +=    `</div>`;
        domString += `</div>`;
    })
    printToDom(domString, 'animal-holder')
};

const addEscapedEventListeners = () =>{
    const escapedButtons = document.getElementsByClassName('escaped');
    for(let i=0; i<escapedButtons.length; i++){
        escapedButtons[i].addEventListener('click', animalEscaped);
    }
};

const animalEscaped = (e) => {
    const badAnimalButtonContainer = e.target.parentNode;
    showCarnivores();
    showVegetables();
    showFoundButton(badAnimalButtonContainer);
};

const showFoundButton = (buttonContainer) => {
    buttonContainer.innerHTML = `<button id="found">Found</button>`;
    initializeFoundButton()
}

const initializeFoundButton = () => {
    const foundButton = document.getElementById('found');
    foundButton.addEventListener('click', () => {
        const animals = document.getElementsByClassName('animal');
        for(let m=0; m<animals.length; m++){
            animals[m].children[3].innerHTML = `<button class="escaped">Escaped</button>`;
            animals[m].classList.remove('green');  
            animals[m].classList.remove('red');  
        }
        addEscapedEventListeners();
    });
};

const showCarnivores = () => {
    const carnivores = document.getElementsByClassName('carnivore');
    for(let j=0; j<carnivores.length; j++){
        carnivores[j].children[3].innerHTML = '';
        carnivores[j].classList.add('red');

    }
};

const initializeEatMeButtons = () => {
    const eatMeButtons =document.getElementsByClassName('eat-me');
    for(let n = 0; n<eatMeButtons.length; n++){
        eatMeButtons[n].addEventListener('click', itAlreadyBeenEaten);
    }
}

const itAlreadyBeenEaten = (e) => {
    const currentNumber = e.target.parentNode.parentNode.children[1].innerHTML;
    const newNumber = currentNumber*1 -1;
    e.target.parentNode.parentNode.children[1].innerHTML = newNumber;
}

const showVegetables = () => {
    const vegetables = document.getElementsByClassName('vegetable');
    for(let k=0; k<vegetables.length; k++){
        vegetables[k].children[3].innerHTML = `<button class="eat-me">EAT ME!</button>`;
        vegetables[k].classList.add('green');
    }
    initializeEatMeButtons();
};


function WTF(){
    console.log("something went wrong");
}

function executeFunction (){
    const data = JSON.parse(this.responseText);
    buildDomString(data.animals);
    addEscapedEventListeners();
}

const startApplication = () =>{
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", executeFunction);
    myRequest.addEventListener("error", WTF);
    myRequest.open("GET", "animals.json");
    myRequest.send();
};

startApplication();