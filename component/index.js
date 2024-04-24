const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

let upKey = 'z';
let leftKey = 'q';
let downKey = 's';
let rightKey = 'd';



canvas.width = 1020
canvas.height = 510
let start = false;
let animationId;


const collisionMap = []
for (let i = 0; i < collision.length; i += 70) {
    collisionMap.push(collision.slice(i, 70 + i))
}

const contour = []
const offset = {
    //Start position of the player
    x: -410,
    y: -890
}

//Convert mapcollision as Boundary
collisionMap.forEach((ligne, i) => {
    ligne.forEach((symbol, j) => {
      if (symbol === 2102)
        contour.push(
          new Boundary({
            position: {
              x: j * Boundary.width + offset.x,
              y: i * Boundary.height + offset.y
            }
          })
        )
    })
})

//Declare all sprites
const image = new Image()
image.src = "./img/map.png"

const foregroundImage = new Image()
foregroundImage.src = "./img/foreground.png"

const playerDownImage = new Image()
playerDownImage.src = "./img/playerfullbot.png"

const playerUpImage = new Image()
playerUpImage.src = "./img/playerfullup.png"

const playerRightImage = new Image()
playerRightImage.src = "./img/playerfullright.png"

const playerLeftImage = new Image()
playerLeftImage.src = "./img/playerfullleft.png"


const playerDownAttackImage = new Image()
playerDownAttackImage.src = "./img/playerfullbotattak.png"

const playerUpAttackImage = new Image()
playerUpAttackImage.src = "./img/playerfullupattak.png"

const playerRightAttackImage = new Image()
playerRightAttackImage.src = "./img/playerfullrightattak.png"

const playerLeftAttackImage = new Image()
playerLeftAttackImage.src = "./img/playerfullleftattak.png"

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


const bossDown = new Image()
bossDown.src = "./img/boss1Down.png"

const bossUp = new Image()
bossUp.src = "./img/boss1Up.png"

const bossRight = new Image()
bossRight.src = "./img/boss1Right.png"

const bossLeft = new Image()
bossLeft.src = "./img/boss1Left.png"



//Create player
const player = new Sprite ({
    position: {
        x: canvas.width / 2 - 528 / 4 / 2,
        y: canvas.height / 2 - 157 / 2,
    },
    image: playerDownImage,
    frames: {
        max: 4,
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        down: playerDownImage,
        right: playerRightImage,
        
        attackUp: playerUpAttackImage,
        attackLeft:playerLeftAttackImage,
        attackDown:playerDownAttackImage,
        attackRight:playerRightAttackImage,

    },
    size: {
        s : 0.5 ,
    },
    pointDeVie : 10
})



// First boss not implemented
const boss = new Boss ({
    position: {
        x: canvas.width / 2 - 528 / 4 / 2 -50,
        y: canvas.height / 2 - 157 / 2 - 50,
    },
    image: bossDown,
    frames: {
        max: 3,
    },
    sprites: {
        up: bossUp,
        left: bossLeft,
        down: bossDown,
        right: bossRight,
    },
    size: {
        s : 1.5 ,
    },
    pointDeVie : 20,
    player: player ,
    rogneY: 0
})

//Create background
const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})

//Create foreground
const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
})

//Declare the state of controls
const keys = {
    z: {
        presser: false
    },
    q: {
        presser: false
    },
    s: {
        presser: false
    },
    d: {
        presser: false
    },
    rightClick: {
        presser: false
    },
    f: {
        presser : false
    }
}



//Initialize time after each an ennemy spawn
let timeToSpawn = 0


//Create Spawner
createSpawnerEnnemyType1(position = {x: canvas.width / 2 - 528 / 4 / 2 +300, y: canvas.height / 2 - 157 / 2 -0.5})

createSpawnerEnnemyType2(position = {x: canvas.width / 2 - 528 / 4 / 2 -300, y: canvas.height / 2 - 157 / 2 -0.5})

createSpawnerEnnemyType3(position = {x: canvas.width / 2 - 528 / 4 / 2 +300, y: canvas.height / 2 - 157 / 2 -0.5+ - 200})


//Add the movable's element in the table wich contains them
movables.push(background, ...contour, foreground)
function rectangleCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.position.x + rectangle1.width * rectangle1.size.s >= rectangle2.position.x && 
        
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width  && 
       
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height && 
        
        rectangle1.position.y + rectangle1.height  * rectangle1.size.s >= rectangle2.position.y
    )
}

let isPaused = false;

//Function that makes the game run
function move () {

    if (start===false) {
        cancelAnimationFrame(animationId);
        hideCanvas();
    }
    if (isPaused) {
        return;
    }
    animationId = window.requestAnimationFrame(move)
    
    //Display game's elements

    background.draw()

    SpawnerArrayType1.forEach((spawner) => {
        spawner.spawnerType1(spawner.position);
        if(spawner.isGenerating == true){
            spawner.drawSpawnerAnimation()
        } else {
            spawner.draw()
        }
       })

       
    SpawnerArrayType2.forEach((spawner) => {
        spawner.spawnerType2(spawner.position);
        if(spawner.isGenerating == true){
            spawner.drawSpawnerAnimation()
        } else {
            spawner.draw()
        }

       })


       
    SpawnerArrayType3.forEach((spawner) => {
        spawner.spawnerType3(spawner.position);
        if(spawner.isGenerating == true){
            spawner.drawSpawnerAnimation()
        } else {
            spawner.draw()
        }

       })
  
    contour.forEach((boundari) => {
        boundari.draw()
    })







    timeToSpawn+= 1

    if (timeToSpawn >= 500) {
        timeToSpawn = 0
    }
   

    
    //Activate allies,ennemies and dead ennemies

    ennemies1.forEach((enemy) => {
        enemy.activateEnemy()
    })
    ennemies2.forEach((enemy) => {
        enemy.activateEnemy()
    })
    ennemies3.forEach((enemy) => {
        enemy.activateEnemy()
    })

    
    deadEnnemies1.forEach((enemy) => {
        enemy.activateEnemy()
    })
    deadEnnemies2.forEach((enemy) => {
        enemy.activateEnemy()
    })
    deadEnnemies3.forEach((enemy) => {
        enemy.activateEnemy()
    })
   


    allies1.forEach((ally) => {
        ally.activateEnemy()

    })
    allies2.forEach((ally) => {
        ally.activateEnemy()
    })
    allies3.forEach((ally) => {
        ally.activateEnemy()
    })
    

    //Draw player while attacking or moving
    if (!player.attacking) {
        player.draw()

    } else {
        player.drawAttack()
    }
    foreground.draw()

    let moving = true
    player.moving = false
    //Actions in function of key which is pressing
    if (keys.z.presser) {
        player.orientation = "up"
        player.moving = true
        if(keys.rightClick.presser) {
            player.attacking = true
            player.image = player.sprites.attackUp
        } else {
            player.image = player.sprites.up

        }        for (let i = 0; i < contour.length; i++) {
            const boundari = contour[i]
            if(
                rectangleCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundari, 
                        position: {
                        x: boundari.position.x,
                        y: boundari.position.y + 5
                    }}
                })
            ) {
                moving = false
                break
            }
        }

        if (moving) {
            movables.forEach((movable) => {
                movable.position.y += 5
            })
            player.realPostion.y +=5
        }


    } else if (keys.q.presser) {
        player.orientation = "left"

        player.moving = true
        if(keys.rightClick.presser) {
            player.attacking = true
            player.image = player.sprites.attackLeft
        } else {
            player.attacking = false
            player.image = player.sprites.left

        }        for (let i = 0; i < contour.length; i++) {
            const boundari = contour[i]
            if(
                rectangleCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundari, 
                        position: {
                        x: boundari.position.x + 5,
                        y: boundari.position.y
                    }}
                })
            ) {
                moving = false
                break
            }
        }

        if (moving) {
            movables.forEach((movable) => {
                movable.position.x += 5
                player.realPostion.x +=5

            })
        }

    } else if (keys.s.presser) {
        player.orientation = "bot"
        player.moving = true
        if(keys.rightClick.presser) {
            player.attacking = true
            player.image = player.sprites.attackDown
        } else {
            player.attacking = false
            player.image = player.sprites.down

        }
        for (let i = 0; i < contour.length; i++) {
            const boundari = contour[i]
            if(
                rectangleCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundari, 
                        position: {
                        x: boundari.position.x,
                        y: boundari.position.y - 5
                    }}
                })
            ) {
                moving = false
                break
            }
        }

        if (moving) {
            movables.forEach((movable) => {
                movable.position.y -= 5
                player.realPostion.y -=5

            })
        }

    } else if (keys.d.presser) {
        player.orientation = "right"

        player.moving = true
        if(keys.rightClick.presser) {
            player.attacking = true
            player.image = player.sprites.attackRight
        } else {
            player.attacking = false
            player.image = player.sprites.right

        }        for (let i = 0; i < contour.length; i++) {
            const boundari = contour[i]
            if(
                rectangleCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundari, 
                        position: {
                        x: boundari.position.x - 5,
                        y: boundari.position.y
                    }}
                })
            ) {
                moving = false
                break
            }
        }

        if (moving) {
            movables.forEach((movable) => {
                movable.position.x -= 5
                player.realPostion.x -=5

            })
        }
        

    } else if (keys.rightClick.presser && !keys.d.presser  && !keys.q.presser  && !keys.z.presser  && !keys.s.presser){
        player.attacking = true
        if (player.orientation == "up") {
            player.image = player.sprites.attackUp

        }  else if (player.orientation == "bot") {
            player.image = player.sprites.attackDown
            
        } else if (player.orientation == "left") {
            player.image = player.sprites.attackLeft

            
        } else if (player.orientation == "right") {
            player.image = player.sprites.attackRight

            
        }
    }

    drawHUD(player.maxLife,player.maxXp);
    
    if (player.pointDeVie <= 0) {
        window.cancelAnimationFrame(animationId)
        hideCanvas();
        loosePage();
    }
    if (player.xp >= 10 && player.xp < 50) {
        player.maxLife = 15
        player.maxXp = 50
        player.level = 1
        player.damage = 1.2
    }
    if (player.xp >= 50 && player.xp < 75) {
        player.maxLife = 20
        player.maxXp = 75
        player.level = 2
        player.damage = 1.5
    }
    if (player.xp >= 75 && player.xp < 100) {
        player.maxLife = 25
        player.maxXp = 100
        player.level = 3
        player.damage = 1.8
    }
    if (player.xp >= 100 && player.xp < 150) {
        player.maxLife = 30
        player.maxXp = 150
        player.level = 4
        player.damage = 2
    }
    if (player.xp >= 150) {
        player.maxLife = 40
        player.maxXp = 150
        player.level = 5
    }
}

if (isPaused === false){
    togglePause();
    animationId = requestAnimationFrame(move);
}


//Create listener of which keys of the keyboard are up or down
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case upKey:
            keys.z.presser = true;
            break;
        case leftKey:
            keys.q.presser = true;
            break;
        case downKey:
            keys.s.presser = true;
            break;
        case rightKey:
            keys.d.presser = true;
            break;               
        case 'f':
        case 'F':
            keys.f.presser = true;
            break;
    }
});


window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case upKey:
            keys.z.presser = false;
            break;
        case leftKey:
            keys.q.presser = false;
            break;
        case downKey:
            keys.s.presser = false;
            break;
        case rightKey:
            keys.d.presser = false;
            break;
        case 'f':
        case 'F':
            keys.f.presser = false;
            break;
    }
});

window.addEventListener('mousedown', function(event) {
    if (event.button === 0) {
        keys.rightClick.presser = true;
    }
})

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (optionSelected === false){
            togglePause();
        }
    }
});
