var animtypes=['anim-in','anim-down','anim-select']
function makeElement(
    el="clr-1", 
    xPos=0, 
    yPos=0,
    wPos=elPref.width, 
    hPos=elPref.height, 
    inner=elPref.standart){
        const div = document.createElement('div');
        div.className=el;
        div.innerHTML=inner

        div.style.width=wPos;
        div.style.height=hPos;
        div.style.left=((startBoard.gap+xPos)*elPref.xRes)+'%';
        div.style.bottom=((startBoard.gap+yPos)*elPref.yRes)+'%';
        
        div.dataset.x=xPos;
        div.dataset.y=yPos;
        div.dataset.type=el;
        
        return div;
}

function delElement(){
    let elements=startBoard.container.getElementsByClassName('anim-out')
    for(el of elements){
        el.remove();
    }
    elementsToRemove=new Array()
}

function findSimilar(x,y){
    helpBoard[x][y]=true;
    gamePref.pop++;
    if (x>0 ){
        if (objBoard[x][y]==objBoard[x-1][y]){
            if(!helpBoard[x-1][y]){findSimilar(x-1,y)}
        }
    }
    if (y>0){
        if (objBoard[x][y]==objBoard[x][y-1]){
            if(!helpBoard[x][y-1]){findSimilar(x,y-1)}
        }
    }
    if (x<startBoard.width-1){
        if (objBoard[x][y]==objBoard[x+1][y]){
            if(!helpBoard[x+1][y]){findSimilar(x+1,y)}
        }
    }
    if (y<startBoard.height-1){
        if (objBoard[x][y]==objBoard[x][y+1]){
            if(!helpBoard[x][y+1]){findSimilar(x,y+1)}
        }
    }
}
function moveDivDown(div,x,oldY,y){
    div.style.bottom=((startBoard.gap+y)*elPref.yRes)+'%';
    div.dataset.y=y;
    let move=oldY-y;
    if(move<=12){
        div.classList.add('anim-down-'+move)
    }else{
        div.classList.add('anim-down-12')
    }
    mainBoard[x][y]=div;
    objBoard[x][y]=objBoard[x][oldY];
}

function moveDown(){
    allmoves=new Array;
    for(let x=0; x<startBoard.width;x++){    
        let moves=0;
        let newColumn=[];
        for (let y=0; y<startBoard.height; y++){
            if (helpBoard[x][y]){
                moves++
            }else{
                newColumn.push(y);
            }
        }
        allmoves.push(moves);
        if (moves>0){
            for (let y=0;y<startBoard.height-moves; y++){
                let oldY=newColumn[y]
                if(parseInt(mainBoard[x][oldY].dataset.y)>y){
                    moveDivDown(mainBoard[x][oldY],x,oldY,y);
                }
            }
            
        }
    }
}

function moveNew(){
    for (let x=0;x<startBoard.width;x++){
        for (let y=startBoard.height-allmoves[x]; y<startBoard.height; y++){
            el='clr-'+(Math.floor(Math.random()*startBoard.dif)+1);
            mainBoard[x][y]=makeElement(el,x,y);
            objBoard[x][y]=el;
            makeAction(mainBoard[x][y]);
            mainBoard[x][y].classList.add('anim-in');
            startBoard.container.append(mainBoard[x][y])
        }
    }
}

function makeAction(div){
    div.onmousedown=function(e){
        if(action){
            action=false
            if ((gamePref.pop>2)&&(div.classList.contains('anim-select'))){
                gamePref.score.innerText=parseInt(gamePref.score.innerText)+gamePref.pop
                if(parseInt(gamePref.highscore.innerText)<parseInt(gamePref.score.innerText)){
                    gamePref.highscore.innerText=gamePref.score.innerText
                    localStorage.setItem(gamePref.name,gamePref.highscore.innerText)
                }
                for (let x=0; x<startBoard.width; x++){
                    for (let y=0; y<startBoard.height; y++){
                        if(objBoard[x][y]!=0){
                            if(mainBoard[x][y].classList.contains('anim-select')){
                                mainBoard[x][y].className=mainBoard[x][y].dataset.type;
                                mainBoard[x][y].classList.add('anim-out');
                            }
                        }
                    }
                }
                setTimeout(delElement,300)
                setTimeout(moveDown,310);
                setTimeout(moveNew,420);
                setTimeout(() => {
                    action=true 
                },820);
            }else{
                for (let x=0; x<startBoard.width; x++){
                    for (let y=0; y<startBoard.height; y++){
                        helpBoard[x][y]=false;
                        if(objBoard[x][y]!=0){mainBoard[x][y].className=mainBoard[x][y].dataset.type;}
                    }
                }
                gamePref.pop=0;
                findSimilar(parseInt(div.dataset.x),parseInt(div.dataset.y))
                if(gamePref.pop>2){
                    for (let x=0; x<startBoard.width; x++){
                        for (let y=0; y<startBoard.height; y++){
                            if (helpBoard[x][y]){mainBoard[x][y].classList.add('anim-select')}
                        }
                    }
                }
                action=true
            }
             
        }
    }
    div.onmouseout = function(e){
        if(action){
            action=false;
            delElement();
            action=true;
        }
    };
}

