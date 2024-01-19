
const wordsTab = ["ACME", "AGUEUSIE", "ALACRITE", "ALGIDE", "CHIRURGIEN", "CORUSCANT", "CRENEAU", "CUILLERE", "ECAILLE", "ECUREUIL", "GRENOUILLE", "GRELE", "HEUREUX", "INAUGURER", "MILLEFEUILLE", "OISEAU", "POIREAU", "QUINCAILLERIE", "RATATOUILLE", "VINAIGRETTE"]

let gameField = document.querySelector('#gameField');
let imgContainer = document.querySelector('#imgContainer');
let letterContainer = document.querySelector('letterContainer');
let wordWas = document.querySelector('#wordWas');
let solution = document.querySelector('#solution');
let winLost = document.querySelector('#winLost');
let playAgain = document.querySelector('#replayButton');
let apiVersionButton = document.querySelector('#apiVersionButton');
let randomGame = false;
let randomWord = "";
let finalRandomWord = "";
let wordChoice = ""
let pOne = null;
let gameIndex = 0;
let randomGameIndex = 0
let errorCount = 4;
let arrayLetter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
let strResultTemp = "";


startButton.addEventListener("click", () => {
    startGame()
})

function startGame() {
    gameIndex += + 1;
    if (gameIndex < 2) {
        preparegame();
        wordChoice = wordsTab[getRandomInt(20)];
    }
    imgContainer.innerHTML = "<img src=\"./assets/img/pendu-4.png\">";
    strResultTemp = ""
    for (let i = 0; i < wordChoice.length; i++) {
        strResultTemp += "_"
    }
    gameField.innerText = strResultTemp
}

function startRandomGame() {
    randomGameIndex += + 1;
    if (randomGameIndex < 2) {
        preparegame();
    }
    imgContainer.innerHTML = "<img src=\"./assets/img/pendu-4.png\">";
    strResultTemp = ""
    for (let i = 0; i < wordChoice.length; i++) {
        strResultTemp += "_"
    }
    gameField.innerText = strResultTemp
}



function preparegame() {
    let letterContainer = document.querySelector("#letterContainer")
    for (let i = 0; i < arrayLetter.length; i++) {
        pOne = document.createElement('p')
        pOne.classList.add('letter')
        pOne.innerText = arrayLetter[i]
        letterContainer.appendChild(pOne)
        pOne.addEventListener('click', (pOne) => {
            progress(pOne)
        })
    }

    playAgain.addEventListener("click", () => {
        wordChoice = ""
        pOne = null;
        gameIndex = 0;
        errorCount = 4;
        strResultTemp = "";
        imgContainer.innerHTML = "<img src=\"./assets/img/pendu-4.png\">";
        gameField.innerHTML = "START to begin";
        wordWas.innerHTML = "";
        solution.innerHTML = "";
        winLost.innerHTML = "";
        letterContainer.innerHTML = "";
        startGame();
    })
}

apiVersionButton.addEventListener('click', async () => {
    await getRandomWord()
    console.log(randomWord);
    const removeAccents = str =>
        str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    let nomalizedRandomWord = removeAccents(randomWord);
    console.log(nomalizedRandomWord);
    let finalRandomWord = nomalizedRandomWord.toUpperCase();
    console.log(finalRandomWord);
    wordChoice = finalRandomWord;
    pOne = null;
    gameIndex = 0;
    randomGameIndex = 0;
    errorCount = 4;
    strResultTemp = "";
    imgContainer.innerHTML = "<img src=\"./assets/img/pendu-4.png\">";
    gameField.innerHTML = "START to begin";
    wordWas.innerHTML = "";
    solution.innerHTML = "";
    winLost.innerHTML = "";
    let letterContainer = document.querySelector('#letterContainer');
    letterContainer.innerHTML = "";
    startRandomGame();
})



// Pour assigner une lettre contenue dans une variable de type string dans une autre variable grace à l'index de la variable source
// on fait :
// let str = "";
// str = variableSource[index de la lettre dans la chaine de caractère]
// la variable str contient désormais la lettre de la variable source à l'index indiqué.
function progress(pOne) {
    let str = ""
    for (j = 0; j < wordChoice.length; j++) {
        if (wordChoice[j] == pOne.target.innerHTML) {
            str += wordChoice[j];
            pOne.target.style.backgroundColor = "#540b0e";
            pOne.target.style.color = "#FFE6A7";
        } else {
            str += strResultTemp[j]
            pOne.target.style.backgroundColor = "#540b0e";
            pOne.target.style.color = "#FFE6A7";
        }
    }

    strResultTemp = str
    gameField.innerHTML = str
    if (str === wordChoice) {
        wordWas.innerHTML = "Le mot était bien";
        solution.innerHTML = wordChoice;
        winLost.innerHTML = "Vous avez gagné !";
    }
    let keyTemp = pOne.target.innerHTML;
    if (wordChoice.indexOf(keyTemp) == -1 && errorCount <= 10) {
        errorCount += + 1;
        imgContainer.innerHTML = imgContainer.innerHTML.replace(/\d+/g, errorCount)
    }
    else if (errorCount >= 11) {
        gameLost();
    }
}

function gameLost() {
    imgContainer.innerHTML = "<img src=\"./assets/img/pendu-11.png\">";
    wordWas.innerHTML = "Le mot était";
    solution.innerHTML = wordChoice;
    winLost.innerHTML = "Vous avez perdu !";
}

function initialState() {
    imgContainer.innerHTML = "<img src=\"./assets/img/pendu-4.png\">";
    gameField.innerHTML = "START to begin";
    wordWas.innerHTML = "";
    solution.innerHTML = "";
    winLost.innerHTML = "";
}

initialState();

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


async function getRandomWord () {
    let promise = await fetch("https://trouve-mot.fr/api/random/1")
    let data = await promise.json()
    return randomWord = data[0].name 
}


// Première méthode pour utiliser fetch pour utiliser les api, avec cette méthode
// le code continue d'être éxécutée même si l'objet de la requette n'a pas étté reçu.
// let promise = fetch("https://trouve-mot.fr/api/random").then((res)=>{
//    res.json().then((word)=>{
//         console.log(word);
//    })
// })

// Deuxième méthode pour utiliser les api, avec cette méthode de fonction asynchrone
// le code ne se poursuit pas tant que la fonction n'a pas étée complètement exécutée.
// Mots clés : async et await.
// async function getRandomWord() {
//     let promise = await fetch("https://trouve-mot.fr/api/random/1")
//     let word = await promise.json()
//     console.log(word);
// }

// getRandomWord()

// Version du pendu avec mot aléatoires récupérés par une API avec la méthode fetch.
