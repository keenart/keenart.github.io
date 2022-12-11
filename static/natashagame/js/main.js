function newGame(width=startBoard.width,height=startBoard.height,dif=startBoard.dif){
    newBoard(width,height,dif);
    for (let x=0;x<startBoard.width;x++){
        for (let y=0;y<startBoard.height;y++){
            el='clr-'+(Math.floor(Math.random()*startBoard.dif)+1);
            mainBoard[x][y]=makeElement(el,x,y);
            objBoard[x][y]=el;
            makeAction(mainBoard[x][y]);
            mainBoard[x][y].classList.add('anim-in');
            startBoard.container.append(mainBoard[x][y]);
        }
    }
    gamePref.score.innerText=0
}
function menuStart(){
    gamePref.size=startBoard.width;
    gamePref.colors=startBoard.colors;
    document.getElementById('startcolors').innerText=startBoard.dif;
    document.getElementById('startsize').innerText=startBoard.width;
    document.body.className='mainmenu'
}
function menuGame(){
    document.body.className='gameon'
}
function startGame(){
    newGame(gamePref.size,gamePref.size,gamePref.colors);
    menuGame()
}
function firstScreen(){
    gamePref.size=startBoard.width;
    gamePref.colors=startBoard.dif;
    document.getElementById('startcolors').innerText=startBoard.dif;
    document.getElementById('startsize').innerText=startBoard.width;
    document.body.className='firstscreen'
}
function changeSize(){
    if (gamePref.size<20){
        gamePref.size+=2;
    }else{
        gamePref.size=6
    }
    document.getElementById('startsize').innerText=gamePref.size
}
function changeColors(){
    if (parseInt(gamePref.colors)<7){
        gamePref.colors+=1;
    }else{
        gamePref.colors=4;
    }
    document.getElementById('startcolors').innerText=gamePref.colors
}

firstScreen()
