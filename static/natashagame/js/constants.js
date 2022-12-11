var startBoard={
    container: document.getElementById('board'),
    clearelement: '<div class="board_back" id="back"></div></div>',
    width: 10,
    height: 10,
    gap: 0.5,
    dif: 5,
    element: 1,
}
var elPref={
    xRes:100/(startBoard.width+2*startBoard.gap),
    yRes:100/(startBoard.height+2*startBoard.gap),
    width:(startBoard.element/(startBoard.gap*2+startBoard.width)*100)+"%",
    height:(startBoard.element/(startBoard.gap*2+startBoard.height)*100)+"%",
    standart:'<div class="e0"><div class="e1"></div><div class="e2"></div><div class="e3"></div></div>'
}
var gamePref={
    pop: 0,
    score: document.getElementById('score'),
    highscore: document.getElementById('highscore'),
    size: startBoard.width,
    colors: startBoard.dif,
    name: 'natata-'+startBoard.width+'-'+startBoard.dif
}

var mainBoard = new Array(startBoard.width);
var objBoard = new Array(startBoard.width);
var helpBoard = new Array(startBoard.width);
var elementsToRemove = new Array();
var action = true;
var allmoves= new Array()
for (let i=0;i<mainBoard.length;i++){
    mainBoard[i]=new Array(startBoard.height);
    objBoard[i]=new Array(startBoard.height);
    helpBoard[i]=new Array(startBoard.height);
}

function newBoard(w=startBoard.width,h=startBoard.height,d=startBoard.dif){
    startBoard.container.innerHTML=startBoard.clearelement;
    startBoard={
        container: startBoard.container,
        clearelement: startBoard.clearelement,
        width: w,
        height: h,
        gap: startBoard.gap,
        dif: d,
        element: startBoard.element,
    }
    elPref={
        xRes:100/(startBoard.width+2*startBoard.gap),
        yRes:100/(startBoard.height+2*startBoard.gap),
        width:(startBoard.element/(startBoard.gap*2+startBoard.width)*100)+"%",
        height:(startBoard.element/(startBoard.gap*2+startBoard.height)*100)+"%",
        standart:elPref.standart
    }
    gamePref={
        pop: 0,
        score: document.getElementById('score'),
        highscore: gamePref.highscore,
        size: w,
        colors: d,
        name: 'natata-'+w+'-'+d
    }
    if (localStorage.getItem(gamePref.name) !== null){
        gamePref.highscore.innerText=localStorage.getItem(gamePref.name);
    }else{
        gamePref.highscore.innerText=0;
    }
    mainBoard = new Array(startBoard.width);
    objBoard = new Array(startBoard.width);
    helpBoard = new Array(startBoard.width);
    
    for (let i=0;i<mainBoard.length;i++){
        mainBoard[i]=new Array(startBoard.height);
        objBoard[i]=new Array(startBoard.height);
        helpBoard[i]=new Array(startBoard.height);
    }
    
    
}
