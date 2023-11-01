const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Read the existing catalgoue from existing-prod-catalogue.json
const existing_catalogue = JSON.parse(fs.readFileSync('existing-prod-catalogue.json', 'utf8'));

function generateProductBarCode(index) {
    const UPC_CODE = [
        900762258230, 893339600894,
        847463578789, 623296935551, 
        311733309941, 305343662336,
        911309682654, 679235425409,
        609918813933, 646365405786,
        726117998183, 295831848161,
        323950583264, 536972988706,
        377425604572, 328004765801,
        363967697998, 105042020969,
        780814444022, 518442815088
    ];

    const EAN_CODE = [
        8234493047798, 6639733387962,
        4960883644455, 4389729427272,
        6601234512341, 1001234512344,
        1041234512340, 1081234512346,
        1121234512349, 1161234512345,
        1201234512348, 1241234512344,
        1321234512343, 1361234512349,
        1401234512342, 1441234512348,
        1481234512344, 1521234512347,
        1571234512342, 1621234512344
    ];

    const OUTLIERS_CODE = [
        63499963642, 99295527094,
        54125064438, 74071624168,
        30391772388, 57254697517,
        84271777758, 76195823197,
        68156104224, 47623801246,
        80264628339, 84281917196,
        30038452817, 63905990169,
        66746712954, 85465687975,
        15722872781, 48056637055,
        16535153270, 31919250825
    ];

    const records = [UPC_CODE, EAN_CODE];
    // Math.round(Math.random() * records.length)
    return records[index % records.length][Math.floor(index / records.length)];
}

// function generateRandomProductUnits() {
//     const productUnits = [
//         "UNIT/UNITS",
//         "UNIT/DOZEN",
//         "WEIGHT/GRAM",
//         "WEIGHT/KILOGRAM",
//         "WEIGHT/TONNE",
//         "WEIGHT/POUND",
//         "WEIGHT/OUNCE",
//         "VOLUME/MILLILITRE",
//         "VOLUME/LITRE",
//         "VOLUME/GALLON",
//         "LENGTH/MILLIMETRE",
//         "LENGTH/CENTIMETRE",
//         "LENGTH/METRE",
//         "LENGTH/KILOMETRE",
//         "LENGTH/INCH",
//         "LENGTH/FOOT",
//         "LENGTH/YARD",
//         "LENGTH/MILE",
//     ];

//     return productUnits[Math.round(Math.random() * productUnits.length)];
// }

// function generateRandomProductQuantity() {
//     return Math.round(Math.random() * 1500 + 500);
// }

const dummyShopItemCatalogue = [];

for (let i = 0; i < existing_catalogue.length; i++) {
    const itemInstance = existing_catalogue[i];
    const itemBarCode = generateProductBarCode(i);

    itemInstance['id'] = uuidv4();
    itemInstance['productBarCode'] = itemBarCode;

    dummyShopItemCatalogue.push(itemInstance);
}

fs.writeFileSync('shop-item-catalogue.json', JSON.stringify(dummyShopItemCatalogue, null, 2));
