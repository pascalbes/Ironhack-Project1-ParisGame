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

//SCORES

var titlesArr=["Good Answers", "Bonus time", "Bad Answers", "Time elapsed", "Penalties"]
var scoresArr=[0, 0, 0, 0, 0];
var nbScoresArr=[0, 0, 0, 0, 0];
var totalScore=0


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

        var picMap=document.querySelector("#pic-map")
        picMap.src=this.file

    }

    displayPic() {
        
        var picDiv=document.querySelector("#pic-element");
        picDiv.style.visibility="visible";

        setTimeout(function() {
            picDiv.style.visibility="hidden";
        },2000)

    }

    hidePic() {
        
        var picDiv=document.querySelector("#pic-element");
        picDiv.style.visibility="hidden";

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

const loc4= new Location("./Ressources/Plan Paris/tobefound/alex3.jpg", "Pont Alexandre III",0.359, 0.458, "")
const loc5= new Location("./Ressources/Plan Paris/tobefound/arc.jpg", "Arc de Triomphe",0.274, 0.34, "")
const loc6= new Location("./Ressources/Plan Paris/tobefound/batofar.jpg", "Batofar", 0.665, 0.822, "")
const loc7= new Location("./Ressources/Plan Paris/tobefound/bnf-1.jpg", "Bibliothèque Nationale de France", 0.648, 0.818, "")
const loc8= new Location("./Ressources/Plan Paris/tobefound/catacombes.jpg", "catacombes", 0.446, 0.811, "")
const loc9= new Location("./Ressources/Plan Paris/tobefound/frigos.png", "Frigos", 0.66, 0.849, "")
const loc10= new Location("./Ressources/Plan Paris/tobefound/heloise.jpg", "Héloïse et Abérlard", 0.722, 0.504, "")
const loc11= new Location("./Ressources/Plan Paris/tobefound/iron.jpg", "Ironhack", 0.704, 0.592, "")
const loc12= new Location("./Ressources/Plan Paris/tobefound/Italie 2.jpg", "Italie 2", 0.552, 0.853, "")
const loc13= new Location("./Ressources/Plan Paris/tobefound/joconde.jpg", "Mona Lisa, Musée du Louvre", 0.461, 0.499, "")
const loc14= new Location("./Ressources/Plan Paris/tobefound/new-morning.jpg", "New Morning", 0.546, 0.347, "")
const loc15= new Location("./Ressources/Plan Paris/tobefound/pont-neuf.jpg", "Pont Neuf", 0.48, 0.521, "")
const loc16= new Location("./Ressources/Plan Paris/tobefound/rev.png", "Révolution, Place de la Concorde", 0.398, 0.44, "")
const loc17= new Location("./Ressources/Plan Paris/tobefound/tour eiffel.jpg", "Tour Eiffel", 0.271, 0.521, "")
const loc18= new Location("./Ressources/Plan Paris/tobefound/vosges.jpg", "Place des Vosges", 0.6, 0.555, "")


var locations=[loc1, loc2, loc3, loc4, loc5, loc6, loc7, loc8, loc9, loc10, loc11, loc12, loc13, loc14, loc15, loc16, loc17, loc18];

//pour la présentation

locations=[loc17, loc3, loc11];

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
const pic5 = new Picture(["./Ressources/2- Pics/i51-chirac1997.jpg", "./Ressources/2- Pics/i52-1974.jpg", "./Ressources/2- Pics/i53-chirac2002.jpg", "./Ressources/2- Pics/i54-1978.jpg"],4,"find Jacques when he was mayor of Paris", ["Chirac in 1997", "Chirac in 1974", "Chirac in 2002", "Chirac in 1978, Maire de Paris"])
const pic6 = new Picture(["./Ressources/2- Pics/i161-par.jpg", "./Ressources/2- Pics/i162american-revolution.jpg", "./Ressources/2- Pics/i164-italian.jpg", "./Ressources/2- Pics/i163english.jpg"],1,"find parisian revolution", ["Revolution of 1830 in Paris", "American revolution", "English revolution", "Italian revolution"])
const pic7 = new Picture(["./Ressources/2- Pics/i101Starry-Night-by-Vincent-Van-Gogh-painting-ny.jpg", "./Ressources/2- Pics/i102Turner-blue_rigi_sunrise_tate_t12336_9.jpg", "./Ressources/2- Pics/i103millet.jpg", "./Ressources/2- Pics/i104Guernica-by-Picasso-painting.jpg"],3,"find the painting exhibited in Paris", ["Van Gogh / New York", "Turner / London", "L'angélus de Millet / Paris Orsay", "Picasso Guernica / Madrid"])
const pic8 = new Picture(["./Ressources/2- Pics/i111Paris-Las-Vegas.jpg", "./Ressources/2- Pics/i112tok.jpg", "./Ressources/2- Pics/i113par.jpg", "./Ressources/2- Pics/i114pra.jpg"],3,"find the one and only Tour Eiffel", ["Las Vegas", "Tokyo", "Paris", "Prague"])
const pic9 = new Picture(["./Ressources/2- Pics/i121-rom.jpg", "./Ressources/2- Pics/i122ber.jpg", "./Ressources/2- Pics/i123-par.jpg", "./Ressources/2- Pics/i124mos.jpg"],3,"find Paris Triumphal Arch", ["Roma", "Berlin", "Paris", "Moscow"])
const pic10 = new Picture(["./Ressources/2- Pics/i131par.jpg", "./Ressources/2- Pics/i133syd.jpg", "./Ressources/2- Pics/i134metopera1.jpg", "./Ressources/2- Pics/i13éwien.jpg"],1,"find the parisian opera", ["Paris", "Sydney", "NY", "Wien"])
const pic11 = new Picture(["./Ressources/2- Pics/i141-mars.jpg", "./Ressources/2- Pics/i142velovly.jpg", "./Ressources/2- Pics/i143gre.jpg", "./Ressources/2- Pics/i144.jpg"],4,"find Paris city bike", ["Marseille", "Lyon", "Grenoble", "Paris"])
const pic12 = new Picture(["./Ressources/2- Pics/i151-par.jpg", "./Ressources/2- Pics/i152-lon.jpg", "./Ressources/2- Pics/i153-banksy.jpg", "./Ressources/2- Pics/i154ny.jpg"],1,"find parisian piece of street art", ["Paris XIII", "London", "Palestine", "NY"])
const pic13 = new Picture(["./Ressources/2- Pics/i62-kremlin.jpg", "./Ressources/2- Pics/i61-elysee.jpg", "./Ressources/2- Pics/i63-maisonblanche.jpg", "./Ressources/2- Pics/i64-deathstar.jpeg"],2,"where does french president live ?", ["Moscow", "Paris Elysée","Washington", "Death Star"])
const pic14 = new Picture(["./Ressources/2- Pics/i71-parma.jpg", "./Ressources/2- Pics/i72-paris.jpg", "./Ressources/2- Pics/I73-bay.jpg", "./Ressources/2- Pics/i74-bellota.jpg"],2,"find parisian ham", ["Parma", "Paris", "Bayonne", "Bellota"])
const pic15 = new Picture(["./Ressources/2- Pics/i81-paris.jpg", "./Ressources/2- Pics/i82-girolle.jpg", "./Ressources/2- Pics/i83-amanite.jpg", "./Ressources/2- Pics/i84cèpes.jpg"],1,"find parisian mushroom", ["Champignons de Paris", "Girolles", "Amanites", "Cèpes"])
const pic16 = new Picture(["./Ressources/2- Pics/i91.jpg", "./Ressources/2- Pics/i92.jpg", "./Ressources/2- Pics/i93mont.jpg", "./Ressources/2- Pics/i94roma.jpg"],3,"find parisian stairs", ["NY / Joker", "Lisboa", "Paris", "Roma"])
const pic17 = new Picture(["./Ressources/2- Pics/", "./Ressources/2- Pics", "./Ressources/2- Pics", "./Ressources/2- Pics"],4,"find ", ["", "", "", ""])
const pic18 = new Picture(["./Ressources/2- Pics", "./Ressources/2- Pics", "./Ressources/2- Pics", "./Ressources/2- Pics"],4,"find ", ["", "", "", ""])

var pictures=[pic1,pic2,pic3,pic4,pic5,pic6,pic7,pic8,pic9,pic10,pic11,pic12,pic13,pic14,pic15,pic16]

//pour la présentation
pictures=[pic15, pic13, pic3]

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
const audio9 = new Audio("./Ressources/Music/Cut/paris-seveille.mp3", ["dutronc", "jacques dutronc", "paris s'eveille", "paris s'éveille"], "find the artist or the song", "Jacques Dutronc - Paris s'éveille")
const audio10 = new Audio("./Ressources/Music/Cut/oh-ville-lumiere.mp3", ["parc des princes"], "what place are we ?", "Parc des Princes - Oh ville lumière")
const audio11 = new Audio("./Ressources/Music/Cut/paris-austerlitz.mp3", ["gare d'austerlitz", "austerlitz"], "in which train station are we ?", "Gare d'Austerlitz")
const audio12 = new Audio("./Ressources/Music/Cut/antoine-kombouare.mp3", ["madrid", "real", "real madrid"], "who is PSG opponent ?", "Real Madrid - 1993")
const audio13 = new Audio("./Ressources/Music/Cut/mxms-paris.mp3",["mxms", "paris"], "find the artist or the song", "MXMS - Paris");
const audio14 = new Audio("./Ressources/Music/Cut/ligne-4.mp3", ["barbes", "barbès", "barbes rochechouart", "barbès rochechouart", "barbès-rochechouart", "barbes-rochechouart"], "what is next metro station ?", "Barbes Rochechouart")
const audio15 = new Audio("./Ressources/Music/Cut/midnight-in-paris-rain-scene.mp3",["midnight in paris"], "what movie the scene is from ?", "Midnight in Paris - Ending Scene")
const audio16 = new Audio("./Ressources/Music/Cut/roy-hargrove-quintet-strasbourg-st-denis.mp3", ["roy hargrove", "strasbourg st denis", "strasbourg-st-denis", "strasbourg st-denis"], "find the artist or the song", "Roy Hargrove - Strasbourg St-Denis");
const audio17 = new Audio("./Ressources/Music/Cut/st-germain-lauxerrois.mp3", ["louvre", "place du louvre"], "we are on a place. which one ?", "Place du Louvre")
const audio18 = new Audio("./Ressources/Music/Cut/warning-siren.mp3", ["12h", "midi", "12"], "what time is it ?", "12h");
const audio19 = new Audio("./Ressources/Music/Cut/yves-montand-a-paris.mp3", ["yves montand", "montand", "a paris", "à paris"], "find the artist or the song", "Yves Montand - A Paris");
const audio20 = new Audio("./Ressources/Music/Cut/joe-dassin-les-champs-elysees-1969.mp3", ["joe dassin", "dassin", "champs-élysées", "les champs-élysées","champs élysées", "champs-elysees", "les champs-elysees","champs elysees"], "find the artist or the song", "Joe Dassin - Les Champs-Elysées");
const audio21 = new Audio("./Ressources/Music/Cut/edith-piaf-sous-le-ciel-de-paris.mp3", ["sous le ciel de paris", "edith piaf", "piaf"], "find the artist or the song", "Edith Piaf - Sous le ciel de Paris");
const audio22 = new Audio("./Ressources/Music/Cut/bigaranx-paris-is-a-bitch-riddim-by-telly.mp3", ["bigaranx", "paris is a bitch","biga-ranx","biga ranx", "biga*ranx"], "find the artist or the song", "Biga*Ranx - Paris is a Bitch (Riddim by Telly)")

var audios=[audio1,audio2,audio3,audio4,audio5,audio6,audio7,audio8,audio9, audio10,audio11,audio12,audio13,audio14,audio15,audio16,audio17,audio18, audio19, audio20, audio21, audio22];

//pour la présentation
var audios=[audio21, audio6, audio11];

var audioPlayed=[];
var indexAudios = 0;

//Tableau de photos pour la gallerie du Music Game
const pics=[];
for (i=1;i<=11;i++) {
    pics.push("./Ressources/Music/Pics/i" + i + ".jpg")
}




// FONCTIONS UTILES

//renvoi un entier random compris entre min et max
function randomEasy(min,max) {
    //Presentation mode
    return min

    //Running verion : 
    //return min + Math.round(Math.random()*(max-min))
}

//renvoi un entier random compris entre min et max et non inclus dans le tableau arr
function randomNew(min,max, arr) {

    //Presentation mode
    for (let i=min ; i<=max;i++) {
        if (!arr.includes(i)) {
            return i
        }
    }

    //Running verion : 
    // let elem = randomEasy(min, max)
    // while (arr.includes(elem)) {
    //     elem = randomEasy(min, max)
    // }
    // return elem
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
    var bad=0;
    var elapsed=0;
    var penalties=0

    //CAS ELAPSED
    if (result===-1) {// cas time elapsed
        elapsed = -1000;
    }

    //CASE MUSIC
    if (type==="music" && result===1) { //cas ok
        score = 5000;
        bonus = Math.floor(2000 - t);
    }
    else if (type==="music" && result===0) { //cas entrée nok
        penalties = -500;
        nbScoresArr[4]++
    }
    else if (type==="music" && result===-0.5) { //cas entrée nok
        bad = -500;
    }

    //CASE PICS
    if (type==="pics" && result===1) { //cas ok
        score = 5000;
        bonus = Math.floor(2000 - t);
    }
    else if (type==="pics" && result===0) { //cas entrée nok
        bad = -500;
    }

    //CASE MAPS
    if (type==="map" && result !== -1) {//result : distance
        if (result<2000) {
            score = Math.floor(5000 - result*5/2);
            bonus = Math.floor(2000 - t);
        }
        else {
            bad=-500;
        }
    }

    score1 = score1 + score + bonus + bad + elapsed + penalties; 

    scoreElem.textContent=Math.floor(score1.toString());

    score!==0 ? nbScoresArr[0]++ : 1
    bonus!==0 ? nbScoresArr[1]++ : 1
    bad!==0 ? nbScoresArr[2]++ : 1
    elapsed!==0 ? nbScoresArr[3]++ : 1

    return [score, bonus, bad, elapsed, penalties]
}


//FONCTION RECAP :affiche le recap de l'action réalisée sur un jeu
function recap(typeGame, typeResult, time, [score, bonus, bad, elapsed, penalties], elemClicked) {

    //update des totaux
    scoresArr[0] += score
    scoresArr[1] += bonus 
    scoresArr[2] += bad
    scoresArr[3] += elapsed
    scoresArr[4] += penalties

    totalScore = score+bonus+bad+elapsed+penalties;

    //arrêt de l'audio en cours
    if (typeGame==="music") {
        audios[0].stopMusic();
        var inputAudio=document.getElementById("music-input");
        inputAudio.setAttribute("editable", false)
    }

    //affichage du recap
    var recapDiv=document.querySelector("#recap");
    recapDiv.style.visibility="visible";

    //passage à la suite à "enter"
    var btnNext=document.querySelector("#next");

    window.addEventListener("keydown", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13 && recapDiv.style.visibility==="visible") {
          // Cancel the default action, if needed
          event.preventDefault();
          
          // Trigger the button element with a click
          document.querySelector("#next").click();
        }
    });


    //au clic : on cache la pop-up et on vide le tableau
    btnNext.onclick = function() {

        recapDiv.style.visibility="hidden";
        var tableLines=document.getElementById("recap-table").querySelector("tbody").querySelectorAll("tr")

        tableLines.forEach((tr) => {
            tr.remove();
        });

        nextPart();
    }

    //bonne ou mauvaise réponse
    if (bonus >0) {
        document.getElementById("recap-text").innerHTML="Well done!"
    }
    else {
        document.getElementById("recap-text").innerHTML="Too bad!"
    }

    //Réponse
    if (typeGame==="music") {
        document.getElementById("recap-answer").innerHTML="Expected answer was:<br>\"" + elemClicked + "\""
    }
    else if (typeGame==="pics") {
        document.getElementById("recap-answer").innerHTML="The picture you selected is:<br>\"" + elemClicked + "\""
    }
    else if (typeGame==="map") {
        document.getElementById("recap-answer").innerHTML="You are " + typeResult + " meters away";
    }


    //Score total
    document.getElementById("recap-score").innerHTML=totalScore + " pts"

    var recapTable=document.getElementById("recap-table").querySelector("tbody")

    function addLine2(titreItem, scoreItem) {

        var tr = document.createElement("tr")
        recapTable.appendChild(tr)
        var td1=document.createElement("td")
        td1.innerHTML=titreItem
        tr.appendChild(td1)
        var td2=document.createElement("td")
        td2.innerHTML=scoreItem + " pts"
        tr.appendChild(td2)
    }

    //update du tableau
    if (score>0) {

        //good answer
        addLine2("Good Answer", score)

        //bonus time
        addLine2("Bonus time", bonus)

    }
    else if (bad<0) {
        //bad answer
        addLine2("Bad Answer", bad)
    }
    else if (elapsed<0) {
        addLine2("Elapsed time", elapsed)
    }
    if (penalties<0) {
        addLine2("Penalties", penalties)
    }

        

    // //affichage pr le map
    // if (typeGame==="map") {




        // if (typeResult===-1) {
        //     recapDiv.getElementsByTagName("span")[3]="Time Elapsed"
        // }
        // else if (typeResult < 100) {
        //     recapDiv.getElementsByTagName("span")[3].innerHTML="Bravo !!"
        // }
        // else if (typeResult < 500) {
        //     recapDiv.getElementsByTagName("span")[3].innerHTML="well done!"
        // }
        // else if (typeResult < 1000) {
        //     recapDiv.getElementsByTagName("span")[3].innerHTML="not bad!"
        // }
        // else if (typeResult < 2000) {
        //     recapDiv.getElementsByTagName("span")[3].innerHTML="making a \"small\" detour ?"
        // }
        // else if (typeResult < 5000) {
        //     recapDiv.getElementsByTagName("span")[3].innerHTML="do not make any appointment there"
        // }
        // else {
        //     recapDiv.getElementsByTagName("span")[3].innerHTML="at least you selected Paris right ? ;)"
        // }
        
    
}