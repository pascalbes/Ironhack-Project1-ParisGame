/// GAME MANAGEMENT

//Définition des paramêtres principaux du jeu

var nbAudios = 1 //nombre d'audios proposés
var nbPics = 1 //nombre d'images proposées
var nbMaps = 4 //nombre de maps proposées

var maxScore=(nbAudios+nbPics+nbMaps)*7000;

var timer=0;



//Définition de la matrice du jeu

var indexGamePlan=0;

var gamePlan=[loadHomePage2, function() { gameIntro("Music")},loadMusicGame, function() { nextTitle('first') }];

for (let i=2;i<=nbAudios;i++) {
    gamePlan.push(nextTitle);
}

gamePlan.push(function() { gameIntro("Pics")})
gamePlan.push(loadPicGame);
gamePlan.push(function() { nextPic('first')});

for (let i=2;i<=nbPics;i++) {
    gamePlan.push(nextPic);
}

gamePlan.push(function() { gameIntro("Maps")});
gamePlan.push(loadMapGame);
gamePlan.push(function() { nextMap('first')});

for (let i=2;i<=nbMaps;i++) {
    gamePlan.push(nextMap);
}

gamePlan.push(loadResults);

//Pour test unitaire
// var gamePlan=[loadMapGame, nextMap]


//LANCEMENT DU JEU

nextPart("firstPart");   

function nextPart(type) {
    type!=="firstPart" ? indexGamePlan++ : 1 
    gamePlan[indexGamePlan]();
}




//Load Results

function loadResults() {

    containerElem.innerHTML = "";

    //chargement du html
    axios
    .get('./result.html')
    .then(response => {

        containerElem.innerHTML = response.data 

        // //Actualisation des titres

        scoreDiv.style.visibility="hidden"
        titlesDiv.style.visibility="hidden"
        gameInfoDiv.style.visibility="hidden"
        gameInfoDiv.style.position="fixed"

        //commentaires
        if (Number(scoreElem.textContent)/maxScore < 0.5) {
            document.getElementById("result-text").innerHTML="Seriously ?!"
            document.getElementById("result-container").querySelectorAll("p")[1].innerHTML="The only Paris you deserve is <span class=\"red\">Paris Hilton</span>";
        }
        else if (Number(scoreElem.textContent)/maxScore < 0.9) {
            document.getElementById("result-text").innerHTML="Good job"
            document.getElementById("result-container").querySelectorAll("p")[1].innerHTML="What about Paris Mayor ?";
        }
        else {
            document.getElementById("result-text").innerHTML="Impressive!"
            document.getElementById("result-container").querySelectorAll("p")[1].innerHTML="You've just been reported to Anne Hidalgo";
        }
        
        //score
        document.getElementById("total-score").innerHTML="total score: " + Number(scoreElem.textContent);

        var resultTable=document.getElementById("table-result").querySelector("tbody");


        function addLine3(titreItem, nbItem, scoreItem) {
            
            var tr = document.createElement("tr")
            resultTable.appendChild(tr)

            var td1=document.createElement("td")
            td1.innerHTML=titreItem
            tr.appendChild(td1)

            var td2=document.createElement("td")
            td2.innerHTML=nbItem
            tr.appendChild(td2)

            var td3=document.createElement("td")
            td3.innerHTML=scoreItem + " pts"
            tr.appendChild(td3)
        }

        scoresArr.forEach((v,i) => {
            addLine3(titlesArr[i], nbScoresArr[i],scoresArr[i])
        });

    });

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
    var score = 0;
    var bonus = 0;
    var malus = 0;
    var elapsed = 0;
    var penalties=0;

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

    //lancement chrono / après la photo
    var intervalID = setInterval(() => {
        timer++
        gameInfo1.innerHTML=countdownTimer(timer,2000);
        if (timer>2000) {
            clearInterval(intervalID);
            intervalID=0;
            elapsed=updateScore("map", -1, timer)[3];
            recap("map", 1000000, 0, [0, 0, 0, elapsed, 0], locations[indexMap].name)
        }
    }, 10);

    //actu des infos
    titlesDiv.querySelector("h1").innerText= "Location "+ locPushed.length + "/" + nbMaps.toString();
    gameInfo2.innerHTML="find the location of the picture";
    gameInfo2.classList.remove("heartbeat");
    setTimeout(gameInfo2.classList.add("heartbeat"),200);

    mapElement.onclick = function(event) {

        var xPos=(event.x-event.srcElement.offsetLeft+window.scrollX)/event.srcElement.width;
        var yPos=(event.y-event.srcElement.offsetTop+window.scrollY)/event.srcElement.height;

        //pour constitution BdD
        //console.log(xPos, yPos)

        var distance = Math.floor(locations[indexMap].isTheGoodOne(xPos,yPos));
        var finalTime=timer,

        arr=updateScore("map",distance,finalTime)
        clearInterval(intervalID);
        intervalID=0;

        recap("map", distance, finalTime, [arr[0], arr[1], arr[2], 0, 0], locations[indexMap].name)

    }

}

//Next Pic

function nextPic(type) {

    timer=0;

    var score = 0;
    var bonus = 0;
    var malus = 0;
    var elapsed = 0;
    var penalties=0;

    //chargement des photos

    var intervalID = setInterval(() => {
        timer++
        gameInfo1.innerHTML=countdownTimer(timer,2000);
        if (timer>2000) {
            //définir une animation NOK
            clearInterval(intervalID);
            elapsed=updateScore("pics", -1, timer)[3];
            recap("pics", -1, 0, [0, 0, 0, elapsed, 0], "")
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
            var picClicked = Number(event.target.getAttribute("id")[3])-1; 
            checkResult(picClicked);
        }
    }

    function checkResult(indexClicked) {
        if (pictures[indexPics].isTheGoodOne(indexClicked)) {//pic ok

            var finalTime= timer

            var arr=updateScore("pics", 1, timer)
            score=arr[0];
            bonus=arr[1];

            if (picsShown.length < nbPics ) {//pic ok + next pic
                clearInterval(intervalID);
                intervalID=0;
                recap("pics", 1, finalTime, [score, bonus, malus, elapsed,0], pictures[indexPics].solutions[indexClicked])
            }
            else { //pic ok + next game
                clearInterval(intervalID);
                intervalID=0;
                recap("pics", 1, finalTime, [score, bonus, malus, elapsed,0], pictures[indexPics].solutions[indexClicked])
            }
        }
        else { //wrong selection
            malus=updateScore("pics", 0, timer)[2]
            clearInterval(intervalID);
            intervalID=0;
            recap("pics", 0, 0, [0, 0, malus, 0, penalties], pictures[indexPics].solutions[indexClicked])
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
    var score = 0;
    var bonus = 0;
    var malus = 0;
    var elapsed = 0;
    var penalties=0;

    var intervalID = setInterval(() => {
        timer++
        gameInfo1.innerHTML=countdownTimer(timer,2000);
        if (timer>2000) {
            inputAudio.classList.add("shake-horizontal")
            clearInterval(intervalID);
            elapsed = updateScore("music", -1, timer)[3]
            recap("music", -1, 0, [0, 0, malus, elapsed, penalties], audios[indexAudios].name)
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
    titlesDiv.querySelector("h1").innerText="Audio "+ audioPlayed.length + "/" + nbAudios.toString();
    gameInfo2.innerHTML=audios[indexAudios].toDo;
    gameInfo2.classList.remove("pulsate-bck");
    gameInfo2.classList.add("pulsate-bck");

    //gestion de l'input
    var inputAudio=document.getElementById("music-input");
    inputAudio.setAttribute("editable", true)

    inputAudio.oninput = function() {
        inputAudio.style.width=((inputAudio.value.length + 1) * 70) + 'px';
        inputAudio.classList.remove("shake-horizontal")
        inputAudio.classList.remove("heartbeat")
    }

    inputAudio.focus();

    //gestion des entrées
    inputAudio.onchange = function() {

        if (audios[indexAudios].isTheGoodOne(inputAudio.value)) {//entrée ok !

            var finalTime= timer;

            var arr=updateScore("music", 1, timer)
            score=arr[0];
            bonus=arr[1];

            if (audioPlayed.length < nbAudios) {

                inputAudio.classList.add("heartbeat")
                inputAudio.value="";
                inputAudio.style.width=((inputAudio.value.length + 1) * 70) + 'px';

                clearInterval(intervalID);
                intervalID=0;

                recap("music", 1, finalTime, [score, bonus, malus, malus, penalties], audios[indexAudios].name)

            }

            else { //Next audio
                clearInterval(intervalID);
                intervalID=0;
                recap("music", 1, finalTime, [score, bonus, malus, 0, penalties], audios[indexAudios].name)
            }
        }
        else {//entrée nok !

            //volonté de skipper ?
            if (inputAudio.value === "pass") {
                clearInterval(intervalID);
                intervalID=0;
                inputAudio.value="";
                malus = updateScore("music", -0.5, timer)[2]
                recap("music", 0, finalTime, [0, 0, malus, elapsed, penalties], audios[indexAudios].name)
            }
            else { //mauvaise entrée
                //enlever des points
                penalties += updateScore("music", 0, timer)[4]
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

        nextPart();

        // var startButton=document.getElementById("start-button");

        // startButton.onclick = function() {
        //     nextPart();
        // }

    });
        
}



// GAME INTROS
function gameIntro(type) {

    //chargement du html
    axios
      .get('./gameIntro' + type + ".html")
      .then(response => {
          
        containerElem.innerHTML = response.data 

        var wrapperElem=document.getElementsByClassName("wrapper-intro")

        /*

        if (type==="music"){
            wrapperElem[0].style.background="url(\"./Ressources/Home Page/Hot_8_Brass_Band_2016_11_08_10.jpg\") no-repeat left / 120%"
        }
        else if (type==="pics"){
            wrapperElem[0].style.background="url(\"./Ressources/2- Pics/fe70396f2ae791efa832bbd83b643a44.jpg\") no-repeat left / 120%"
        }
        else if (type==="map"){
            wrapperElem[0].style.background="url(\"./Ressources/Plan Paris/shutterstock_511329829 - cut.jpg\") no-repeat left / 120%"
        }
        
        wrapperElem[1].style.background="url(\"./Ressources/Home\ Page/i4.JPG\") no-repeat left / 120%"

        */

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
        
        window.addEventListener("keydown", function(event) {
            // Number 13 is the "Enter" key on the keyboard
            if (event.keyCode === 13 && document.getElementById("intro-button")!==null) {
              // Cancel the default action, if needed
              event.preventDefault();
              
              // Trigger the button element with a click
              btnIntro.click();
            }
        });

        btnIntro.onclick = function() {
            containerElem.innerHTML = "";
            nextPart();
        }

    }); 

}


// // HOME PAGE
// function loadHomePage() {

//     //chargement du html
//     axios
//       .get('./home.html')
//       .then(response => {
          
//         containerElem.innerHTML = response.data 

//           //Texte d'introduction
//         var txts = ["I heard you wanted to leave.","Before you do","Show me you loved me"]
//         var ids=["intro1","intro2","intro3"]

//         var i = 0;
//         var speed = 100; 

//         typeWriter(txts[0],ids[0])
//         setTimeout(typeWriter,txts[0].length*speed+1000,txts[1],ids[1])
//         setTimeout(typeWriter,txts[0].length*speed+txts[1].length*speed+1500,txts[2],ids[2])

//         function typeWriter(txt,id) {

//             if (i < txt.length) {
//                 document.getElementById(id).innerHTML += txt.charAt(i);
//                 i++;
//                 setTimeout(typeWriter, speed, txt,id);
//             }
//             else {
//                 i=0;
//             }

//         }

//         //Bouton page d'intro. Au clic, jeu1 : suppression du contenu du html et ajout du contenu de la page suivante
//         var btnIntro=document.getElementById("intro-button") ;
        
//         btnIntro.onclick = function() {
//             console.log("lol")
//             containerElem.innerHTML = "";
//             nextPart();
//         }

//     }); 

// }