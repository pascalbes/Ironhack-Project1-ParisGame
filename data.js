
// DATA INITIALIZATION
const scoreDiv=document.getElementById("score-div")
const scoreElem=document.getElementById("score")
scoreDiv.style.visibility="hidden"

const titlesDiv=document.getElementById("titles")
titlesDiv.style.visibility="hidden"

const gameInfoDiv=document.getElementById("gameInfo-div")
const gameInfo1=document.getElementById("gameInfo1")
const gameInfo2=document.getElementById("gameInfo2")
const gameInfo3=document.getElementById("gameInfo3")
gameInfoDiv.style.visibility="hidden"

const containerElem = document.getElementById("container")

///DATA MAP GAME

class Location {
    constructor(filename, name, x, y, toDo) {
        this.file=filename;
        this.name=name;
        this.x=x;
        this.y=y;
        this.toDo=toDo;
    }

    loadPic() {

        var picDiv=document.querySelector("#pic-element");
        picDiv.style.visibility="visible";


        var picMap=document.querySelector("#pic-map")
        picMap.src=this.file

        setTimeout(function() {
            picDiv.style.visibility="hidden";
        },5000)

    }

    isTheGoodOne(x,y) {
        var distPercent= Math.sqrt((this.x-x)*(this.x-x)+(this.y-y)*(this.y-y));
        var distMeters = distPercent*3310/0.243;
        return distMeters;
    }

}


const loc1= new Location("./Ressources/Plan Paris/tobefound/pyramides.jpg", "Pyramide du Louvre", 0.462, 0.492, "")
const loc2= new Location("./Ressources/Plan Paris/tobefound/mouff2.jpg", "Rue Mouffetard", 0.528, 0.744, "")

const loc3= new Location("./Ressources/Plan Paris/tobefound/philha.jpg", "Philharmonie de Paris", 0.733, 0.135, "")

var locations=[loc1, loc2, loc3];

var indexMap = 0;
var locPushed=[];


///DATA PICTURES

class Picture {
    constructor(filenames,expected, toDo, solutions) {
        this.files=filenames;
        this.expected=expected;
        this.toDo=toDo;
        this.solutions=solutions
    }

    loadPics() {

        var picsElements=document.getElementsByClassName("pics-element")

        for(let i=0;i<4;i++) {
            picsElements[i].src=this.files[i]
        }
    }

    isTheGoodOne(index) {
        return this.expected === index+1 ? true : false 
    }

}

const pic1 = new Picture(["./Ressources/2- Pics/i11.jpg", "./Ressources/2- Pics/i12.jpg", "./Ressources/2- Pics/i13.jpg", "./Ressources/2- Pics/i14.jpg"],3,"find the parisian park", ["Hyde Park", "Central Park", "Bois de Vincennes", "Villa Borghese"])

const pic2 = new Picture(["./Ressources/2- Pics/i21.jpg", "./Ressources/2- Pics/i22.jpg", "./Ressources/2- Pics/i23.jpg", "./Ressources/2- Pics/i24.jpg"],2,"find the parisian stadium", ["Stade Vélodrome / Marseille", "Parc des Princes / Paris", "Stade de France / Saint-Denis", "Maracana / Rio de Janeiro"])

const pic3 = new Picture(["./Ressources/2- Pics/i31.jpg", "./Ressources/2- Pics/i32.jpg", "./Ressources/2- Pics/i33.jpg", "./Ressources/2- Pics/i34.jpg"],1,"find Mondrian Place de la Concorde", ["Place de la Concorde", "New York City", "Trafalgar Square", "Composition II en rouge, bleu et jaune"])

const pic4 = new Picture(["./Ressources/2- Pics/i41.jpg", "./Ressources/2- Pics/i42.jpg", "./Ressources/2- Pics/i43.jpg", "./Ressources/2- Pics/i44-roma.jpg"],1,"find the parisian one", ["Seine", "Tames", "Saône & Rhône", "Tiber"])

const pic5 = new Picture(["./Ressources/2- Pics/i51-chirac1997.jpg", "./Ressources/2- Pics/i52-1974.jpg", "./Ressources/2- Pics/i53-chirac2002.jpg", "./Ressources/2- Pics/i54-1978.jpg"],4,"find a Paris mayor", ["Chirac in 1997", "Chirac in 1974", "Chirac in 2002", "Chirac in 1978, Maire de Paris"])



var pictures=[pic1,pic2,pic3,pic4,pic5]



class Audio {
    constructor(filename, expected, toDo, name) {
      this.file=filename;
      this.expected=expected;
      this.toDo = toDo;
      this.name=name;
    }

    startMusic() {
        let audioElem=document.getElementById("audio");
        audioElem.src=this.file;
    }

    isTheGoodOne(txt) {
        return this.expected.includes(txt.toLowerCase()) ? true : false 
    }

    stopMusic() {
        let audioElem=document.getElementById("audio");
        console.log("yes")
        audioElem.pause();
    }
}

var picsShown=[];
var indexPics = 0;


// Initialisation de l'array audios pour tests
const audio1 = new Audio("./Ressources/Music/Cut/paris-a-le-blues.mp3",["mad in paris", "paris a le blues"],"find the group or the song", "Mad in Paris - Paris a le blues");
const audio2 = new Audio("./Ressources/Music/Cut/paris-mai.mp3",["claude nougaro", "nougaro", "paris mai"],"find the artist or the song", "Claude Nougaro - Paris Mai");
const audio3 = new Audio("./Ressources/Music/Cut/paris-sud.mp3",["1995","Paris sud minute"],"find the group or the song", "1995 - Paris Sud Minute");
const audio4 = new Audio("./Ressources/Music/Cut/billie-april.mp3", ["billie holiday", "april in paris"],"find the artist or the song", "Billie Holiday - April in Paris")
const audio5 = new Audio("./Ressources/Music/Cut/ella-i-love.mp3", ["ella fitzgerald", "i love paris"], "find the artist or the song", "Ella Fitzgerald - I love Paris")
const audio6 = new Audio("./Ressources/Music/Cut/jayzkanye-niggaz.mp3", ["jay z", "kanye west", "niggaz in paris", "jayz", "jay-z"], "find one artist or the song", "Jay-z & Kanye West - Niggaz in Paris")
const audio7 = new Audio("./Ressources/Music/Cut/midnight.mp3", ["midnight in paris", "woody allen", "sidney bechet", "si tu vois ma mere", "si tu vois ma mère"], "find the artist, the song or the movie", "Sidney Bechet - Si tu vois ma mère (Midnight in Paris soundtrack)")
const audio8 = new Audio("./Ressources/Music/Cut/ntm-parissouslesbombes.mp3", ["ntm", "paris sous les bombes"], "find the group or the song", "NTM - Paris sous les bombes")
const audio9 = new Audio("./Ressources/Music/Cut/paris-seveille.mp3", ["dutronc", "jacques dutronc", "paris s'eveille", "paris s'éveille"], "find the artist or the song", "Jacques Dutronc - Paris sous les bombes")
const audio10 = new Audio("./Ressources/Music/Cut/oh-ville-lumiere.mp3", ["parc des princes"], "what place are we ?", "Parc des Princes - Oh ville lumière")
const audio11 = new Audio("./Ressources/Music/Cut/paris-austerlitz.mp3", ["gare d'austerlitz", "austerlitz"], "in which train station are we ?", "Gare d'Austerlitz")
const audio12 = new Audio("./Ressources/Music/Cut/antoine-kombouare.mp3", ["madrid", "real", "real madrid"], "who is PSG opponent ?", "Real Madrid - 1993")
const audio13 = new Audio("./Ressources/Music/Cut/bill-evans-april-in-paris.mp3",["bill evans", "april in paris"], "find the pianist or the song", "Bill Evans - April in Paris");
const audio14 = new Audio("./Ressources/Music/Cut/ligne-4.mp3", ["barbes", "barbès", "barbes rochechouart", "barbès rochechouart", "barbès-rochechouart", "barbes-rochechouart"], "what is next metro station ?", "Barbes Rochechouart")
const audio15 = new Audio("./Ressources/Music/Cut/midnight.mp3",["Midnight in Paris"], "what movie the scene is from ?", "Midnight in Paris - Ending Scene")
const audio16 = new Audio("./Ressources/Music/Cut/roy-hargrove-quintet-strasbourg-st-denis.mp3", ["roy hargrove", "strasbourg st denis", "strasbourg-st-denis", "strasbourg st-denis"], "find the artist or the song");
const audio17 = new Audio("./Ressources/Music/Cut/st-germain-lauxerrois.mp3", ["louvre", "place du louvre"], "we are on a place. which one ?", "Place du Louvre")
const audio18 = new Audio("./Ressources/Music/Cut/warning-siren.mp3", ["12h", "midi", "12"], "what time is it ?", "12h");



var audios=[audio1,audio2,audio3,audio4,audio5,audio6,audio7,audio8,audio9, audio10,audio11,audio12,audio13,audio14,audio15,audio16,audio17,audio18];

var audioPlayed=[];
var indexAudios = 0;

//Tableau de photos pour la gallerie du Music Game
const pics=[];
for (i=1;i<=13;i++) {
    pics.push("./Ressources/Music/Pics/i" + i + ".jpg")
}




// FONCTIONS UTILES

//renvoi un entier random compris entre min et max
function randomEasy(min,max) {
    return min + Math.round(Math.random()*(max-min))
}

//renvoi un entier random compris entre min et max et non inclus dans le tableau arr
function randomNew(min,max, arr) {
    let elem = randomEasy(min, max)
    while (arr.includes(elem)) {
        elem = randomEasy(min, max)
    }
    return elem
}


//retourne le timer en format 00:00
function countdownTimer(t,duration) {
    t=duration-t;
    if (t<=0) {return "0"}
    var tSt=t.toString();
    if (tSt.length ==3) {
        tSt="0"+tSt;
    }
    else if (tSt.length ==2) {
        tSt="00"+tSt;
    }
    else if (tSt.length ==1) {
        tSt="000"+tSt;
    }

    return tSt[0] +tSt[1]+":" + tSt[2] +tSt[3]
}

//FONCTION SCORE calcul et actualise le score et retourne le score, le bonus et le malus
function updateScore(type,result,t) {

    var score1=Number(scoreElem.textContent);
    var score=0;
    var bonus=0;
    var malus=0;

    if (type==="music" && result===1) { //cas ok
        bonus = Math.floor(500 + t/3);
        score = 1000;
    }
    else if (type==="music" && result===0) { //cas entrée nok
        malus = 200;
    }
    else if (type==="music" && result===-1) {// cas time elapsed
        malus = 200;
    }

    if (type==="pics" && result===1) { //cas ok
        bonus = Math.floor(500 + t/3);
        score = 1000;
    }
    else if (type==="pics" && result===0) { //cas entrée nok
        malus = 200;
    }
    else if (type==="pics" && result===-1) {// cas time elapsed
        malus = 200;
    }

    score1 = score1 + score + bonus - malus; 

    scoreElem.textContent=Math.floor(score1.toString());

    return [score, bonus, malus]
}


function recap(typeGame, typeResult, time, [score, bonus, malus], elemClicked) {

    var recapDiv=document.querySelector("#recap");
    recapDiv.style.visibility="visible";

    var btnNext=document.querySelector("#next");

    window.addEventListener("keydown", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          // Cancel the default action, if needed
          event.preventDefault();
          console.log("kikou")
          // Trigger the button element with a click
          document.querySelector("#next").click();
        }
      });

    if (typeGame==="music") {
        audios[0].stopMusic();
    }


    btnNext.onclick = function() {
        recapDiv.style.visibility="hidden";
        nextPart();
    }

    if (typeResult===1) {
        recapDiv.getElementsByTagName("span")[0].innerHTML="v"
        recapDiv.getElementsByTagName("span")[2].innerHTML="Victory !"
    }
    else if (typeResult===0) {
        recapDiv.getElementsByTagName("span")[0].innerHTML="x";

        if (typeResult==="music") {
            recapDiv.getElementsByTagName("span")[2].innerHTML="Audio passed"
        }
        else if (typeResult==="pics") {
            recapDiv.getElementsByTagName("span")[2].innerHTML="Wrong selection"
        }
        
    }
    else if (typeResult===-1) {
        recapDiv.getElementsByTagName("span")[0].innerHTML="x";
        recapDiv.getElementsByTagName("span")[2].innerHTML="Time Elapsed"
    }

    //"Audio 2/3"
    recapDiv.getElementsByTagName("span")[1].innerHTML=titlesDiv.querySelector("h1").innerText;

    //Score
    var totalScore = score+bonus-malus;
    recapDiv.getElementsByTagName("span")[3].innerHTML="Total score: " + totalScore;
    recapDiv.getElementsByTagName("span")[4].innerHTML="Score: " + score
    recapDiv.getElementsByTagName("span")[5].innerHTML="Time bonus: " + bonus
    recapDiv.getElementsByTagName("span")[6].innerHTML="Penalties: " + malus

    //résultat
    if (typeGame==="music") {
        recapDiv.getElementsByTagName("span")[7].innerHTML="You listened to: " + elemClicked
    }
    else if (typeGame==="pics") {
        recapDiv.getElementsByTagName("span")[7].innerHTML="You clicked on: " + elemClicked
    }
    else if (typeGame==="map") {
        recapDiv.getElementsByTagName("span")[7].innerHTML="You had to look for: " + elemClicked
    }
    
}