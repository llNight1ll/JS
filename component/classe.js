class Sprite {
    constructor({position, velocity, image, frames = {max: 1}, sprites,size = {s: 1},pointDeVie, player}) {
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
        this.player = player

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

}