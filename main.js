
const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
};

const buildDomString = animalArray => {
    let domString = "";
    animalArray.forEach((animal) => {
        domString += `<h1>${animal.name}</h1>`;
    })
    printToDom(domString, 'animal-holder')
};

function WTF(){
    console.log("something went wrong");
}

function executeFunction (){
    const data = JSON.parse(this.responseText);
    buildDomString(data.animals);
}

const startApplication = () =>{
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", executeFunction);
    myRequest.addEventListener("error", WTF);
    myRequest.open("GET", "animals.json");
    myRequest.send();
};

startApplication();