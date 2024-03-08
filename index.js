const canvas = document.querySelector('canvas');

const context = canvas.getContext('2d');

canvas.width = 1920
canvas.height = 1080

context.fillStyle ='white'
context.fillRect(0, 0, canvas.width, canvas.height)

const bckg = new Image()
bckg.src = './map.png'


const playerImage = new Image()
playerImage.src = './player.png'


class Sprite {
    constructor({position, velocity, image, frames = {max : 1 }}){
        this.position = position
        this.image = image
        this.frames = {...frames, val : 0}

        this.image.onload = () =>{
            this.width = this.image.width /this.frames.max
            this.height = this.image.height
        }
    }
    draw(line){
        context.drawImage(
            this.image,
            this.frames.val * this.width,
            line,
            this.image.width/ this.frames.max,
            this.image.height/ this.frames.max,
            this.position.x,  
            this.position.y,
            this.image.width/ this.frames.max,
            this.image.height/this.frames.max,
            
        )
        if (this.frames.val < 3) {
            this.frames.val++
         } else {
            this.frames.val = 0
         }

    }
}


const background = new Sprite({
    position : {
        x : 0,
        y : 0
    },
    image : bckg
})

const player = new Sprite({
    position : {
        x: canvas.width/2,
        y: canvas.height/2,

    },
    image : playerImage,
    frames : {
        max : 4
    }

})

const keys = {
    z : {
        pressed : false
    },

    s : {
        pressed : false
    },

    q : {
        pressed : false
    },

    d : {
        pressed : false
    }
}



function animate() {
    window.requestAnimationFrame(animate)

    background.draw(0)
    /* context.drawImage(
            playerImage, 
            //crop position
            0, 
            0,
            playerImage.width/ 4,
            playerImage.height/ 4,
            960,
            540,
            172,
            172,
        )
          /*   playerImage.width - 3*(playerImage.width / 4),
            playerImage.height / 4, */ 
            
    

     if (keys.z.pressed) {
         background.position.y = background.position.y + 1;
         player.draw(516);
    }
    if (keys.s.pressed) {
        background.position.y = background.position.y - 1;
        player.draw(344);

   }
    if (keys.q.pressed) {
         background.position.x = background.position.x + 1;
         player.draw(172);

    }
    if (keys.d.pressed) {
        background.position.x = background.position.x -1;
        player.draw(0);

   }
   if  (!keys.z.pressed && !keys.s.pressed && !keys.q.pressed && !keys.d.pressed) {
    player.draw(344);
   }
}
animate() 

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'z': 
            keys.z.pressed = true
            animate()
             break
        
        case 's': 
            keys.s.pressed = true
            animate()
            break
        
        case 'q': 
            keys.q.pressed = true
            animate()

            break
        
        case 'd': 
            keys.d.pressed = true
            animate()

            break
    }
        
})


window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'z': 
            keys.z.pressed = false
            animate()

            break
        
        case 's': 
            keys.s.pressed = false
            animate()

            break
        
        case 'q': 
            keys.q.pressed = false
            animate()

            break
        
        case 'd': 
            keys.d.pressed = false
            animate()

            break
    }
        
})


