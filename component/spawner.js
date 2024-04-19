let numberOfType1 = 0;
let numberOfType2 = 0;
let numberOfType3 = 0;


let numberOfSpawnType1 = 0;
let numberOfSpawnType2 = 0;
let numberOfSpawnType3 = 0;



const enemies1 = [];

const enemies2 = [];


const enemies3 = [];


const enemiesSpawn1 = [];

const enemiesSpawn2 = [];


const enemiesSpawn3 = [];

let numberOfEnnemyType1 = 0;




function createEnnemyType1(positions){
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
            x: positions.x,
            y: positions.y,
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

function createSpawner1(){
      
      /* let enemySpawnNamez = "spawnerEnemyType1-" + numberOfSpawnType1 */
      
       const enemySpawnName = new Spawner ({
            position: {
                x: canvas.width / 2 - 528 / 4 / 2 + 500 + 20,
                y: canvas.height / 2 - 157 / 2 + 20,
            }
        })


        enemySpawnName.spawnerType1();

        console.log(timess, "temps resttttttttttttttt ");



    
        enemiesSpawn1.push(enemySpawnName);
        movables.push(enemySpawnName);


        numberOfSpawnType1++;

      

    
}
