/// GAME MANAGEMENT

//Définition de la matrice du jeu
var indexGamePlan=0;
var timer=0;

var nbAudios = 8 //nombre d'audios proposés
var nbPics = 3 //nombre d'audios proposés


//var gamePlan=[loadPicGame, function() { nextPic('first')}, nextPic, nextPic]

var gamePlan=[loadHomePage, loadMusicGame, function() { nextTitle('first') }];

for (let i=2;i<=nbAudios;i++) {
    gamePlan.push("nextTitle");
}

//LANCEMENT DU JEU

nextPart("firstPart");   

function nextPart(type) {
    type!=="firstPart" ? indexGamePlan++ : 1 
    gamePlan[indexGamePlan]();
}


//Next Pic

function nextPic(type) {

    console.log(type)

    timer=0;

    //chargement des photos

    var intervalID = setInterval(() => {
        timer++
        gameInfo3.innerHTML=countdownTimer(timer,1000);
        if (timer>1000) {
            //définir une animation NOK
            clearInterval(intervalID);
            updateScore("pics", -1, timer);
            nextPic();
        }
    }, 10);

    if (type==="first") { // première série photo lancée

        gameInfoDiv.style.visibility="visible";

        //création de l'index picture, valeur random
        indexPics = randomEasy(0, pictures.length-1)
        picsShown.push(indexPics)

        console.log(indexPics)
    }
    else {
        indexPics=randomNew(0,pictures.length-1,picsShown);
        picsShown.push(indexPics)
    }

    console.log(pictures[indexPics])

    //chargement photos
    pictures[indexPics].loadPics();


    //actu des infos
    gameInfo1.innerHTML=pictures[indexPics].toDo;
    gameInfo2.innerHTML="Picture "+ picsShown.length + "/" + nbPics.toString();


}


//Load Pics Game

function loadPicGame() {

    //chargement du html
    axios
    .get('./pics.html')
    .then(response => {

        containerElem.innerHTML = response.data 

        //Actualisation des titres
        titlesDiv.querySelector("h1").innerText= "Do you know my singularity"
        titlesDiv.querySelector("h4").innerText= "blablabla"

        nextPic("first");

    });

}


//LOAD MUSIC GAME
function loadMusicGame() {

    //chargement du html
    axios
    .get('./music.html')
    .then(response => {
       

        containerElem.innerHTML = response.data 

        //Affichage mode game
        scoreDiv.style.visibility="visible";
        titlesDiv.style.visibility="visible";

        //Actualisation des titres
        titlesDiv.querySelector("h1").innerText= "Do you know my voice ?"
        titlesDiv.querySelector("h4").innerText= "Enter the song or artist name or even the movie it is from"

        //Carroussel photo

        // Données photos

        var imageElement=document.getElementById("music-image");
        var indexImage = 0;

        function imageCarroussel() {
            imageElement.src=pics[indexImage];
            (indexImage === pics.length -1) ? indexImage=0 : indexImage++;
            setTimeout(imageCarroussel,5000)
        }
        imageCarroussel()


        var startButton=document.getElementById("start-button");

        startButton.onclick = function() {
            nextPart();
        }

    });
        
}

//MUSIC GAME
function nextTitle(type) {

    timer=0;

    var intervalID = setInterval(() => {
        timer++
        gameInfo3.innerHTML=countdownTimer(timer,1000);
        if (timer>1000) {
            inputAudio.classList.add("shake-horizontal")
            clearInterval(intervalID);
            updateScore("music", -1, timer)
            nextTitle();
        }
    }, 10);

    if (type==="first") { // premier titre lancé
        //suppression bouton start
        var startButton=document.getElementById("start-button");
        startButton.remove();

        gameInfoDiv.style.visibility="visible";

        //création de l'index audio, valeur random
        indexAudios = randomEasy(0, audios.length-1)
        audioPlayed.push(indexAudios)
    }
    else {
        indexAudios=randomNew(0,audios.length-1,audioPlayed);
        audioPlayed.push(indexAudios)
    }
    
    //lancement music
    audios[indexAudios].startMusic();

    //actu des infos
    gameInfo1.innerHTML=audios[indexAudios].name;
    gameInfo2.innerHTML="Audio "+ audioPlayed.length + "/" + nbAudios.toString();

    //gestion de l'input
    var inputAudio=document.getElementById("music-input");

    inputAudio.oninput = function() {
        inputAudio.style.width=((inputAudio.value.length + 1) * 70) + 'px';
        inputAudio.classList.remove("shake-horizontal")
        inputAudio.classList.remove("heartbeat")
    }

    inputAudio.focus();

    //gestion des entrées
    inputAudio.onchange = function() {

        if (audios[indexAudios].isTheGoodOne(inputAudio.value)) {//entrée ok !

            updateScore("music", 1, timer)

            if (audioPlayed.length < nbAudios - 1) {

                inputAudio.classList.add("heartbeat")
                inputAudio.value="";
                inputAudio.style.width=((inputAudio.value.length + 1) * 70) + 'px';

                clearInterval(intervalID);
                intervalID=0;
                nextTitle();

            }

            else {
                alert("jeu fini") ///mettre ici le passage au jeu suivant
            }
        }

        else {//entrée nok !
        //enlever des points
        "entrée nok"
            updateScore("music", 0, timer)
            inputAudio.classList.add("shake-horizontal")
            //setTimeout(inputAudio.classList.remove("shake-horizontal"),1500)
            
        }
    }
}

// HOME PAGE
function loadHomePage() {

    //chargement du html
    axios
      .get('./home.html')
      .then(response => {
          
        containerElem.innerHTML = response.data 

          //Texte d'introduction
        var txts = ["I heard you wanted to leave.","Before you do","Show me you loved me"]
        var ids=["intro1","intro2","intro3"]

        var i = 0;
        var speed = 100; 

        typeWriter(txts[0],ids[0])
        setTimeout(typeWriter,txts[0].length*speed+1000,txts[1],ids[1])
        setTimeout(typeWriter,txts[0].length*speed+txts[1].length*speed+1500,txts[2],ids[2])

        function typeWriter(txt,id) {

            if (i < txt.length) {
                document.getElementById(id).innerHTML += txt.charAt(i);
                i++;
                setTimeout(typeWriter, speed, txt,id);
            }
            else {
                i=0;
            }

        }

        //Bouton page d'intro. Au clic, jeu1 : suppression du contenu du html et ajout du contenu de la page suivante
        var btnIntro=document.getElementById("intro-button") ;
        
        btnIntro.onclick = function() {
            containerElem.innerHTML = "";
            nextPart();
        }

    }); 

}


