let numberOfType1 = 0;
let numberOfType2 = 0;
let numberOfType3 = 0;
let enemies1 = [];

let enemies2 = [];


let enemies3 = [];





function spawnerType1() {
    for(let i = 0; i < 10;i++){

        let enemyName = "enemyType1-" + numberOfType1
        enemyName = createEnnemyType1()

    
        enemies1.push(enemyName);
        numberOfType1++
    
    }

    console.log(enemies1)


    
}


function spawnerType2() {

    for(let i = 0; i < 10;i++){
        let enemyName = "enemyType2-" + numberOfType2
        enemyName = createEnnemyType2()
    
        enemies2.push(enemyName);
        numberOfType2++

    
    }

    console.log(enemies2)

    
}


function spawnerType3() {

    for(let i = 0; i < 10;i++){
        let enemyName = "enemyType3-" + numberOfType3
        enemyName = createEnnemyType3()
    
        enemies3.push(enemyName);
        numberOfType3++

    
    }

    console.log(enemies3)

    
}

function createEnnemyType1(){
    const enemyDown = new Image()
    enemyDown.src = "./img/bot.png"

    const enemyUp = new Image()
    enemyUp.src = "./img/up1.png"

    const enemyRight = new Image()
    enemyRight.src = "./img/right.png"

    const enemyLeft = new Image()
    enemyLeft.src = "./img/left.png"


    const enemyDownAttackImage = new Image()
    enemyDownAttackImage.src = "./img/attakbot.png"

    const enemyUpAttackImage = new Image()
    enemyUpAttackImage.src = "./img/attakup.png"

    const enemyRightAttackImage = new Image()
    enemyRightAttackImage.src = "./img/attakright.png"

    const enemyLeftAttackImage = new Image()
    enemyLeftAttackImage.src = "./img/attakleft.png"

    return new Enemy ({
        position: {
            x: canvas.width / 2 - 528 / 4 / 2 -50,
            y: canvas.height / 2 - 157 / 2 - 50,
        },
        image: enemyDown,
        frames: {
            max: 4,
        },
        sprites: {
            up: enemyUp,
            left: enemyLeft,
            down: enemyDown,
            right: enemyRight,
    
    
            attackUp: enemyUpAttackImage,
            attackLeft:enemyLeftAttackImage,
            attackDown:enemyDownAttackImage,
            attackRight:enemyRightAttackImage,
    
        },
        size: {
            s : 1 ,
        },
        pointDeVie : 10,
        player: player ,
        rogneY: 61,
        imageWidth :39,
        imageHeight: 61,
        attackWidth: 56
    })

}


function createEnnemyType2(){


    const enemyDown = new Image()
    enemyDown.src = "./img/bot2.png"

    const enemyUp = new Image()
    enemyUp.src = "./img/up2.png"

    const enemyRight = new Image()
    enemyRight.src = "./img/right2.png"

    const enemyLeft = new Image()
    enemyLeft.src = "./img/left2.png"


    const enemyDownAttackImage = new Image()
    enemyDownAttackImage.src = "./img/attakbot2.png"

    const enemyUpAttackImage = new Image()
    enemyUpAttackImage.src = "./img/attakup2.png"

    const enemyRightAttackImage = new Image()
    enemyRightAttackImage.src = "./img/attakright2.png"

    const enemyLeftAttackImage = new Image()
    enemyLeftAttackImage.src = "./img/attakleft2.png"


    return new Enemy ({
        position: {
            x: canvas.width / 2 - 528 / 4 / 2 -50,
            y: canvas.height / 2 - 157 / 2 - 50,
        },
        image: enemyDown,
        frames: {
            max: 4,
        },
        sprites: {
            up: enemyUp,
            left: enemyLeft,
            down: enemyDown,
            right: enemyRight,
    
    
            attackUp: enemyUpAttackImage,
            attackLeft:enemyLeftAttackImage,
            attackDown:enemyDownAttackImage,
            attackRight:enemyRightAttackImage,
    
        },
        size: {
            s : 1 ,
        },
        pointDeVie : 10,
        player: player ,
        rogneY: 61,
        imageWidth :50,
        imageHeight: 69,
        attackWidth: 56

    })



}


function createEnnemyType3(){


    const enemyDown = new Image()
    enemyDown.src = "./img/bot3.png"

    const enemyUp = new Image()
    enemyUp.src = "./img/up3.png"

    const enemyRight = new Image()
    enemyRight.src = "./img/right3.png"

    const enemyLeft = new Image()
    enemyLeft.src = "./img/left3.png"


    const enemyDownAttackImage = new Image()
    enemyDownAttackImage.src = "./img/attakbot3.png"

    const enemyUpAttackImage = new Image()
    enemyUpAttackImage.src = "./img/attakup3.png"

    const enemyRightAttackImage = new Image()
    enemyRightAttackImage.src = "./img/attakright3.png"

    const enemyLeftAttackImage = new Image()
    enemyLeftAttackImage.src = "./img/attakleft3.png"

    return new Enemy ({
        position: {
            x: canvas.width / 2 - 528 / 4 / 2 -50,
            y: canvas.height / 2 - 157 / 2 - 50,
        },
        image: enemyDown,
        frames: {
            max: 4,
        },
        sprites: {
            up: enemyUp,
            left: enemyLeft,
            down: enemyDown,
            right: enemyRight,
    
    
            attackUp: enemyUpAttackImage,
            attackLeft:enemyLeftAttackImage,
            attackDown:enemyDownAttackImage,
            attackRight:enemyRightAttackImage,
    
        },
        size: {
            s : 1 ,
        },
        pointDeVie : 10,
        player: player ,
        rogneY: 61,
        imageWidth :48,
        imageHeight: 90,
        attackWidth: 56
    })


    


}