
// Class formerly defined to implement mob spell (not used)
class OldEnemy {
    constructor({position, velocity, image, frames = {max: 1}, sprites,size = {s: 1},pointDeVie, rogneY,imageWidth,imageHeight,attackWidth}) {
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
        this.spell = new Spell({
        position: {
            x: this.position.x,
            y: this.position.y
        },
    })
        this.cooldownTimer = 0;
        this.positionCooldown = 5000; // 5 secondes de cooldown

    }



    draw() {
        this.imageWidth = 39
        this.imageHeight = 61
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



        // Mettre à jour les autres propriétés si nécessaire (par exemple, frames, etc.)
        // ...

        // Si vous avez une logique pour arrêter l'animation ou gérer d'autres états, mettez-la ici
        // ...
    }

    moveIntoPlayer() {
        const playerCenter = player.position.y + player.height / 2;

        const dx = player.position.x - this.position.x;
        const dy = playerCenter - this.position.y - this.height/2;

        const distanceFromPlayer = Math.sqrt(dx * dx + dy * dy);
        this.distance = distanceFromPlayer;
        if (this.spell.launch) {
            this.spell.draw();
            this.spell.move();
        }
        if (this.distance > 350) {
            this.distanceAttack(player.position);
        } else {
            if (this.spell.touched) {
                this.spell.touched = false;
                player.pointDeVie--;
                this.spell.updatedPosition(this);
                this.spell.distance = 0;
                this.spell.launch = false;
            } else {
                if (this.spell.distance > 300) {
                    this.spell.target.x = playerPosition.x;
                    this.spell.target.y = playerPosition.y;
                    this.spell.updatedPosition(this);
                    this.spell.distance = 0;
                    this.spell.launch = false;
                }
            }
            if ((distanceFromPlayer > 0 && distanceFromPlayer<350) || distanceFromPlayer > 750) {
                this.moving = true;
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
                this.moving = false
            }
        }
    }

    distanceAttack(playerPosition) {
        this.attacking = true;
        this.spell.launch = true;
        // if (this.orientation == "up") {
        //     this.image = this.sprites.attackUp;
        // } else if (this.orientation == "right") {
        //     this.image = this.sprites.attackRight;
        // } else if (this.orientation == "left") {
        //     this.image = this.sprites.attackLeft;
        // } else if (this.orientation == "bot") {
        //     this.image = this.sprites.attackDown;
        // }
        this.spell.move();
        if (this.spell.touched) {
            this.spell.touched = false;
            player.pointDeVie--;
            this.spell.updatedPosition(this);
            this.spell.distance = 0;
            this.spell.launch = false;
        } else {
            if (this.spell.distance > 300) {
                this.spell.target.x = playerPosition.x;
                this.spell.target.y = playerPosition.y;
                this.spell.updatedPosition(this);
                this.spell.distance = 0;
                this.spell.launch = false;
            }
        }
    }
}