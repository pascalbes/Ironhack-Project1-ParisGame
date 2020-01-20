
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
    constructor(filenames,expected, toDo) {
        this.files=filenames;
        this.expected=expected;
        this.toDo=toDo;
    }

    loadPics() {

        var picsElements=document.getElementsByClassName("pics-element")

        for(let i=0;i<4;i++) {
            picsElements[i].src=this.files[i]
        }
    }

    isTheGoodOne(index) {
        return this.expected === index ? true : false 
    }

}

const pic1 = new Picture(["./Ressources/2- Pics/i11.jpg", "./Ressources/2- Pics/i12.jpg", "./Ressources/2- Pics/i13.jpg", "./Ressources/2- Pics/i14.jpg"],3,"find the parisian park")

const pic2 = new Picture(["./Ressources/2- Pics/i21.jpg", "./Ressources/2- Pics/i22.jpg", "./Ressources/2- Pics/i23.jpg", "./Ressources/2- Pics/i24.jpg"],2,"find the parisian stadium")

const pic3 = new Picture(["./Ressources/2- Pics/i31.jpg", "./Ressources/2- Pics/i32.jpg", "./Ressources/2- Pics/i33.jpg", "./Ressources/2- Pics/i34.jpg"],3,"find the painting representing a part of Paris")

var pictures=[pic1,pic2,pic3]



class Audio {
    constructor(filename, expected, name) {
      this.file=filename;
      this.expected=expected;
      this.name=name;
    }

    startMusic() {
        let audioElem=document.getElementById("audio");
        audioElem.src=this.file;
    }

    isTheGoodOne(txt) {
        return this.expected.includes(txt.toLowerCase()) ? true : false 
    }
}

var picsShown=[];
var indexPics = 0;


// Initialisation de l'array audios pour tests
const audio1 = new Audio("./Ressources/Music/Cut/paris-a-le-blues.mp3",["mad in paris", "paris a le blues"],"Find the group or the song");
const audio2 = new Audio("./Ressources/Music/Cut/paris-mai.mp3",["claude nougaro", "nougaro", "paris mai"],"Find the artist or the song");
const audio3 = new Audio("./Ressources/Music/Cut/paris-sud.mp3",["1995","Paris sud minute"],"Find the group or the song");
const audio4 = new Audio("./Ressources/Music/Cut/billie-april.mp3", ["billie holiday", "april in paris"],"Find the artist or the song")
const audio5 = new Audio("./Ressources/Music/Cut/ella-i-love.mp3", ["ella fitzgerald", "i love paris"], "Find the artist or the song")
const audio6 = new Audio("./Ressources/Music/Cut/jayzkanye-niggaz.mp3", ["jay z", "kanye west", "niggaz in paris", "jayz", "jay-z"], "Find one artist or the song")
const audio7 = new Audio("./Ressources/Music/Cut/midnight.mp3", ["midnight in paris", "woody allen", "sidney bechet", "si tu vois ma mere", "si tu vois ma mère"], "Find the artist, the song or the movie")
const audio8 = new Audio("./Ressources/Music/Cut/ntm-parissouslesbombes.mp3", ["ntm", "paris sous les bombes"], "Find the group or the song")
const audio9 = new Audio("./Ressources/Music/Cut/paris-seveille.mp3", ["dutronc", "jacques dutronc", "paris s'eveille", "paris s'éveille"], "Find the artist or the song")
var audios=[audio1,audio2,audio3,audio4,audio5,audio6,audio7,audio8,audio9];

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

//FONCTION SCORE calcul et actualise le score
function updateScore(type,result,t) {

    var score1=Number(scoreElem.textContent);

    if (type==="music" && result===1) { //cas ok
        score1 += 1000 + 500 + t/3;
    }
    else if (type==="music" && result===0) { //cas entrée nok
        score1 -= 200;
    }
    else if (type==="music" && result===-1) {// cas time elapsed
        score1 -= 200;
    }

    if (type==="pics" && result===1) { //cas ok
        score1 += 1000 + 500 + t/3;
    }
    else if (type==="pics" && result===0) { //cas entrée nok
        score1 -= 200;
    }
    else if (type==="pics" && result===-1) {// cas time elapsed
        score1 -= 200;
    }

    scoreElem.textContent=Math.floor(score1.toString());

}