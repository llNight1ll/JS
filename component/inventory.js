// Définir des constantes pour les types d'objets
const ITEM_TYPES = {
    FOOD: 'Food',
    WATER: 'Water',
    MEDICINE: 'Medicine'
};

// Créer un objet pour stocker les données de l'inventaire
let inventory = [];

// Fonction pour ajouter un élément à l'inventaire
function addItem(itemType, itemQuantity) {
    let itemName;

    switch(itemType) {
        case 'Food':
            itemName = "Canned";
            break;
        case 'Water':
            itemName = "Bottled";
            break;
        case 'Medicine':
            itemName = "Kit";
            break;
        default:
            console.log("Type d'article non valide!");
        return;
    }

    // Vérifier si la quantité est valide
    if (!isNaN(itemQuantity) && itemQuantity > 0) {
        // Ajouter l'élément à l'inventaire
        inventory.push({ type: itemType, name: itemName, quantity: itemQuantity });
        console.log(`${itemQuantity} ${itemType}(s) added successfully!`);
    } else {
        console.log("Quantité non valide! Veuillez entrer un numéro valide.");
    }
}

// Fonction pour afficher l'inventaire
function showInventory() {
    let inventoryList = "Inventory:\n";

    // Parcourir chaque élément de l'inventaire et le formatter
    inventory.forEach(item => {
        inventoryList += `${item.name}: ${item.quantity}\n`;
    });

    // Afficher l'inventaire dans la console
    console.log(inventoryList);
}
