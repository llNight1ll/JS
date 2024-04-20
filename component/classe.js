const movables = [];
const ennemies1 = [];

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
        this.getHit = false
        this.endAttack = false
        this.attackingNumber = 0
        this.realPostion = {x: -410, y: -890}
        this.gap = 20
        this.defaultGap = 20

    }

    draw() {
        c.drawImage
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

        

        c.drawImage
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
        this.distance = 50
        this.rogneY = 60
        this.imageWidth = imageWidth
        this.imageHeight = imageHeight
        this.attackWidth = attackWidth
        this.hit = false
        this.IsExpulsed = false
        this.expulsionSpeedX = 4;
        this.expulsionSpeedY = 4;
        this.cooldown = 0;
        this.hasAttacked = false
        this.delayBeforeChangingOrientation = 0;
        this.nombreAleatoire;
        this.enemyType =  enemyType
        this.dectect = false




    }

    drawPoint(){
        if (this.enemyType == 1) {
            c.drawImage(
                this.sprites.point,
                0,
                0,
                41,
                61,
                this.position.x,
                this.position.y,
                41 * this.size.s, 
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
       
        c.drawImage
        c.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
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
      
        

        c.drawImage
        c.drawImage(
            this.image,
            this.frames.attackFrameVal* this.attackWidth,
            0,
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


    getHitDetection(){
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
            this.IsExpulsed = true
            if(this.pointDeVie == 0) {
                this.alive = false
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
            }) && this.frames.elapsedAttack %10 === 0 && this.attacking && this.frames.attackFrameVal >= this.frames.max - 1
        ) {
            this.hit = true
            player.pointDeVie += -1
            if(player.pointDeVie == 0) {
                player.alive = false
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

        if (this.delayBeforeChangingOrientation == 0){
            var min = 0; 
            var max = 3; 

            var plage = max - min + 1;

            var tableauAleatoire = new Uint32Array(1);

            window.crypto.getRandomValues(tableauAleatoire);

            this.nombreAleatoire = min + tableauAleatoire[0] % plage;
        }
        this.delayBeforeChangingOrientation++
        
        
            if (this.nombreAleatoire == 0) {
                this.orientation = "up";
                this.position.y -=2

       
            } else if (this.nombreAleatoire == 1) {
                this.orientation = "bot";
                this.position.y +=2


            } else if (this.nombreAleatoire == 2) {
                this.orientation = "right";
                this.position.x +=2


            } else if (this.nombreAleatoire == 3) {
                this.orientation = "left";
                this.position.x -=2


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

        if (distanceFromPlayer > 0 && distanceFromPlayer<300) {
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



            }  else if ( Math.sqrt(dy*dy) <  Math.sqrt(dx *dx) + 20 &&  Math.sqrt(dx *dx)  < Math.sqrt(dy*dy)  +  20) {

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



    activateEnemy(){

        if(this.alive) {

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

    }


}

class SpawnerType1 {
    constructor({position}) {   
        this.position = position
    }

    timeot(){
        if (timess == 3000){
            timess = 0;
        } else {
            timess += 1
        }

    }


    spawnerType1(position) { 
        


            if (timeToSpawn > 0){
               return
        
            } else {
            const enemyName = createEnnemyType1(position)
            
        
            ennemies1.push(enemyName);
            movables.push(enemyName);
            numberOfType1++;
            enemyName.activateEnemy();
            }
    
        
    }


     spawnerType2() {

        for(let i = 0; i < 10;i++){
            let enemyName = "enemyType2-" + numberOfType2
            enemyName = createEnnemyType2()
        
            enemies2.push(enemyName);
            numberOfType2++
    
        
        }
    
        console.log(enemies2)
    }


     spawnerType3() {

        for(let i = 0; i < 10;i++){
            let enemyName = "enemyType3-" + numberOfType3
            enemyName = createEnnemyType3()
        
            enemies3.push(enemyName);
            numberOfType3++
    
        
        }
    
        console.log(enemies3)
    
        
    }
    
        
}


class SpawnerType2 {
    constructor({position}) {   
        this.position = position
    }

    timeot(){
        if (timess == 3000){
            timess = 0;
        } else {
            timess += 1
        }

    }


    spawnerType2(position) { 
        


            if (timeToSpawn > 0){
               return
        
            } else {
            const enemyName = createEnnemyType2(position)
            
            
    
        
            ennemies1.push(enemyName);
            movables.push(enemyName);
            numberOfType1++;
            enemyName.activateEnemy();
            }
     
    }    
        
}

class SpawnerType3 {
    constructor({position}) {   
        this.position = position
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
            const enemyName = createEnnemyType3(position)
            
        
            ennemies1.push(enemyName);
            movables.push(enemyName);
            numberOfType1++;
            enemyName.activateEnemy();
            }
    
        
    }


        
}
