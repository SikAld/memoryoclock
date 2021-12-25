
// Chargement du tableau des paires 
// Il existe une manière plus optimiser de charger de tableau en parcourant le dossier dist/img du serveur et chargant 2 fois le nom de chaque image
let game = [
    "1", "1", 
    "2", "2", 
    "3", "3", 
    "4", "4", 
    "5", "5", 
    "6", "6", 
    "7", "7", 
    "8", "8", 
    "9", "9", 
    "10", "10", 
    "11", "11", 
    "12", "12", 
    "13", "13", 
    "13", "13", 
    "14", "14", 
    "15", "15", 
    "16", "16", 
    "17", "17", 
    "18", "18", 
];

// Le score représente le nombre de paire à trouver.
// L'objectif du joueur est de faire atteindre ce score à 0 avant la fin du temps imparti.
let score = game.length/2;

// Variable dans laquelle nous allons stocker la valeur de l'identifaint de l'élément cliqué (sans le préfix img)
let firstClick = null;

// Varible initialisant le temps donné au joueur pour terminer la partie (ici 5min soit 300 seconde )
let timeleft = 300;

/*
* Chargement d'éléments html 
*/
// Div affichée en cas de victoire
let win = document.getElementById("win");

// Div affichée en cas d'échec 
let lose = document.getElementById("lose");

// Div affichée pendant la partie
let content = document.getElementById("content");

/**
 * Fonction javascript permettant de mélanger les éléments dans un tableau
 * @param {*} array tableau en entré (le tableau de eju)
 * @returns le même tableau mais dont les éléments ont été mélangé aléatoirement
 */
const shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

// Au démarrage, on vient masquer les divs de victoire et d'échec 
win.style.display = "none"
lose.style.display = "none"

// On mélange les éléments dans le tableau de jeu 
shuffle(game);

/**
 * Fonction appelée au click sur le bouton "Enregistrer" sur l'affichage de la victoire
 * Cette fonction appel le service PHP permettant de sauvegardé le score du joueur 
 */
let save = () =>{
    axios.post('/services/insertNewScore.php', {
        username: document.querySelector("#username-input").value,
        timeleft: document.querySelector("#timeleft").innerHTML
    })
        .then(function (response) {
            let reload = "<p>Score enregistré</p><br><button onclick='location.reload();'>Relancer</button>"
            document.querySelector("#username-form").innerHTML = reload;
        })
        .catch(function (error) {
            console.log(error);
        });
}

/**
 * Fonction appelée chauqe seconde
 * 
 * Modification de l'horloge 
 * Si le timer arrive à 0 
 *  On sstope l'execution de cette routine, on affiche la div d'echec et on masque l'affichage de la div de jeu
 */
let timing = setInterval(() => {
    timeleft--;
    document.querySelector("#file").setAttribute("value", timeleft);
    document.querySelector("#timeleft").innerHTML = timeleft+" s";

    if(timeleft === 0){
        clearInterval(timing);
        content.style.display = "none";
        lose.style.display = "block";

    }
}, 1000);

// Récupération de tout les vignettes de la grille de jeu
let imgElements = document.getElementsByClassName("vignette");
for(let i = 0; i < imgElements.length; i++){
    
    //Pour chaque vignette on ajoute un comportement lors du click de l'utilisateur 
    imgElements[i].addEventListener("click", (e) => {

        // L'attribut id des vignettes à été designé comme suit : 
        // prefix "img" + un identifiant incrémental de 1 à 18
        // on va donc cherché ici à supprimer le préfix img afin de connaitre le numéro qui à été cliqué
        let imgId = e.target.id.substr(3, e.target.id.length-1);
        
        // On joue l'animation du flip
        document.getElementById(e.target.id).className = "backtofront vignette";
        setTimeout(() =>{
            e.target.setAttribute("src", "./dist/img/"+game[imgId-1]+".png");
        },500);

        // Si il s'agit de la première des deux images à cliquer ou si on clique deux fois sur la même image
        // On vient stocker l'identifiant numérique dans la variable firstClick 
        if(firstClick == null || firstClick == imgId){
            firstClick = imgId;
        }else{

            // Sinon c'est qu'on se trouve dans le cas ou un premier click a déjà eu lieu et qu'il s'agit d'un second click 
            // Dans ce cas on compare la valeur dans notre tableau de jeu aux indice sélectionné 
            if(game[firstClick-1] === game[imgId-1]){
                
                // Si ces valeurs sont identique on est en présence d'une paire on décrémente alors le score 
                // On en profite pour reset la valeur de firstClick à null
                // Jouer une animation de flip et on enlève les évenement de click sur les éléments déjà trouvé 
                score--;
                setTimeout(() => {

                    firstClick = null;

                    if(score === 0){
                        content.style.display = "none";
                        win.style.display = "block";
                        timeleft = 0;
                        clearInterval(timing);
                    }

                    document.getElementById("img"+imgId).removeEventListener("click");
                    document.getElementById("img"+firstClick).removeEventListener("click");

                    
                }, 1000);

            }else{
                // Si les images ne sont pas identique 
                // On  rejoue l'animation de flip
                // On reset firstClick

                setTimeout(() => {
                    document.getElementById("img"+imgId).className = "fronttoback vignette";
                    document.getElementById("img"+firstClick).className = "fronttoback vignette";

                    document.getElementById("img"+imgId).setAttribute("src", "./dist/img/fond.jpg");
                    document.getElementById("img"+firstClick).setAttribute("src", "./dist/img/fond.jpg");
                    firstClick = null;

                }, 1000);
                document.getElementById("img"+imgId).className = "vignette";
                document.getElementById("img"+firstClick).className = "vignette";


            }
        }

    });
}


/**
 * Fonction permettant d'appeler le service PHP récupérant les trois score les plus élevé 
 * Dans la conception de l'application on part du principe que le score est le temps restant à la fin d'une partie 
 * Plus le score est élevé plus le joueur est aller vite
 */
let bests = document.getElementsByClassName("best-records");
for(let i = 0; i < bests.length; i++){
    let elem = bests[i];
    axios.get("/services/getThreeBest.php").then((response) =>{
        let record = "<ol>";
        console.log(response.data);
        for(let i=0; i<response.data.length; i++){
            
            let score = response.data[i];
            record += "<li>"+score.score_username+" - "+score.score_timeleft+"</li>";

        }

        record += "</ol>"
        elem.innerHTML = record;
        console.log(elem)
    })
}

