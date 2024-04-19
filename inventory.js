const inventory = {
    enemies: [
        { name: "Enemy 1", level: 1, health: 100, character: "/Survival-Jam-JS/assets/img/ennemy.png" },
        { name: "Enemy 2", level: 2, health: 150, character: "/Survival-Jam-JS/assets/img/ennemy.png" },
        { name: "Enemy 3", level: 3, health: 200, character: "/Survival-Jam-JS/assets/img/ennemy.png" },
        { name: "Enemy 4", level: 4, health: 250, character: "/Survival-Jam-JS/assets/img/ennemy.png" },
        { name: "Enemy 5", level: 5, health: 300, character: "/Survival-Jam-JS/assets/img/ennemy.png" }
    ],
    
    addEnemy(enemy) {
        this.enemies.push(enemy);
    },
    
    removeEnemy(index) {
        this.enemies.splice(index, 1);
    },
  
    showEnemies() {
        console.log("Inventory Enemies:");
        this.enemies.forEach((enemy, index) => {
            console.log(`Index ${index}: ${enemy.name}, Level ${enemy.level}, Health ${enemy.health}, Character ${enemy.character}`);
        });
    }
};

inventory.initBaseEnemies = function() {
    this.enemies = [
        { name: "Enemy 1", level: 1, health: 100, character: "/Survival-Jam-JS/assets/img/ennemy.png" },
        { name: "Enemy 2", level: 2, health: 150, character: "/Survival-Jam-JS/assets/img/ennemy.png" },
        { name: "Enemy 3", level: 3, health: 200, character: "/Survival-Jam-JS/assets/img/ennemy.png" },
        { name: "Enemy 4", level: 4, health: 250, character: "/Survival-Jam-JS/assets/img/ennemy.png" },
        { name: "Enemy 5", level: 5, health: 300, character: "/Survival-Jam-JS/assets/img/ennemy.png" }
    ];
};

inventory.initBaseEnemies();

inventory.showEnemies();


const newEnemy = { name: "New Enemy", level: 3, health: 180, character: "/Survival-Jam-JS/assets/img/ennemy.png" };
inventory.addEnemy(newEnemy);


inventory.showEnemies();
