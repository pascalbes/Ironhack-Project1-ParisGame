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

}


