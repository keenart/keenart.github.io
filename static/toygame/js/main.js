var board,
    totX,totY,
    totPair,gameRes,
    rows,table,
    ico_path,ico_style,ico_type,ico_res,
    cards,items,selected

totX=8;
totY=8;
ico_path="static/toygame/img/"
ico_style=['toy','ff'][0];
ico_type="png";

function startGame(){
    function getIco(n){
        return ico_path+ico_res+"-"+ico_style+"-"+n+"."+ico_type;
    }
    function createIco(n){
        const img = document.createElement('img');
        img.src=getIco(n);
        return img;
    }
    board=document.getElementsByClassName('game-box')[0];
    board.innerHTML="";
    totPair= totY * totX/2;
    gameRes=Math.min(board.offsetWidth/totX,board.offsetHeight/totY);
    for (let y=0; y<totY; y++ ){
        const row = document.createElement('div');
        row.className="game-row";
        row.style.height=(100/(totY+2))+"%";
        for (let x=0; x<totX; x++){
            const cel = document.createElement('div');
            cel.className="game-cell";
            cel.style.width=(100/(totX+2))+"%";
            row.appendChild(cel);
        }
        board.appendChild(row);
    }

    table=[];
    rows=document.getElementsByClassName('game-row');
    if (gameRes<=40){ico_res=50}else{ico_res=100}
    for (row of rows){
        table.push(row.getElementsByClassName('game-cell'));
    }

    items=[];
    for (let y=0; y<totY; y++ ){
        for (let x=0; x<totX; x++){
            items.push([x,y])
        }
    }

    cards=[]
    for (let y=0; y<totY; y++ ){
        for (let x=0; x<totX; x++){
            if (x%2===0){col="gold"}else{col="silver"}
            cards.push([y,col])
        }
    }

    while (items.length>0){
        let pos=Math.floor(Math.random()*items.length)
        let nowIco=Math.floor(Math.random()*cards.length)
        table[items[pos][0]][items[pos][1]].appendChild(createIco(cards[nowIco][0]))

        table[items[pos][0]][items[pos][1]].style.backgroundColor=cards[nowIco][1]

        cards[nowIco]=cards[cards.length-1]
        cards.pop()
        items[pos]=items[items.length-1]
        items.pop()
    }
}

function unactiveCell(){
    for (let y=0; y<totY; y++ ){
        for (let x=0; x<totX; x++){
            table[y][x].classList.remove("game-cell-active","game-cell-selected")
            table[y][x].onclick=null
            selected = null
        }
    }
}

function findCell(y,x){
    if (!table[y][x].classList.contains("game-cell-none")){
        if (x===0 || x===totX-1) {
            return true;
        }else if (
            //(y>0 && table[y-1][x].classList.contains("game-cell-none"))||
            //(y!==totY-1 && table[y+1][x].classList.contains("game-cell-none"))||
            (x!==0 && table[y][x-1].classList.contains("game-cell-none"))||
            (x!==totX-1 && table[y][x+1].classList.contains("game-cell-none"))
        ){
            return true;
        }
    }
    return false;
}
function selectCell(y,x){
    if(selected===null){
        selected=[y,x]
        table[y][x].classList.add("game-cell-selected")
    }else if(selected[0]===y && selected[1]===x){
        selected=null
        table[y][x].classList.remove("game-cell-selected")
    }else{
        if (
            table[y][x].getElementsByTagName('img')[0].src===table[selected[0]][selected[1]].getElementsByTagName('img')[0].src &&
            table[y][x].style.backgroundColor===table[selected[0]][selected[1]].style.backgroundColor
        ) {
            delCell(selected[0], selected[1]);
            delCell(y, x);
            findActive();
        }else {
            table[selected[0]][selected[1]].classList.remove("game-cell-selected")
            selected=[y,x]
            table[y][x].classList.add("game-cell-selected")
        }
    }
}
function findActive(){
    unactiveCell();
    for (let y=0; y<totY; y++ ){
        for (let x=0; x<totX; x++){
            if(findCell(y,x)){
                table[y][x].classList.add("game-cell-active")
                table[y][x].onclick=function(){selectCell(y,x)};
            }
        }
    }
}

function delCell(y,x){
    table[y][x].classList.add("game-cell-none");
}


startGame()
findActive()