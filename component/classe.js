const movables = [];
let ennemies1 = [];
let ennemies2 = [];
let ennemies3 = [];
let allies1 = [];
let allies2 = [];
let allies3 = [];

let deadEnnemies1 = [];

let deadEnnemies2 = []

let deadEnnemies3 = []

const SpawnerArrayType1 = [];
const SpawnerArrayType2 = [];
const SpawnerArrayType3 = [];
let timess  = 0;


class Sprite {
    constructor({position, velocity, image, frames = {max: 1}, sprites,size = {s: 1},pointDeVie}) {
        this.size = size
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0, elapsed: 0, attackFrameVal : 0, elapsedAttack :0,}
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.moving = false
        this.attacking = false
        this.sprites = sprites
        this.orientation = ""
        this.alive = true
        this.pointDeVie = pointDeVie
        this.maxLife = pointDeVie
        this.getHit = false
        this.endAttack = false
        this.attackingNumber = 0
        this.realPostion = {x: -410, y: -890}
        this.gap = 20
        this.defaultGap = 20
        this.score = 0
        this.xp = 0
        this.maxXp = 10
        this.level = 0
        this.damage = 1
    }

    draw() {
        c.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max * this.size.s, 
            this.image.height* this.size.s
        )

        if (!this.moving) {
            return
        }

        if (this.frames.max > 1) {
            this.frames.elapsed ++
        }

        if (this.frames.elapsed %10 === 0) {
            if (this.frames.val < this.frames.max - 1) {
                this.frames.val++
            } else {
                this.frames.val = 0
            }
        }
    }


    drawAttack() {

        

        c.drawImage(
            this.image,
            this.frames.attackFrameVal * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max * this.size.s, 
            this.image.height* this.size.s
        )

        if (this.frames.max > 1) {
            this.frames.elapsedAttack++
        }

        if (this.frames.elapsedAttack %10 === 0) {
            if (this.frames.attackFrameVal < this.frames.max - 1) {    
                this.frames.attackFrameVal++
            } else {
                this.attacking = false
                this.frames.attackFrameVal = 0
                keys.rightClick.presser = false
                return

            }
        }
    }

  
    


}

class Boundary {
    static width = 48
    static height = 48
    constructor({position}) {
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw() {
        c.fillStyle = "rgba(255, 0, 0, 0.5)"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        
    }
}

class Enemy {
    constructor({position, velocity, image, frames = {max: 1}, sprites,size = {s: 1},pointDeVie, rogneY,imageWidth,imageHeight,attackWidth,enemyType}) {
        this.size = size
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0, elapsed: 0, attackFrameVal : 0, elapsedAttack :0,}
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.moving = false
        this.attacking = false
        this.sprites = sprites
        this.orientation = "bot"
        this.alive = true
        this.pointDeVie = pointDeVie
        this.getHit = false
        this.endAttack = false
        this.attackingNumber = 0
        this.rogneY = rogneY
        this.defaultRogne = 0
        this.distance = 50
        this.rogneY = rogneY
        this.imageWidth = imageWidth
        this.imageHeight = imageHeight
        this.attackWidth = attackWidth
        this.hit = false
        this.IsExpulsed = false
        this.expulsionSpeedX = 4
        this.expulsionSpeedY = 4
        this.cooldown = 0
        this.hasAttacked = false
        this.delayBeforeChangingOrientation = 0
        this.nombreAleatoire
        this.enemyType =  enemyType
        this.dectect = false
        this.canBePicked = false 
        this.deadTime = 0
        this.IsRevive =false
        this.positionInArray = 0
        this.distanceFromEnemy = -1
        this.nearestEnemy;
        this.deltaX;
        this.deltaY;
        this.getFight = false;
        this.isBlocked = false;
        this.delayAfterCollision = 0




    }

    drawPoint(){
        if (this.enemyType == 1) {
            c.drawImage(
                this.sprites.point,
                0,
                0,
                45,
                61,
                this.position.x,
                this.position.y,
                45 * this.size.s, 
                61* this.size.s
            )
        } else if (this.enemyType == 2) {
            c.drawImage(
                this.sprites.point,
                0,
                0,
                52,
                69,
                this.position.x,
                this.position.y,
                52 * this.size.s, 
                69* this.size.s
            )
        } else if (this.enemyType == 3){
            c.drawImage(
                this.sprites.point,
                0,
                0,
                52,
                69,
                this.position.x,
                this.position.y,
                48 * this.size.s, 
                90* this.size.s
            )
        }
       
    }
   
   
    

    draw() {
       
        c.drawImage(
            this.image,
            this.frames.val * this.width,
            this.defaultRogne,
            this.imageWidth,
            this.imageHeight,
            this.position.x,
            this.position.y,
            this.imageWidth * this.size.s, 
            this.imageHeight* this.size.s
        )

        if (!this.moving) {
            return
        }

        if (this.frames.max > 1) {
            this.frames.elapsed ++
        }

        if (this.frames.elapsed %10 === 0) {
            if (this.frames.val < this.frames.max - 1) {
                this.frames.val++
            } else {
                this.frames.val = 0
            }
        }
    }


    drawAttack() {
      
        

        c.drawImage(
            this.image,
            this.frames.attackFrameVal* this.attackWidth,
            this.defaultRogne,
            this.attackWidth,
            this.imageHeight,
            this.position.x,
            this.position.y,
            this.attackWidth * this.size.s, 
            this.imageHeight* this.size.s
        )

        if (this.frames.max > 1) {
            this.frames.elapsedAttack++
        }

        if (this.frames.elapsedAttack %10 === 0) {
            if (this.frames.attackFrameVal < this.frames.max - 1) {    
                this.frames.attackFrameVal++
            } else {
                this.attacking = false
                this.frames.attackFrameVal = 0
                this.hasAttacked = true
                this.cooldown = 0
                return

            }
        }
    }

    collisionDetectionWplayer(){
        return  rectangleCollision({
            rectangle1: player,
            rectangle2: {
                ...this, 
                position: {
                x: this.position.x,
                y: this.position.y + 5
            }}
        })
    }

    collisionDetectionWenemy(){
        return  rectangleCollision({
            rectangle1:{
                position: {
                x: this.nearestEnemy.position.x,
                y: this.nearestEnemy.position.y + 5
                },
                width : this.width,
                height : this.height,
                size : {
                    s : 1
                }
        },
            rectangle2: {
                ...this, 
                position: {
                x: this.position.x,
                y: this.position.y + 5
            }}
        })
    }


    detectionCollisonWmapUp(){

        for (let i = 0; i < contour.length; i++) {
            const boundari = contour[i]
            if(
                rectangleCollision({
                    rectangle1:{...this},
                    rectangle2: {
                        ...boundari, 
                        position: {
                        x: boundari.position.x,
                        y: boundari.position.y + 5
                    }}
                })
            ) {
                this.moving = false
                this.isBlocked = true
                break
            }
        }
    }
    
    detectionCollisonWmapDown(){

        for (let i = 0; i < contour.length; i++) {
            const boundari = contour[i]
            if(
                rectangleCollision({
                    rectangle1:{...this},
                    rectangle2: {
                        ...boundari, 
                        position: {
                        x: boundari.position.x,
                        y: boundari.position.y - 5
                    }}
                })
            ) {
                this.moving = false
                this.isBlocked = true
                break
            }
        }
    }
 
    
    detectionCollisonWmapLeft(){

        for (let i = 0; i < contour.length; i++) {
            const boundari = contour[i]
            if(
                rectangleCollision({
                    rectangle1:{...this},
                    rectangle2: {
                        ...boundari, 
                        position: {
                        x: boundari.position.x + 5,
                        y: boundari.position.y
                    }}
                })
            ) {
                this.moving = false
                this.isBlocked = true
                break
            }
        }
    }
 
    
    detectionCollisonWmapRight(){

        for (let i = 0; i < contour.length; i++) {
            const boundari = contour[i]
            if(
                rectangleCollision({
                    rectangle1:{...this},
                    rectangle2: {
                        ...boundari, 
                        position: {
                        x: boundari.position.x - 5,
                        y: boundari.position.y
                    }}
                })
            ) {
                this.moving = false
                this.isBlocked = true
                break
            }
        }
    }
 
 

    getHitDetection(){
    
        if(!this.IsRevive){
             if(
                this.collisionDetectionWplayer() && player.frames.elapsedAttack %10 === 0 && player.attacking && player.frames.attackFrameVal >= player.frames.max - 1
             ) {
                    this.getHit = true
                    this.pointDeVie -= player.damage
                    this.IsExpulsed = true
                    if(this.pointDeVie == 0) {
                        player.xp += 5
                        player.score += 10
                        this.alive = false
                     }
                }

        } else {
            if(
                this.collisionDetectionWenemy() && this.nearestEnemy.frames.elapsedAttack %10 === 0 && this.nearestEnemy.attacking 
                && this.nearestEnemy.frames.attackFrameVal >= this.nearestEnemy.frames.max - 1
             ) {
                    this.getHit = true
                    this.pointDeVie += -1
                    this.IsExpulsed = true
                    if(this.pointDeVie == 0) {
                        this.alive = false
                     }
                }


        }
       
    }

    hitDetection(){
        if(!this.IsRevive){
            if(
                this.collisionDetectionWplayer() && this.frames.elapsedAttack %10 === 0 && this.attacking && this.frames.attackFrameVal >= this.frames.max - 1
            ) {
                this.hit = true
                player.pointDeVie += -1
                if(player.pointDeVie == 0) {
                    player.alive = false
                }
            }
    
            
        } else {

            if(
                this.collisionDetectionWenemy() && this.frames.elapsedAttack %10 === 0 && this.attacking && this.frames.attackFrameVal >= this.frames.max - 1
            ) {
                this.hit = true
                this.nearestEnemy.pointDeVie += -1
                if(this.nearestEnemy.pointDeVie == 0) {
                    this.nearestEnemy.alive = false
                    player.xp += 3
                    player.score += 5
                }
            }
    
        }
       
    }


    expulsionAnimation() {
        const expulsionDirection = { x: 2, y: -2 };


        if(player.orientation == "up"){
            expulsionDirection.x = 0.5
            expulsionDirection.y = -4

        }else  if(player.orientation == "bot"){
            expulsionDirection.x = 0.5  
            expulsionDirection.y = 4
            
        } else  if(player.orientation == "right"){
            expulsionDirection.x = 2
            expulsionDirection.y = -2
            
        } else  if(player.orientation == "left"){
            expulsionDirection.x = -2
            expulsionDirection.y = -2
            
        }
     

      
        this.position.x += expulsionDirection.x * this.expulsionSpeedX;
        this.position.y += expulsionDirection.y * this.expulsionSpeedY;

        if(this.expulsionSpeedX <= 0 && this.expulsionSpeedY <= 0){
            this.IsExpulsed = false;
            this.expulsionSpeedX = 4;
            this.expulsionSpeedY = 4;
            return
        }

        this.expulsionSpeedX -= 0.1
        this.expulsionSpeedY -= 0.2



    }

    moveRandomly(){

        if (this.delayBeforeChangingOrientation == 0 || this.isBlocked){
            var min = 0; 
            var max = 3; 

            var plage = max - min + 1;

            var tableauAleatoire = new Uint32Array(1);

            window.crypto.getRandomValues(tableauAleatoire);

            this.nombreAleatoire = min + tableauAleatoire[0] % plage;
        }
        this.delayBeforeChangingOrientation++
        
        
            if (this.nombreAleatoire == 0) {
                this.detectionCollisonWmapUp()
                if(this.isBlocked){
                    this.orientation = "bot";

                    this.position.y += 10
                    this.isBlocked = false
  
                    this.nombreAleatoire = 1


                } else {
                    this.orientation = "up";

                    this.position.y -=2 
                }
       
            } else if (this.nombreAleatoire == 1) {
                this.detectionCollisonWmapDown()
                if(this.isBlocked){
                    this.orientation = "up";

                    this.position.y -= 10
                    this.isBlocked = false

                    this.nombreAleatoire = 0



                } else {
                    this.orientation = "bot";

                    this.position.y +=2

                }



            } else if (this.nombreAleatoire == 2) {
                this.detectionCollisonWmapRight()
                if(this.isBlocked){
                    this.orientation = "left";

                    this.position.x -=10
                    this.isBlocked = false

                    this.nombreAleatoire = 3



                } else {
                    this.orientation = "right";

                    this.position.x +=2

                }



            } else if (this.nombreAleatoire == 3) {
                this.detectionCollisonWmapLeft()
                if(this.isBlocked){
                    this.orientation = "right";
                    this.position.x +=10
                    this.isBlocked = false
 
                    this.nombreAleatoire = 2


                } else {
                    this.orientation = "left";

                    this.position.x -=2

                }



        }
        if (this.delayBeforeChangingOrientation >= 200){
            this.delayBeforeChangingOrientation = 0;
        }
    }
        
    



    moveIntoPlayer() {
        const playerCenter = player.position.y + player.height / 2;

        const dx = player.position.x - this.position.x;
        const dy = playerCenter - this.position.y - this.height/2;

        const distanceFromPlayer = Math.sqrt(dx * dx + dy * dy);
        this.distance = distanceFromPlayer;
        if(this.delayAfterCollision == 100){
            this.delayAfterCollision = 0
        }

        if (distanceFromPlayer > 0 && distanceFromPlayer<200) {

            
            if (this.orientation == "left") {
                this.detectionCollisonWmapLeft()
                if(this.isBlocked){
                    this.delayAfterCollision++
                    this.orientation = "right";
                    this.position.x +=10
                    this.isBlocked = false
 
                    this.nombreAleatoire = 2

                    this.dectect = false;
                    
                    this.delayAfterCollision++

                    this.moving = true
                    this.moveRandomly()
                    return

                }
                
            } else if (this.orientation == "up"){
                this.detectionCollisonWmapUp()
                if(this.isBlocked){
                    this.delayAfterCollision++
                    this.orientation = "bot";
    
                    this.position.y += 10
                    this.isBlocked = false
    
                    this.nombreAleatoire = 1
                    this.dectect = false;
                    this.delayAfterCollision++

                    this.moving = true
                    this.moveRandomly()
                    return
    
                }
            } else if (this.orientation == "right") {
                this.detectionCollisonWmapRight()
                if(this.isBlocked){
                    this.orientation = "left";

                    this.position.x -=10
                    this.isBlocked = false

                    this.nombreAleatoire = 3
                    this.dectect = false;

                    this.moving = true
                    this.delayAfterCollision++

                    this.moveRandomly()
                    return


                } 
            }  else if (this.orientation == "bot") {
                this.detectionCollisonWmapDown()
                if(this.isBlocked){
                    this.orientation = "up";

                    this.position.y -= 10
                    this.isBlocked = false

                    this.nombreAleatoire = 0
                    this.dectect = false;

                    this.moving = true
                    this.delayAfterCollision++


                    this.moveRandomly()
                    return

                }

            }
            
        }
        

        if (distanceFromPlayer > 0 && distanceFromPlayer<200 && !this.isBlocked && this.delayAfterCollision == 0) {            
            this.moving = true;
            this.dectect = true;
            if(Math.sqrt(dx *dx)  > Math.sqrt(dy*dy)  +  20) {
                const vx = (dx / distanceFromPlayer) * 2;
                this.position.x += vx;
                if (vx >= 0){
                    this.orientation = "right"
                    
                } else {
                    this.orientation = "left"
                }



            }  else if ( Math.sqrt(dy*dy) >  Math.sqrt(dx *dx) + 20) {

                const vy = (dy / distanceFromPlayer) * 2;
                this.position.y += vy;

                if (vy >= 0){
                    this.orientation = "bot"
                } else {
                    this.orientation = "up"
                }



            }  else if ( Math.sqrt(dy*dy) <  Math.sqrt(dx *dx) + 20 &&  Math.sqrt(dx *dx)  < Math.sqrt(dy*dy)  +  20 ) {

                this.moving = true
                const vx = (dx / distanceFromPlayer) * 2;
                this.position.x += vx;

            }



        } else {
            this.dectect = false;

            this.moving = true

            this.moveRandomly()

        }
    }


    searchFight(){
        if(!this.getFight){

            this.getFight = true
            ennemies1.forEach((enemy) => {
                const enemyCenter = enemy.position.y + enemy.imageHeight / 2;

                const dx = enemy.position.x - this.position.x;
                const dy = enemyCenter - this.position.y - this.height/2;
                const distanceFromEnemy = Math.sqrt(dx * dx + dy * dy);
                if(this.distanceFromEnemy < 0 ){
                    this.distanceFromEnemy = distanceFromEnemy;
                    this.nearestEnemy = enemy;
                    this.deltaX = dx;
                    this.deltaY = dy
    
                } else if(this.distanceFromEnemy > distanceFromEnemy){
                    this.distanceFromEnemy = distanceFromEnemy;
                    this.nearestEnemy = enemy;
                    this.deltaX = dx;
                    this.deltaY = dy
    
                }
    
            })
    
            ennemies2.forEach((enemy) => {
                const enemyCenter = enemy.position.y + enemy.imageHeight / 2;

                const dx = enemy.position.x - this.position.x;
                const dy = enemyCenter - this.position.y - this.height/2;
                const distanceFromEnemy = Math.sqrt(dx * dx + dy * dy);
                if(this.distanceFromEnemy < 0 ){
                    this.distanceFromEnemy = distanceFromEnemy;
                    this.nearestEnemy = enemy;
                    this.deltaX = dx;
                    this.deltaY = dy
    
                } else if(this.distanceFromEnemy > distanceFromEnemy){
                    this.distanceFromEnemy = distanceFromEnemy;
                    this.nearestEnemy = enemy;
                    this.deltaX = dx;
                    this.deltaY = dy
    
                }
            })
    
    
            ennemies3.forEach((enemy) => {
                const enemyCenter = enemy.position.y + enemy.imageHeight / 2;

                const dx = enemy.position.x - this.position.x;
                const dy = enemyCenter - this.position.y - this.height/2;
                const distanceFromEnemy = Math.sqrt(dx * dx + dy * dy);
                if(this.distanceFromEnemy < 0 ){
                    this.distanceFromEnemy = distanceFromEnemy;
                    this.nearestEnemy = enemy;
                    this.deltaX = dx;
                    this.deltaY = dy
    
                } else if(this.distanceFromEnemy > distanceFromEnemy){
                    this.distanceFromEnemy = distanceFromEnemy;
                    this.nearestEnemy = enemy;
                    this.deltaX = dx;
                    this.deltaY = dy
    
                }
    
            })

        } 
    }

    moveIntoEnnemy(){

        if(!this.nearestEnemy.alive) {        

            this.getFight = false
        }
       
        const enemyCenter = this.nearestEnemy.position.y + this.nearestEnemy.imageHeight / 2;
        const x = this.nearestEnemy.position.x - this.position.x;
        const y = enemyCenter - this.position.y - this.height/2;
        const distanceFromEnemy = Math.sqrt(x * x + y * y);
        this.deltaX = x;
        this.deltaY = y;
        this.distanceFromEnemy = distanceFromEnemy


        if (this.distanceFromEnemy > 0 && this.nearestEnemy.alive) {
            this.moving = true;
            this.dectect = true;
            if(Math.sqrt(this.deltaX *this.deltaX)  > Math.sqrt(this.deltaY*this.deltaY)  +  20) {
                const vx = (this.deltaX / this.distanceFromEnemy) * 3;
                this.position.x += vx;
                if (vx >= 0){
                    this.orientation = "right"
                    
                    
                } else {
                    this.orientation = "left"

                }



            }  else if ( Math.sqrt(this.deltaY*this.deltaY) >  Math.sqrt(this.deltaX *this.deltaX) + 20) {

                const vy = (this.deltaY / this.distanceFromEnemy) * 3;
                this.position.y += vy;

                if (vy >= 0){
                    this.orientation = "bot"

                } else {
                    this.orientation = "up"
                }



            }  else if ( Math.sqrt(this.deltaY*this.deltaY) <  Math.sqrt(this.deltaX*this.deltaX) + 20 &&  Math.sqrt(this.deltaX *this.deltaX)  < Math.sqrt(this.deltaY*this.deltaY)  +  20) {

                this.moving = true
                const vx = (this.deltaX / this.distanceFromEnemy) * 3;
                this.position.x += vx;

            }



        } else {
            this.dectect = false;

            this.moving = true
            this.position.x = player.position.x + 10
            this.position.y = player.position.y

       }
        

    }
    dead(){

        if(this.deadTime < 400) {
            this.canBePicked = true
            c.drawImage(
                this.sprites.dead,
                0,
                0,
                100,
                100,
                this.position.x,
                this.position.y,
                100, 
                100
            )
            this.revive()
        } else {
            this.canBePicked = false
        }
      
        this.deadTime++

    }

    revive(){
        if(this.collisionDetectionWplayer() && keys.f.presser) {
            this.alive = true
            this.defaultRogne = this.rogneY
            this.pointDeVie = 2
            this.IsRevive = true
            if (this.enemyType== 1) {
                allies1.push(this)
            }
            if (this.enemyType== 2) {
                allies2.push(this)
            }
            if (this.enemyType== 3) {
                allies3.push(this)
            }

           

            
        }
        deadEnnemies1 = deadEnnemies1.filter(deadEnemy =>!deadEnemy.IsRevive)
        deadEnnemies2 = deadEnnemies2.filter(deadEnemy =>!deadEnemy.IsRevive)
        deadEnnemies3 = deadEnnemies3.filter(deadEnemy =>!deadEnemy.IsRevive)



    }



    activateEnemy(){
        allies1 = allies1.filter(ally => ally.alive)

        allies2 = allies2.filter(ally => ally.alive)

        allies3 = allies3.filter(ally => ally.alive)
       
      

        if(this.alive && !this.IsRevive) {

            this.getHitDetection()
           
            if (this.IsExpulsed == false) {
    
                if (this.hasAttacked = true){
                    this.cooldown += 2
        
                }
                this.moveIntoPlayer()
                if(this.orientation == "up"){
                    this.image = this.sprites.up
        
                } else if (this.orientation == "right"){
                    this.image = this.sprites.right
                
                } else if (this.orientation == "left"){
                    this.image = this.sprites.left
                }  else if (this.orientation == "bot"){
                    this.image = this.sprites.down
                } 
        
                if(this.distance < 80 && this.cooldown >= 500) {
                    this.attacking = true
                    this.hitDetection()
                    
                    if(this.orientation == "up"){
        
                      
                        this.image = this.sprites.attackUp; 
                
            
                    } else if (this.orientation == "right"){
        
                      
                        this.image = this.sprites.attackRight;
                        
                        
                    
                    } else if (this.orientation == "left"){
        
                      
                        this.image = this.sprites.attackLeft;
                        
        
                    }  else if (this.orientation == "bot"){
        
                       
                        this.image = this.sprites.attackDown;
                        
                    }
                    this.drawAttack();
        
        
                
                } else {
                    this.attacking = false
                    this.draw()
                    if (this.dectect){
                        this.drawPoint()
                    }
        
                }

    
            } else {
                this.expulsionAnimation()
                this.draw()

            }
           
    
    
        } 
        if(!this.alive && !this.IsRevive){

            this.dead()
            ennemies1.forEach((enemy) => {
                if(!enemy.alive){
                    console.log(player.xp)
                    deadEnnemies1.push(enemy)
                }
            })

            ennemies2.forEach((enemy) => {
                if(!enemy.alive){
                    console.log(player.xp)
                    deadEnnemies2.push(enemy)
                }
            })

            ennemies3.forEach((enemy) => {
                if(!enemy.alive){
                    console.log(player.xp)
                    deadEnnemies3.push(enemy)
                }
            })
            ennemies1 = ennemies1.filter(ennemi => ennemi.alive)
            ennemies2 = ennemies2.filter(ennemi => ennemi.alive)
            ennemies3 = ennemies3.filter(ennemi => ennemi.alive)

        }

        if(this.alive && this.IsRevive){
            this.searchFight()
            this.getHitDetection()
           
            if (this.IsExpulsed == false) {
    
                if (this.hasAttacked = true){
                    this.cooldown += 2
        
                }
                this.moveIntoEnnemy()
                if(this.orientation == "up"){
                    this.image = this.sprites.up
        
                } else if (this.orientation == "right"){
                    this.image = this.sprites.right
                
                } else if (this.orientation == "left"){
                    this.image = this.sprites.left
                }  else if (this.orientation == "bot"){
                    this.image = this.sprites.down
                } 

        
                if(this.distance < 80 && this.cooldown >= 500) {
                    this.attacking = true
                    this.hitDetection()
                    
                    if(this.orientation == "up"){
        
                      
                        this.image = this.sprites.attackUp; 
                
            
                    } else if (this.orientation == "right"){
        
                      
                        this.image = this.sprites.attackRight;
                        
                        
                    
                    } else if (this.orientation == "left"){
        
                      
                        this.image = this.sprites.attackLeft;
                        
        
                    }  else if (this.orientation == "bot"){
        
                       
                        this.image = this.sprites.attackDown;
                        
                    }
                    this.drawAttack();
        
        
                
                } else {
                    this.attacking = false
                    this.draw()
                    if (this.dectect){
                        this.drawPoint()
                    }
        
                }

    
            } else {
                this.expulsionAnimation()
                this.draw()

            }
        }

    }
    

}

class SpawnerType1 {
    constructor({position,}) {   
        this.position = position,
        this.frames = { val: 0, elapsed: 0, flashFrameVal : 0, elapsedflash :0, max : 4}
        this.isGenerating = true


    }

    timeot(){
        if (timess == 3000){
            timess = 0;
        } else {
            timess += 1
        }

    }

    draw() {
        const spawnerImage = new Image()
        spawnerImage.src = "./img/portail.png"
        c.drawImage(
            spawnerImage,
            0,
            246,
            69,
            104,
            this.position.x,
            this.position.y,
            69, 
            104
        )
    }


    drawSpawnerAnimation(){
        const spawnerImage = new Image()
        spawnerImage.src = "./img/portail.png"
        c.drawImage(
            spawnerImage,
            this.frames.flashFrameVal* 69,
            0,
            69,
            350,
            this.position.x,
            this.position.y-246,
            69, 
            350
        )

        if (this.frames.max > 1) {
            this.frames.elapsedflash++
        }

        if (this.frames.elapsedflash %20 === 0) {
            if (this.frames.flashFrameVal < this.frames.max - 1) {    
                this.frames.flashFrameVal++
            } else {
                this.isGenerating = false
                this.frames.flashFrameVal = 0
                return

            }
        }
    }


    spawnerType1(position) { 
        


        if (timeToSpawn > 0){
            return
        
        } else {
            if(ennemies1.length < 3){
                this.isGenerating = true

                const enemyName = createEnnemyType1(position)
            
                enemyName.positionInArray = ennemies1.length;
                ennemies1.push(enemyName);
                movables.push(enemyName);
                numberOfType1++;
                enemyName.activateEnemy();
            }


            
        }
    
        
    }

         
}


class SpawnerType2 {
    constructor({position,}) {   
        this.position = position,
        this.frames = {val: 0, elapsed: 0, flashFrameVal : 0, elapsedflash :0, max : 4}
        this.isGenerating = true
    }

    timeot(){
        if (timess == 3000){
            timess = 0;
        } else {
            timess += 1
        }

    }

    draw() {
        const spawnerImage = new Image()
        spawnerImage.src = "./img/portail2.png"
       
        c.drawImage(
            spawnerImage,
            0,
            246,
            69,
            104,
            this.position.x,
            this.position.y,
            69, 
            104
        )
    }

    drawSpawnerAnimation(){
        const spawnerImage = new Image()
        spawnerImage.src = "./img/portail2.png"
        c.drawImage(
            spawnerImage,
            this.frames.flashFrameVal* 69,
            0,
            69,
            350,
            this.position.x,
            this.position.y-246,
            69, 
            350
        )

        if (this.frames.max > 1) {
            this.frames.elapsedflash++
        }

        if (this.frames.elapsedflash %20 === 0) {
            if (this.frames.flashFrameVal < this.frames.max - 1) {    
                this.frames.flashFrameVal++
            } else {
                this.isGenerating = false
                this.frames.flashFrameVal = 0
                return

            }
        }
    }

    spawnerType2(position) { 
        


            if (timeToSpawn > 0){
               return
        
            } else {

            if(ennemies2.length < 3) {
                this.isGenerating = true

                const enemyName = createEnnemyType2(position)
    
                enemyName.positionInArray = ennemies2.length;
    
                ennemies2.push(enemyName);
                movables.push(enemyName);
                numberOfType2++;
                enemyName.activateEnemy();
            }

            }
     
    }    
        
}

class SpawnerType3 {
    constructor({position}) {   
        this.position = position,
        this.frames = { val: 0, elapsed: 0, flashFrameVal : 0, elapsedflash :0, max : 4}
        this.isGenerating = true
    }

    timeot(){
        if (timess == 3000){
            timess = 0;
        } else {
            timess += 1
        }

    }


    spawnerType3(position) { 
        
            if (timeToSpawn > 0){
               return
        
            } else {
            
            if(ennemies3.length < 3){
                this.isGenerating = true

                const enemyName = createEnnemyType3(position)

                enemyName.positionInArray = ennemies3.length;
    
                ennemies3.push(enemyName);
                movables.push(enemyName);
                numberOfType3++;
                enemyName.activateEnemy();
            }
            
            }
    
        
    }

    draw() {
        const spawnerImage = new Image()
        spawnerImage.src = "./img/portail3.png"
        c.drawImage(
            spawnerImage,
            0,
            246,
            69,
            104,
            this.position.x,
            this.position.y,
            69, 
            104
        )
    }

    drawSpawnerAnimation(){
        const spawnerImage = new Image()
        spawnerImage.src = "./img/portail3.png"
        c.drawImage(
            spawnerImage,
            this.frames.flashFrameVal* 69,
            0,
            69,
            350,
            this.position.x,
            this.position.y-246,
            69, 
            350
        )

        if (this.frames.max > 1) {
            this.frames.elapsedflash++
        }

        if (this.frames.elapsedflash %10 === 0) {
            if (this.frames.flashFrameVal < this.frames.max - 1) {    
                this.frames.flashFrameVal++
            } else {
                this.isGenerating = false
                this.frames.flashFrameVal = 0
                return

            }
        }
    }


        
}



// Class defined for game bosses (not implemented)
class Boss {
    constructor({position, velocity, image, frames = {max: 1}, sprites,size = {s: 1},pointDeVie, rogneY}) {
        this.size = size
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0, elapsed: 0, attackFrameVal : 0, elapsedAttack :0,}
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.moving = false
        this.attacking = false
        this.sprites = sprites
        this.orientation = "bot"
        this.alive = true
        this.pointDeVie = pointDeVie
        this.getHit = false
        this.endAttack = false
        this.attackingNumber = 0
        this.rogneY = rogneY
        this.mouvementOrientation = "vertical"
        this.OldmouvementOrientation = ""


    }



    draw() {
        c.drawImage
        c.drawImage(
            this.image,
            this.frames.val * this.width,
            this.rogneY,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max * this.size.s, 
            this.image.height* this.size.s
        )

        if (!this.moving) {
            return
        }

        if (this.frames.max > 1) {
            this.frames.elapsed ++
        }

        if (this.frames.elapsed %150 === 0) {
            if (this.frames.val < this.frames.max - 1) {
                this.frames.val++
            } else {
                this.frames.val = 0
            }
        }
    }


    hitDetection(){
        if(
            rectangleCollision({
                rectangle1: player,
                rectangle2: {
                    ...this, 
                    position: {
                    x: this.position.x,
                    y: this.position.y + 5
                }}
            }) && player.frames.elapsedAttack %10 === 0 && player.attacking && player.frames.attackFrameVal >= player.frames.max - 1
        ) {
            this.getHit = true
            this.pointDeVie += -1
            if(this.pointDeVie == 0) {
                this.alive = false
            }
        }

    }

    moveIntoPlayer() {
        this.OldmouvementOrientation = this.mouvementOrientation
        const playerCenter = player.position.y + player.height / 2;

        const dx = player.position.x - this.position.x;
        const dy = playerCenter - this.position.y - this.height/2;

        const distanceFromPlayer = Math.sqrt(dx * dx + dy * dy);

        if (distanceFromPlayer > 0 && distanceFromPlayer<400) {
            if(dx*dx >= dy*dy) {
                this.mouvementOrientation == "horizontal"
                const vx = (dx / distanceFromPlayer) * 2;
                this.position.x += vx;
                if (vx >= 0){
                    this.orientation = "right"
                    
                } else {
                    this.orientation = "left"
                }



            } else if ( Math.sqrt(dy*dy) >  Math.sqrt(dx *dx)) {
                this.mouvementOrientation == "vertical"

                const vy = (dy / distanceFromPlayer) * 2;
                this.position.y += vy;

                if (vy >= 0){
                    this.orientation = "bot"
                } else {
                    this.orientation = "up"
                }



            }

        }
    }

    moveSet1(){
        if (boss.position.x < initialBossX + 200) {
            boss.image = boss.sprites.right
            boss.moving = true
            boss.position.x += 1;
        }
    }

}

// Class defined for game mob spells (not implemented)
class Spell {
    constructor({position}) {
        this.size = 5
        this.velocity =4
        this.position = this.spawn(position)
        this.target = {x: player.position.x, y: player.position.y}
        this.touched = false
        this.launch = false 
        this.orientation = "bot"
        this.endAttack = false
        this.width= 10
        this.height= 10
        this.distance = 0
    }


    spawn(position) {
        return {
            x: position.x,
            y: position.y
        }
    }

    updatedPosition(enemyPosition) {
        this.position.x = enemyPosition.position.x;
        this.position.y = enemyPosition.position.y;
    }

    move() {
        this.draw();
        const dx = this.target.x - this.position.x;
        const dy = this.target.y - this.position.y;

        const distanceToPlayer = Math.sqrt(dx * dx + dy * dy);

        const vx = (dx / distanceToPlayer) * this.velocity;
        const vy = (dy / distanceToPlayer) * this.velocity;

        this.position.x += vx;
        this.distance ++
        this.position.y += vy;
        this.distance ++
        this.hitDetection()
    }



    draw() {
        c.fillStyle = "red";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }


    hitDetection() {
        const collisionDetected = rectangleCollision({
            rectangle1: player,
            rectangle2: {
                ...this,
                position: {
                    x: this.position.x,
                    y: this.position.y
                }
            }
        });

        if (collisionDetected) {
            if (player.pointDeVie === 0) {
                player.alive = false;
            }
            return this.touched = true;
        } else {
            return false; // Retourne false sinon
        }
    }

}
