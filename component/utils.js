function hideCanvas() {
    const canvas = document.getElementById('gameCanvas');
    const menu = document.getElementById('gameMenu');
    const pauseMenu = document.getElementById('pauseWindow');
    console.log(canvas);
    if (canvas) {
        canvas.style.display = 'none';
        menu.style.display = 'flex';
        pauseMenu.style.display = 'none';
    }
}



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

function play() {
    const menu = document.getElementById('gameMenu');
    menu.style.display = 'none';
    const canvas = document.getElementById('gameCanvas');
    canvas.style.display = 'block';
    isPaused = false;
    animationId = requestAnimationFrame(move); // ICI METTRE LA LOGIQUE DE SPAWN DU JEU
}

function resume() {
    togglePause();
}

let optionSelected = false

function optionFromGame() {
    optionSelected = true;
    const option = document.getElementById('optionMenuFromGame');
    const pauseWindow = document.getElementById('pauseWindow');
    pauseWindow.style.display = 'none';
    option.style.display = 'flex';
}

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

function optionFromMenu() {
    optionSelected = true;
    const menu = document.getElementById('gameMenu');
    const option = document.getElementById('optionMenuFromMenu');
    menu.style.display = 'none';
    option.style.display = 'flex';
}

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