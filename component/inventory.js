// L'inventaire
const inventory = {
    allies: [
        { name: "Ally 1", level: 1, health: 100, character: "/Survival-Jam-JS/assets/img/ennemy.png" },
        { name: "Ally 2", level: 2, health: 150, character: "/Survival-Jam-JS/assets/img/ennemy.png" },
        { name: "Ally 3", level: 3, health: 200, character: "/Survival-Jam-JS/assets/img/ennemy.png" },
        { name: "Ally 4", level: 4, health: 250, character: "/Survival-Jam-JS/assets/img/ennemy.png" },
        { name: "Ally 5", level: 5, health: 300, character: "/Survival-Jam-JS/assets/img/ennemy.png" }
    ],
    
    addAlly(ally) {
        this.allies.push(ally);
    },
    
    removeAlly(index) {
        this.allies.splice(index, 1);
    },
  
    showAllies() {
        console.log("Inventory Allies:");
        this.allies.forEach((ally, index) => {
            console.log(`Index ${index}: ${ally.name}, Level ${ally.level}, Health ${ally.health}, Character ${ally.character}`);
        });
    }
};
// Les allies de base
inventory.initBaseAllies = function() {
    this.allies = [
        { name: "Ally 1", level: 1, health: 100, character: "/Survival-Jam-JS/assets/img/ennemy.png" },
        { name: "Ally 2", level: 2, health: 150, character: "/Survival-Jam-JS/assets/img/ennemy.png" },
        { name: "Ally 3", level: 3, health: 200, character: "/Survival-Jam-JS/assets/img/ennemy.png" },
        { name: "Ally 4", level: 4, health: 250, character: "/Survival-Jam-JS/assets/img/ennemy.png" },
        { name: "Ally 5", level: 5, health: 300, character: "/Survival-Jam-JS/assets/img/ennemy.png" }
    ];
};

// Initialisation des allies de base 
inventory.initBaseAllies();

// Afficher les allies
inventory.showAllies();

// Ajout d'un nouvel allie
const newAlly = { name: "New Ally", level: 3, health: 180, character: "/Survival-Jam-JS/assets/img/ennemy.png" };
inventory.addAlly(newAlly);

// Afficher des allies apres ajout 
inventory.showAllies();

// Afficher l'inventaire 
function openInventory() {
    characterModal.style.display = "block";
}

// Ouvrir l'inventaire lorsque la touche "a" est enfoncée
document.addEventListener("keydown", function(event) {
    if (event.key === "a" || event.key === "A") {
        openInventory(); 
    }
});

// Fermer l'inventaire lorsqu'un personnage est sélectionné
confirmButton.addEventListener("click", function() {
    if (selectedCharacter) {
        characterModal.style.display = "none";
        startGame(selectedCharacter);
    } else {
        alert("Veuillez sélectionner un mobs.");
    }
});
