
// Création du tableau contenant les mots.
const wordsTab = ["acme", "agueusie", "alacrite", "algide", "chirurgien", "coruscant", "creneau", "cuillere", "ecaille", "ecureuil", "grenouille", "grele", "heureux", "inaugurer", "millefeuille", "oiseau", "poireau", "quincaillerie", "ratatouille", "vinaigrette"]
console.log(wordsTab);

// récupération des éléments HTML on fait pointer des variables vers chaque élément HTML avec lequel on veut interagir.
// le nom des variables ne doit pas forcément être identique à l'id de l'élément vers lequel on pointe.
let gameField = document.querySelector('#gameField');
let imgContainer = document.querySelector('#imgContainer');
let wordWas = document.querySelector('#wordWas');
let solution = document.querySelector('#solution');
let winLost = document.querySelector('#winLost');

// Création d'un tableau contenant les lettres de l'alphabet
let arrayLetter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
// Création fonction pour insérer les lettres de l'alphabet dans l'élément HTML letterContainer
function preparegame() {
    // Récupération de l'élément html portant l'id letterContainer dans la variable letterContainer
    // dans lequel on va injecter l'élément <p> HTML qui contiendra l'aphabet contenu dans le tableau arrayLetter.
    let letterContainer = document.querySelector("#letterContainer")
    // Déclaration d'une variable Pone à la valeur null pour paragraphe one qui va servir à injecter le résultat de la boucle
    // for dans l'élément HTML #letterContainer vers lequel pointe la variable letterContainer
    let pOne = null
    // Boucle for qui va incrémenter de la valeur 0 jusqu'a la valeur équivalente à la taille du tableau arrayLetter qui contient
    // 26 valeurs dont l'index va de 0 à 25.
    for (let i = 0; i < arrayLetter.length; i++) {
        // On créer un élément HTML <p> à l'aide de document.createElement vers lequel va pointer la variable pOne
        pOne = document.createElement('p')
        // On ajoute une class .letter à l'élément HTML que l'on vient de créer à l'aide de classList.add
        pOne.classList.add('letter')
        // On insert dans l'élément HTML vers lequel pointe la variable pOne les valeurs contenues dans le tableau arrayLetter
        // à l'aide de la boucle for.
        pOne.innerText = arrayLetter[i]
        // On déclare que l'élément pOne que l'on vient de créer, c'est à dire un élément HTML <p> qui possède la class .letter
        // et qui contient les 26 valeurs du tableau arrayLetter est un élément enfant de l'élément HTML portant l'id letterContainer
        // vers lequel pointe la variable letterContainer.
        letterContainer.appendChild(pOne)
        pOne.addEventListener('click', (pOne)=>{
            console.log(pOne.target);
        })
    }
}
// appel de la fonction preparegame.
preparegame();
// Création fonction pour l'état initial de la page.
function initialState() {
    // On injecte dans la variable imgContainer qui pointe vers l'élément HTML qui possède l'id #imgContainer une image.
    imgContainer.innerHTML = "<img src=\"./assets/img/pendu-4.png\">";
    // De la mème manière on injecte une chaîne de caractère dans l'élément HTML qui possède l'id #gameField.
    gameField.innerHTML = "START to begin";
    // idem pour l'élément HTML qui possède l'id #wordWas.
    wordWas.innerHTML = "";
    // idem pour #solution
    solution.innerHTML = "";
    // idem pour #winLost
    winLost.innerHTML = "";

}
// Appel de la fonction pour mettre la page à l'état initial
initialState();

// Création fonction random
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Création de l'event listener sur le bouton startButton (click) pour appeller la fonction startGame
startButton.addEventListener("click", () => {
    startGame()
})

// Création de la fonction startGame pour démarrer le jeu
function startGame() {
    // Déclaration d'une variable wordChoice qui va contenir le mot choisi de manière aléatoire à l'aide de la methode getRandomInt
    // dans le tableau wordsTab
    let wordChoice = wordsTab[getRandomInt(20)];
    // On injecte l'image du pendu dans l'élément HTML qui possède l'id imgContainer à l'aide de la méthode innerHTML
    imgContainer.innerHTML = "<img src=\"./assets/img/pendu-4.png\">";
    // On va créer une boucle for qui va servir à remplir l'élément HTML qui possède l'id gameField avec le nombre de tirets
    // correspondant à la taille du mot choisi contenu dans la variable wordChoice. Pour commencer on déclare une variable str vide.
    str = ""
    // Création de la boucle for qui incrémente de 0 à l'équivalent de la longueur du mot contenu dans la variable wordChoice.
    for (let i = 0; i < wordChoice.length; i++) {
        // A chaque itération de la boucle for on lui ajoute sa valeur précédente plus un tiret
        // Première itération str est une chîne vide à laquelle on ajoute un "-"
        // Deuxième itération str contient "-" à laquelle on ajoute "-", ce qui donne "--"
        // Troisième itération str contient "--" à laquelle on ajoute "-", ce qui donne "---"
        // et ainsi de suite jusqu'à ce que la valeur de i soit équivalente à la longeur du mot contenu dans la variable wordChoice.
        str += "_"
    }
    // Lorsque la boucle for est terminée après que i ait atteind la valeur correspondante à la longueur de la chaîne contenue dans
    // la variable wordChoice, alors on injecte la chaine contenue dans la variable str dans l'élément HTML #gamefield vers lequel
    // pointe la variable gameField.
    gameField.innerText = str
}