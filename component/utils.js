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