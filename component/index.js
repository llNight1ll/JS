const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1020
canvas.height = 510

const collisionMap = []
for (let i = 0; i < collision.length; i += 70) {
    collisionMap.push(collision.slice(i, 70 + i))
}

const contour = []
const offset = {
    //positions perso depart
    x: -410,
    y: -890
}

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
console.log(player)


// const boss = new Boss ({
//     position: {
//         x: canvas.width / 2 - 528 / 4 / 2 -50,
//         y: canvas.height / 2 - 157 / 2 - 50,
//     },
//     image: bossDown,
//     frames: {
//         max: 3,
//     },
//     sprites: {
//         up: bossUp,
//         left: bossLeft,
//         down: bossDown,
//         right: bossRight,
//     },
//     size: {
//         s : 1.5 ,
//     },
//     pointDeVie : 20,
//     player: player ,
//     rogneY: 0
// })




const enemy = createEnnemyType3()


const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
})

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
}

const testbor = new Boundary({
    position: {
        x: 400,
        y: 400
    }
})


const movables = [background, ...contour, foreground, enemy]
function rectangleCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.position.x + rectangle1.width * rectangle1.size.s >= rectangle2.position.x && 
        
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width  && 
       
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height && 
        
        rectangle1.position.y + rectangle1.height  * rectangle1.size.s >= rectangle2.position.y
    )
}

function move () {

    window.requestAnimationFrame(move)
    background.draw()
    contour.forEach((boundari) => {
        boundari.draw()
    })
    if(enemy.alive) {
        console.log(enemy.cooldown)
       
        if (enemy.IsExpulsed == false) {

            if (enemy.hasAttacked = true){
                enemy.cooldown += 2
            }

            if(enemy.orientation == "up"){
                enemy.image = enemy.sprites.up
    
            } else if (enemy.orientation == "right"){
                enemy.image = enemy.sprites.right
            
            } else if (enemy.orientation == "left"){
                enemy.image = enemy.sprites.left
            }  else if (enemy.orientation == "bot"){
                enemy.image = enemy.sprites.down
            } 
            enemy.draw()

            enemy.distanceAttack(800,500,350)

            // if(enemy.distance < 80 && enemy.cooldown >= 500) {
            //     enemy.attacking = true
            //     enemy.hitDetection()
            //     console.log("hp du joueur", player.pointDeVie)
                
            //     if(enemy.orientation == "up"){
    
                  
            //         enemy.image = enemy.sprites.attackUp; 
            
        
            //     } else if (enemy.orientation == "right"){
    
                  
            //         enemy.image = enemy.sprites.attackRight;
                    
                    
                
            //     } else if (enemy.orientation == "left"){
    
                  
            //         enemy.image = enemy.sprites.attackLeft;
                    
    
            //     }  else if (enemy.orientation == "bot"){
    
                   
            //         enemy.image = enemy.sprites.attackDown;
                    
            //     }
            //     enemy.drawAttack();
    
    
            
            // } else {
            //     enemy.attacking = false
            //     enemy.imageWidth = 39
            //     enemy.imageHeight = 60
            //     enemy.draw()
    
            // }

        } else {
            enemy.expulsionAnimation()
            enemy.draw()
        }
    }


    console.log("hp des ennemis", enemy.pointDeVie)
    if (!player.attacking) {
        player.draw()
        console.log("nattaque aps")

    } else {
        player.drawAttack()
        console.log("est entrain d'attack")
    }
    foreground.draw()

    let moving = true
    player.moving = false
    enemy.moving = false
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

       enemy.getHitDetection()

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
        enemy.getHitDetection()

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
        enemy.getHitDetection()

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
        enemy.getHitDetection()

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

        enemy.getHitDetection()

    }
}
move()

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'z':
        case 'ArrowUp':
        case 'Z':
            keys.z.presser = true;
            break;
        case 'q':
        case 'ArrowLeft':
        case 'Q':
            keys.q.presser = true;
            break;
        case 's':
        case 'ArrowDown':
        case 'S':
            keys.s.presser = true;
            break;
        case 'd':
        case 'ArrowRight':
        case 'D':
            keys.d.presser = true;
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'z':
        case 'ArrowUp':
        case 'Z':
            keys.z.presser = false;
            break;
        case 'q':
        case 'ArrowLeft':
        case 'Q':
            keys.q.presser = false;
            break;
        case 's':
        case 'ArrowDown':
        case 'S':
            keys.s.presser = false;
            break;
        case 'd':
        case 'ArrowRight':
        case 'D':
            keys.d.presser = false;
            break;
    }
});

window.addEventListener('mousedown', function(event) {
    if (event.button === 0) {
        keys.rightClick.presser = true;
    }
})





