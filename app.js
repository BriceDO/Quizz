const form = document.querySelector('.form-quizz');
let tableauResultats = [];
const reponses = ['c', 'a', 'b', 'a', 'c'];
const emojis = ['✔️','✨','👀','😭','👎'];
const titreResultat = document.querySelector('.resultats h2');
const noteResultat = document.querySelector('.note');
const aideResultat = document.querySelector('.aide');
const toutesLesQuestions = document.querySelectorAll('.question-block');

// On aura que des true et des falses à l'interieur du tableau, en fonction de la réponse
let verifTableau = [];

// Pour ne pas actualiser la page et récupérer les données en local
form.addEventListener('submit', (e) => {
    e.preventDefault();

    for(i = 1; i < 6; i++) {
        // Pour récupérer la réponse de toutes les questions (a, b ou c)
        tableauResultats.push(document.querySelector(`input[name="q${i}"]:checked`).value)
    }

    verifFunc(tableauResultats);
    tableauResultats = [];
})

function verifFunc(tabResultats) {

    for(let a = 0; a < 5; a++){
        // Si les réponses sont bonnes, on push true
        if(tabResultats[a] === reponses[a]){
            verifTableau.push(true);
        } else {
            // Sinon, on push false
            verifTableau.push(false);
        }
    }

    afficherResultats(verifTableau);
    couleursFonction(verifTableau)
    verifTableau = [];
}

function afficherResultats(tabCheck) {
    // On va filtrer le tableau pour qu'il contienne seulement les false et connaitre le nombre d'erreur
    const nbDeFautes = tabCheck.filter(el => el !== true).length;

    switch(nbDeFautes) {
        case 0:
            titreResultat.innerText = "✔️ Bravo, c'est un sans faute ! ✔️";
            aideResultat.innerText = "";
            noteResultat.innerText = "5/5";
        break;
        case 1:
            titreResultat.innerText = "✨ Vous y êtes presque ! ✨";
            aideResultat.innerText = 'Retentez une autre réponse dans la case rouge, puis re-validez !';
            noteResultat.innerText = "4/5";
        break;
        case 2:
            titreResultat.innerText = "✨ Encore un effort ... 👀";
            aideResultat.innerText = "Retentez une autre réponse dans les cases rouges, puis re-validez !";
            noteResultat.innerText = "3/5";
        break;
        case 3:
            titreResultat.innerText = "👀 Il reste quelques erreurs. 😭";
            aideResultat.innerText = "Retentez une autre réponse dans les cases rouges, puis re-validez !";
            noteResultat.innerText = "2/5";
        break;
        case 4:
            titreResultat.innerText = "😭 Peux mieux faire ! 😭";
            aideResultat.innerText = "Retentez une autre réponse dans les cases rouges, puis re-validez !";
            noteResultat.innerText = "1/5";
        break;
        case 5:
            titreResultat.innerText = "👎 Peux mieux faire ! 👎";
            aideResultat.innerText = "Retentez une autre réponse dans les cases rouges, puis re-validez !";
            noteResultat.innerText = "0/5";
        break;
        default: 'oops, cas innatendu.'
    }
}

function couleursFonction(tabValBool){
    // On va vérifier chaque élèment du tableau
    for(let j = 0; j < tabValBool.length; j++) {

        // Si bonne réponse, le bg du question-block devient vert
        if(tabValBool[j] === true) {
            toutesLesQuestions[j].style.background = 'lightgreen';
        } else {
            // Si faux, bg est rouge avec l'animation d'echec
            toutesLesQuestions[j].style.background = '#ffb8b8';
            toutesLesQuestions[j].classList.add('echec');

            // SetTimeout pour lui enlever la classe echec, si la personne veut retenter
            setTimeout(() => {
                toutesLesQuestions[j].classList.remove('echec');
            }, 500)
        }
    }

}

// Sur chaque element du tableau (donc chaque question-block), le bg va redevenir blanc au clique
toutesLesQuestions.forEach(item => {
    item.addEventListener('click', () => {
        item.style.background = "white";
    })
})