// Canva removal function
function hideCanvas() {
    const canvas = document.getElementById('gameCanvas');
    const menu = document.getElementById('gameMenu');
    const pauseMenu = document.getElementById('pauseWindow');
    if (canvas) {
        canvas.style.display = 'none';
        menu.style.display = 'flex';
        pauseMenu.style.display = 'none';
    }
}
 
// Fonction for exiting the game
function exit() {
    window.location.reload();
}

// Fonction for the pause menu
function togglePause() {
    isPaused = !isPaused;
    const pauseWindow = document.getElementById('pauseWindow');
    if (isPaused) {
        cancelAnimationFrame(animationId);
        pauseWindow.style.display = 'flex';
    } else {
        pauseWindow.style.display = 'none';
        animationId = requestAnimationFrame(move);
    }
}

// Fonction for resume the game
function resume() {
    togglePause();
}

let optionSelected = false

// Fonction for the option menu from the game
function optionFromGame() {
    optionSelected = true;
    const option = document.getElementById('optionMenuFromGame');
    const pauseWindow = document.getElementById('pauseWindow');
    pauseWindow.style.display = 'none';
    option.style.display = 'flex';
}

// Fonction for saving the option from the game
function saveOptionFromGame() {
    const option = document.getElementById('optionMenuFromGame');
    const menu = document.getElementById('pauseWindow');

    //Bind
    const up = document.getElementById('up').value
    const down = document.getElementById('down').value
    const left = document.getElementById('left').value
    const right = document.getElementById('right').value

    if (up !== "") {
        upKey = up;
    }
    if (down !== "") {
        downKey = down;
    }
    if (left !== "") {
        leftKey = left;
    }
    if (right !== "") {
        rightKey = right;
    }

    option.style.display = 'none';
    menu.style.display = 'flex';
    optionSelected = false;
}

// Fonction for the option menu from the main menu
function optionFromMenu() {
    optionSelected = true;
    const menu = document.getElementById('gameMenu');
    const option = document.getElementById('optionMenuFromMenu');
    menu.style.display = 'none';
    option.style.display = 'flex';
}

// Fonction for saving the option from the main menu
function saveOptionFromMenu() {
    const option = document.getElementById('optionMenuFromMenu');
    const menu = document.getElementById('gameMenu');

    //Bind
    const up = document.getElementById('upMenu').value
    const down = document.getElementById('downMenu').value
    const left = document.getElementById('leftMenu').value
    const right = document.getElementById('rightMenu').value

    if (up !== "") {
        upKey = up;
    }
    if (down !== "") {
        downKey = down;
    }
    if (left !== "") {
        leftKey = left;
    }
    if (right !== "") {
        rightKey = right;
    }

    option.style.display = 'none';
    menu.style.display = 'flex';
    optionSelected = false;
}

// Fonction for starting the game 
function play() {
    start = true;
    togglePause();
    const canvas = document.getElementById('gameCanvas');
    const menu = document.getElementById('gameMenu');
    const pauseMenu = document.getElementById('pauseWindow');
    if (canvas) {
        canvas.style.display = 'flex';
        menu.style.display = 'none';
        pauseMenu.style.display = 'none';
    }
}

// Fonction for the HUD (life bar)
function drawHUD() {
    const barWidth = 200;
    const barHeight = 10;
    const barPadding = 10;
    const playerMaxHealth = 10; // En fonction de la vie max du player


    const hudWidth = barWidth + 2 * barPadding;
    const hudHeight = barHeight + 2 * barPadding;
    

    c.fillStyle = 'blue'; // Couleur bleue pour le fond
    c.fillRect(0, 0, hudWidth, hudHeight);
    
    c.fillStyle = 'gray';
    c.fillRect(barPadding, barPadding, barWidth, barHeight);
    
    const healthPercentage = player.pointDeVie / playerMaxHealth;
    const healthBarWidth = barWidth * healthPercentage;
    
    c.fillStyle = 'green';
    c.fillRect(barPadding, barPadding, healthBarWidth, barHeight);
        c.strokeStyle = 'black';
    c.strokeRect(barPadding, barPadding, barWidth, barHeight);
}

// Fonction for the visual loosing page
function loosePage() {
    const canvas = document.getElementById('gameCanvas');
    const menu = document.getElementById('gameMenu');
    const loose = document.getElementById('looseMenu');
    if (canvas) {
        canvas.style.display = 'none';
        menu.style.display = 'none';
        loose.style.display = 'flex';
    }
}
