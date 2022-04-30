const oyunEkrani = document.getElementById('oyunEkrani')
const ekranMarginTop = parseInt(window.getComputedStyle(oyunEkrani).marginTop)
const ekranHeight = parseInt(window.getComputedStyle(oyunEkrani).height)
const ekranWidth = parseInt(window.getComputedStyle(oyunEkrani).width)
const ekranMarginLeft = parseInt(window.getComputedStyle(oyunEkrani).marginLeft)
const ekranMarginRight = parseInt(window.getComputedStyle(oyunEkrani).marginRight)
// const ekranWidth = parseInt(window.getComputedStyle(document.body).width)
const yem = document.getElementById('yem')
const yemHeight = parseInt(window.getComputedStyle(yem).height)
const yemWidth = parseInt(window.getComputedStyle(yem).width)
const resultHeight = (ekranMarginTop + ekranHeight) - (ekranMarginTop+yemHeight)

var yemY = 0
var yemX = 0
var assagi = true
var carpisma = false
var yukari = false
var sag = false
var sol = false
var yukariAsagiFlag = true
var sagSolFlag = false
var tails = []
const colors = [
    "AliceBlue",
    "AntiqueWhite",
    "Aqua",
    "Aquamarine",
    "Azure",
    "Beige",
    "Bisque",
    "Black",
    "BlanchedAlmond",
    "Blue",
    "BlueViolet",
    "Turquoise",
    "Violet",
    "Wheat",
    "White",
    "WhiteSmoke",
    "Yellow",
    "YellowGreen",
];
var randomYem = document.createElement('div')
randomYem.style.position = 'absolute'
randomYem.style.height = 20+'px'
randomYem.style.width = 20+'px'
randomYem.style.borderRadius = 5+'px'

function createYem() {
    var totalSpots = yemTech()
    var newYem = []
    totalSpots.forEach((spot) => {
        if(spot.x == yemX && spot.y == yemY){
            spot.available = false
        }
        tails.forEach((tail) => {
            if (spot.x == parseInt(tail.style.marginLeft) && spot.y == parseInt(tail.style.marginTop)) {
                spot.available = false
            }
        })
    })
    totalSpots.forEach((spot)=>{
        if(spot.available){
            newYem.push(spot)
        }
    })
    var newRandom = Math.floor(Math.random()*newYem.length)
    randomYem.style.marginLeft = newYem[newRandom].x +'px'
    randomYem.style.marginTop = newYem[newRandom].y +'px'

    var randomColor = Math.floor(Math.random() * 18)
    randomYem.style.background = colors[randomColor]
    oyunEkrani.appendChild(randomYem)
    
}
function deleteYem() {
    oyunEkrani.removeChild(randomYem)
}

function yemTech(){
    var totalSpots = []
    var obj = {
        id:Number,
        x:Number,
        y:Number,
        available:Boolean
    }
    var x=0
    var y=0
    var id = 1
    for(let i=0; i<(ekranWidth/25);i++){
        x=0
        for(let k=0; k<ekranHeight/25; k++){
            obj.x = x
            obj.y = y
            obj.available = true
            obj.id = id
            id++
            x=x+25
            totalSpots.push(obj)
            obj = {}
        }
        y+=25
    }
    return totalSpots
}
createYem()

function addToTail() {
    var tail = document.createElement('div')
    tail.id = 'yem'
    if(tails.length == 0){
        if(yukari){
            var left = parseInt(yem.style.marginLeft)
            var top = parseInt(yem.style.marginTop)
            tail.style.marginLeft = left + 'px'
            tail.style.marginTop = (top + 25) + 'px'
            tails.push(tail)
        }else if(sag){
            var left = parseInt(yem.style.marginLeft)
            var top = parseInt(yem.style.marginTop)
            tail.style.marginLeft = left - 25 + 'px'
            tail.style.marginTop = top+'px'
            tails.push(tail)
        }else if(sol){
            var left = parseInt(yem.style.marginLeft)
            var top = parseInt(yem.style.marginTop)
            tail.style.marginLeft = left + 25 + 'px'
            tail.style.marginTop = top+'px'
            tails.push(tail)
        }else if(assagi){
            var left = parseInt(yem.style.marginLeft)
            var top = parseInt(yem.style.marginTop)
            tail.style.marginLeft = left + 'px'
            tail.style.marginTop = (top - 25) + 'px'
            tails.push(tail)
        }
    }else if(tails.length == 1){
        if(yemY > parseInt(tails[0].style.marginTop)){
            var left = parseInt(tails[0].style.marginLeft)
            var top = parseInt(tails[0].style.marginTop)
            tail.style.marginLeft = left + 'px'
            tail.style.marginTop = (top - 25) + 'px'
            tails.push(tail)
        }else if(yemY < parseInt(tails[0].style.marginTop)){
            var left = parseInt(tails[0].style.marginLeft)
            var top = parseInt(tails[0].style.marginTop)
            tail.style.marginLeft = left + 'px'
            tail.style.marginTop = (top + 25) + 'px'
            tails.push(tail)
        }else if(yemX > parseInt(tails[0].style.marginLeft)){
            var left = parseInt(tails[0].style.marginLeft)
            var top = parseInt(tails[0].style.marginTop)
            tail.style.marginLeft = left - 25 + 'px'
            tail.style.marginTop = top + 'px'
            tails.push(tail)
        }else if(yemX < parseInt(tails[0].style.marginLeft)){

            var left = parseInt(tails[0].style.marginLeft)
            var top = parseInt(tails[0].style.marginTop)
            tail.style.marginLeft = left + 25 + 'px'
            tail.style.marginTop = top + 'px'
            tails.push(tail)
        }
    }else{
        if (parseInt(tails[tails.length - 2].style.marginLeft) < parseInt(tails[tails.length - 1].style.marginLeft)){
            var left = parseInt(tails[tails.length-1].style.marginLeft)
            var top = parseInt(tails[tails.length-1].style.marginTop)
            tail.style.marginLeft = left + 25 + 'px'
            tail.style.marginTop = top + 'px'
            tails.push(tail)
        }else if(parseInt(tails[tails.length-2].style.marginLeft) > parseInt(tails[tails.length-1].style.marginLeft)){
            var left = parseInt(tails[tails.length - 1].style.marginLeft)
            var top = parseInt(tails[tails.length - 1].style.marginTop)
            tail.style.marginLeft = left - 25 + 'px'
            tail.style.marginTop = top + 'px'
            tails.push(tail)
        }else if(parseInt(tails[tails.length-2].style.marginTop) > parseInt(tails[tails.length-1].style.marginTop)){
            var left = parseInt(tails[tails.length - 1].style.marginLeft)
            var top = parseInt(tails[tails.length - 1].style.marginTop)
            tail.style.marginLeft = left + 'px'
            tail.style.marginTop = top - 25 + 'px'
            tails.push(tail)
        }else if(parseInt(tails[tails.length - 2].style.marginTop) < parseInt(tails[tails.length - 1].style.marginTop)){
            var left = parseInt(tails[tails.length - 1].style.marginLeft)
            var top = parseInt(tails[tails.length - 1].style.marginTop)
            tail.style.marginLeft = left + 'px'
            tail.style.marginTop = top + 25 + 'px'
            tails.push(tail)
        }
    }
    oyunEkrani.appendChild(tail)
}
function updatetail() {
    for(let i=0; i<tails.length;i++){
        tails[i].style.marginTop = movesY[movesY.length-(i+1)]+'px'
        tails[i].style.marginLeft = movesX[movesX.length-(i+1)]+'px'
    }

    

    if(tails.length >= 1){
        tails[tails.length-1].style.background = 'black'
    }
}
function kontrol() {
    tails.forEach((tail)=>{
        if(yemY == parseInt(tail.style.marginTop) && yemX==parseInt(tail.style.marginLeft)){
            carpisma=true
        }
    })
}
setInterval(() => {
    kontrol()
}, 100);

var movesY = []
var movesX = []
var counter = 0
function goYe() {
    setTimeout(() => {
        if(assagi && !carpisma){
            movesY[counter] = yemY
            movesX[counter] = yemX
            counter++
            updatetail()
            yemY=yemY+25
            yem.style.marginTop = yemY+'px'
            if(yemY == parseInt(randomYem.style.marginTop) && yemX == parseInt(randomYem.style.marginLeft)){
                deleteYem()
                addToTail()
                createYem()
            }
            goYe()
        }
        if((yemY > resultHeight) ){
            carpisma = true
        }
    }, 100);
}
function goNegY() {
    setTimeout(() => {
        if(yukari && !carpisma){
            movesY[counter] = yemY
            movesX[counter] = yemX
            counter++
            updatetail()
            yemY-=25
            yem.style.marginTop = yemY+'px'
            if (yemY == parseInt(randomYem.style.marginTop) && yemX == parseInt(randomYem.style.marginLeft)) {
                deleteYem()
                addToTail()
                createYem()
            }
            goNegY()
        }
        if((yemY <= -10) ){
            carpisma = true
        }
    }, 100);
}
function goX() {
    setTimeout(() => {
        if(sag && !carpisma){
            movesY[counter] = yemY
            movesX[counter] = yemX
            counter++
            updatetail()
            yemX+=25
            yem.style.marginLeft = yemX+'px'
            if (yemY == parseInt(randomYem.style.marginTop) && yemX == parseInt(randomYem.style.marginLeft)) {
                deleteYem()
                addToTail()
                createYem()
            }
            goX()
        }
        if(yemX>=ekranWidth-yemWidth+25){
            carpisma = true
        }
    }, 100);
}
function goNegX() {
    setTimeout(() => {
        if(sol && !carpisma){
            movesY[counter] = yemY
            movesX[counter] = yemX
            counter++
            updatetail()
            yemX-=25
            yem.style.marginLeft = yemX+'px'
            if (yemY == parseInt(randomYem.style.marginTop) && yemX == parseInt(randomYem.style.marginLeft)) {
                deleteYem()
                addToTail()
                createYem()
            }
            goNegX()
        }
        if(yemX<0){
            carpisma = true
        }
    }, 100);
}
var canPress = true
function canPressTrigger() {
    setTimeout(() => {
        canPress = true
    }, 100);
}
window.addEventListener('keydown',(e)=>{
    if(e.key == 'w' && !carpisma && yukariAsagiFlag && canPress){
        canPress = false
        goNegY()
        yukariAsagiFlag = false
        sagSolFlag = true
        yukari = true
        sag = false
        sol = false
        assagi = false
        canPressTrigger()
    }
    if(e.key == 'a' && !carpisma && sagSolFlag && canPress){
        canPress = false
        goNegX()
        sagSolFlag = false
        yukariAsagiFlag = true
        sol = true
        sag = false
        assagi = false
        yukari = false
        canPressTrigger()
    }
    if(e.key == 's' && !carpisma && yukariAsagiFlag && canPress){
        canPress = false
        goYe()
        yukariAsagiFlag = false
        sagSolFlag = true
        assagi = true
        sag = false
        sol = false
        yukari = false
        canPressTrigger()
    }
    if(e.key == 'd' && !carpisma && sagSolFlag && canPress){
        canPress = false
        goX()
        sagSolFlag = false
        yukariAsagiFlag = true
        sag = true
        yukari = false
        assagi = false
        sol = false
        canPressTrigger()
    }
})


