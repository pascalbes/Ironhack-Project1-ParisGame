/// GAME MANAGEMENT

//Définition de la matrice du jeu
var indexGamePlan=0;
var timer=0;

var nbAudios = 3 //nombre d'audios proposés
var nbPics = 3 //nombre d'images proposées
var nbMaps = 2 //nombre de maps proposées


var gamePlan=[function() { gameIntro("Maps")},loadMapGame,function() { nextMap('first')},function() { nextMap()},function() { nextMap()}]

// var gamePlan=[loadHomePage2, function() { gameIntro("Music")},loadMusicGame, function() { nextTitle('first') }];

// for (let i=2;i<=nbAudios;i++) {
//     gamePlan.push(nextTitle);
// }

// gamePlan.push(function() { gameIntro("Pics")})
// gamePlan.push(loadPicGame);
// gamePlan.push(function() { nextPic('first')});

// for (let i=2;i<=nbPics;i++) {
//     gamePlan.push(nextPic);
// }

// gamePlan.push(function() { gameIntro("Maps")});
// gamePlan.push(loadMapGame);
// //gamePlan.push(function() { nextMap('first')});

// for (let i=2;i<=nbMaps;i++) {
//     gamePlan.push(nextMap);
// }


console.log(gamePlan);


//LANCEMENT DU JEU

nextPart("firstPart");   

function nextPart(type) {
    type!=="firstPart" ? indexGamePlan++ : 1 
    console.log("nextPart")
    console.log(indexGamePlan)
    console.log(gamePlan[indexGamePlan])
    gamePlan[indexGamePlan]();
}



//Load Map Game

function loadMapGame() {

    //chargement du html
    axios
    .get('./map.html')
    .then(response => {

        containerElem.innerHTML = response.data 

        //body : scroll possible
        document.body.style.height="fit-content"

        //Actualisation des titres
        titlesDiv.querySelector("h1").innerText= "Map Game"

        scoreDiv.style.visibility="visible"
        titlesDiv.style.visibility="visible"
        gameInfoDiv.style.top="2vh";
        gameInfoDiv.style.visibility="visible"
        gameInfoDiv.style.position="fixed"

        nextPart();

    });

}

// NEXT MAP

function nextMap(type) {
    
    mapElement=document.getElementById("image-div");

    timer=0;


    if (type==="first") { // premier titre lancé
        //suppression bouton start

        gameInfoDiv.style.top="2vh";
        gameInfoDiv.style.visibility="visible";
        gameInfo2.classList.remove("pulsate-bck");

        //création de l'index audio, valeur random
        indexMap = randomEasy(0, locations.length-1)
        locPushed.push(indexMap)
    }
    else {
        indexMap=randomNew(0,locations.length-1,locPushed);
        locPushed.push(indexMap)
    }

    //affichage photo
    locations[indexMap].loadPic();

    debugger

    //lancement chrono / après la photo
    var intervalID = setInterval(() => {
        timer++
        gameInfo1.innerHTML=countdownTimer(timer,3000);
        if (timer>3000) {
            clearInterval(intervalID);
            updateScore("map", -1, timer)
            nextPart();
        }
    }, 10);

    //actu des infos
    titlesDiv.querySelector("h1").innerText= "Location "+ locPushed.length + "/" + nbPics.toString();
    gameInfo2.innerHTML="find the location of the picture";
    gameInfo2.classList.remove("heartbeat");
    setTimeout(gameInfo2.classList.add("heartbeat"),200);

    mapElement.onclick = function(event) {

        var xPos=(event.x-event.srcElement.offsetLeft+window.scrollX)/event.srcElement.width;
        var yPos=(event.y-event.srcElement.offsetTop+window.scrollY)/event.srcElement.height;
        alert(locations[indexMap].isTheGoodOne(xPos,yPos));

        nextPart();
    }

}

//Next Pic

function nextPic(type) {

    timer=0;

    //chargement des photos

    var intervalID = setInterval(() => {
        timer++
        gameInfo1.innerHTML=countdownTimer(timer,1500);
        if (timer>1500) {
            //définir une animation NOK
            clearInterval(intervalID);
            updateScore("pics", -1, timer);
            nextPart();
        }
    }, 10);

    if (type==="first") { // première série photo lancée

        gameInfoDiv.style.visibility="visible";
        gameInfoDiv.style.top="2vh";
        gameInfo2.classList.remove("pulsate-bck");

        //création de l'index picture, valeur random
        indexPics = randomEasy(0, pictures.length-1)
        picsShown.push(indexPics)
    }
    else {
        indexPics=randomNew(0,pictures.length-1,picsShown);
        picsShown.push(indexPics)
    }

    //chargement photos
    pictures[indexPics].loadPics();


    //actu des infos
    titlesDiv.querySelector("h1").innerText= "Picture "+ picsShown.length + "/" + nbPics.toString();
    gameInfo2.innerHTML=pictures[indexPics].toDo;
    gameInfo2.classList.remove("heartbeat");
    setTimeout(gameInfo2.classList.add("heartbeat"),200);
    


    //définition du onclick des images
    var picsElem = document.getElementsByClassName("pics-element")

    for (let i=0; i<picsElem.length;i++) {
        picsElem[i].onclick = function(event) {
        checkResult(Number(event.target.getAttribute("id")[3]))
        }
    }

    function checkResult(indexClicked) {
        if (pictures[indexPics].isTheGoodOne(indexClicked)) {

            updateScore("pics", 1, timer)

            if (picsShown.length < nbPics ) {
                clearInterval(intervalID);
                intervalID=0;
                nextPart(); 
            }
            else {
                nextPart();
            }
        }
        else { //wrong selection
            updateScore("pics", 0, timer)
            nextPart();
        }
    }
}

//Load Pics Game

function loadPicGame() {

    //chargement du html
    axios
    .get('./pics.html')
    .then(response => {

        containerElem.innerHTML = response.data 

        //Actualisation des titres
        

        scoreDiv.style.visibility="visible"
        titlesDiv.style.visibility="visible"
        gameInfoDiv.style.visibility="visible"

        nextPart("first");

    });

}

//MUSIC GAME
function nextTitle(type) {

    timer=0;

    var intervalID = setInterval(() => {
        timer++
        gameInfo1.innerHTML=countdownTimer(timer,1500);
        if (timer>1500) {
            inputAudio.classList.add("shake-horizontal")
            clearInterval(intervalID);
            updateScore("music", -1, timer)
            nextPart();
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
    console.log(indexAudios);
    console.log(audios[indexAudios]);
    audios[indexAudios].startMusic();

    //actu des infos
    titlesDiv.querySelector("h1").innerText="Audio "+ audioPlayed.length + "/" + nbAudios.toString();
    gameInfo2.innerHTML=audios[indexAudios].name;
    gameInfo2.classList.remove("pulsate-bck");
    gameInfo2.classList.add("pulsate-bck");

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

            if (audioPlayed.length < nbAudios) {

                inputAudio.classList.add("heartbeat")
                inputAudio.value="";
                inputAudio.style.width=((inputAudio.value.length + 1) * 70) + 'px';

                clearInterval(intervalID);
                intervalID=0;
                nextPart();

            }

            else {
                clearInterval(intervalID);
                intervalID=0;
                nextPart();
            }
        }
        else {//entrée nok !

            //volonté de skipper ?
            if (inputAudio.value === "pass") {
                clearInterval(intervalID);
                intervalID=0;
                inputAudio.value="";
                updateScore("music", -1, timer)
                nextPart();
            }
            else { //mauvaise entrée
                //enlever des points
                updateScore("music", 0, timer)
                inputAudio.classList.add("shake-horizontal")
                //setTimeout(inputAudio.classList.remove("shake-horizontal"),1500)
            }
        }
    }
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
        //titlesDiv.querySelector("h1").innerText= "Do you know my voice ?"
        //titlesDiv.querySelector("h4").innerText= "Enter the song or artist name or even the movie it is from"

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



// GAME INTROS
function gameIntro(type) {

    //chargement du html
    axios
      .get('./gameIntro' + type + ".html")
      .then(response => {
          
        containerElem.innerHTML = response.data 

        

        //Bouton page d'intro. Au clic, jeu1 : suppression du contenu du html et ajout du contenu de la page suivante
        var btnIntro=document.getElementById("intro-button") ;
        
        btnIntro.onclick = function() {
            containerElem.innerHTML = "";
            nextPart();
        }

        scoreDiv.style.visibility="hidden"
        titlesDiv.style.visibility="hidden"
        gameInfoDiv.style.visibility="hidden"

    }); 

}

// HOME PAGE 2
function loadHomePage2() {

    //chargement du html
    axios
      .get('./home2.html')
      .then(response => {
          
        containerElem.innerHTML = response.data 


        //Bouton page d'intro. Au clic, jeu1 : suppression du contenu du html et ajout du contenu de la page suivante
        var btnIntro=document.getElementById("intro-button") ;
        
        btnIntro.onclick = function() {
            containerElem.innerHTML = "";
            nextPart();
        }

    }); 

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