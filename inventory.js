const inventory = {
    enemies: [
        { name: "Enemy 1", level: 1, health: 100, character: "/path/to/enemy1.png" },
        { name: "Enemy 2", level: 2, health: 150, character: "/path/to/enemy2.png" },
        { name: "Enemy 3", level: 3, health: 200, character: "/path/to/enemy3.png" },
        { name: "Enemy 4", level: 4, health: 250, character: "/path/to/enemy4.png" },
        { name: "Enemy 5", level: 5, health: 300, character: "/path/to/enemy5.png" }
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
        { name: "Enemy 1", level: 1, health: 100, character: "/path/to/enemy1.png" },
        { name: "Enemy 2", level: 2, health: 150, character: "/path/to/enemy2.png" },
        { name: "Enemy 3", level: 3, health: 200, character: "/path/to/enemy3.png" },
        { name: "Enemy 4", level: 4, health: 250, character: "/path/to/enemy4.png" },
        { name: "Enemy 5", level: 5, health: 300, character: "/path/to/enemy5.png" }
    ];
};

inventory.initBaseEnemies();

inventory.showEnemies();


const newEnemy = { name: "New Enemy", level: 3, health: 180, character: "/path/to/newenemy.png" };
inventory.addEnemy(newEnemy);


inventory.showEnemies();
