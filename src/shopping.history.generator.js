const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Read the users from users.json
const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));

function generateRandomShopName() {
    const prefixes = ["Super", "Mega", "Ultra", "Best", "Top", "Prime", "Elite", "Supreme"];
    const names = ["Mart", "Store", "Shop", "Outlet", "Bazaar", "Emporium"];
    return prefixes[Math.floor(Math.random() * prefixes.length)] + ' ' + names[Math.floor(Math.random() * names.length)];
}

function generateRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
}

function generateRandomTotalShopping() {
    return (Math.random() * 200 + 50).toFixed(2);  // Gives a price between $50.00 and $250.00
}

const shoppingHistories = [];

for (let i = 0; i < 100; i++) {
    const shopper = users[Math.floor(Math.random() * users.length)];

    const shoppingId = uuidv4();
    const shopperId = shopper.id;
    const shoppedDate = generateRandomDate(new Date(2020, 0, 1), new Date());
    const shopName = generateRandomShopName();
    const totalShoppedItem = Math.floor(Math.random() * 7) + 3;
    const totalShopping = generateRandomTotalShopping();

    const shoppingHistory = {
        shoppingId,
        shopperId,
        shoppedDate,
        shopName,
        totalShoppedItem,
        totalShopping
    };

    shoppingHistories.push(shoppingHistory);
}

fs.writeFileSync('shopping-history.json', JSON.stringify(shoppingHistories, null, 2));
