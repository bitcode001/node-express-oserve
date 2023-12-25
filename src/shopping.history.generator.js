const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Read the users from users.json
const users = require('./users.json', 'utf8');
const shops = require('./shops.json', 'utf8');
const products = require('./shop-item-catalogue.json', 'utf8');

const m_months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function generateRandomShopName() {
    const prefixes = ["Super", "Mega", "Ultra", "Best", "Top", "Prime", "Elite", "Supreme"];
    const names = ["Mart", "Store", "Shop", "Outlet", "Bazaar", "Emporium"];
    return prefixes[Math.floor(Math.random() * prefixes.length)] + ' ' + names[Math.floor(Math.random() * names.length)];
}

function generateRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
}

function generateRandomTotalShopping() {
    return Number((Math.random() * 200 + 50).toFixed(2));  // Gives a price between $50.00 and $250.00
}

const shoppingHistories = [];

for (let i = 0; i < 100; i++) {
    const shopper = users[Math.floor(Math.random() * users.length)];

    // const shoppingId = uuidv4();
    // const shopperId = shopper.id;
    // const shoppedDate = generateRandomDate(new Date(2020, 0, 1), new Date());
    // const shopName = generateRandomShopName();
    // const totalShoppedItem = Math.floor(Math.random() * 7) + 3;
    // const totalShopping = generateRandomTotalShopping();

    const current_stores = shops.map(el => el.shopName);

    const title = current_stores[Math.floor(Math.random() * current_stores.length)];
    const subTitle = (Math.floor(Math.random() * 12) + 4).toString();
    const date = Math.round(Math.random() * 32 + 1).toString();
    const price = generateRandomTotalShopping();
    const month = m_months[Math.floor(Math.random() * m_months.length)];

    const shoppingHistory = {
        title,
        subTitle,
        date,
        price,
        month,
    };

    shoppingHistories.push(shoppingHistory);
}

fs.writeFileSync('shopping-history.json', JSON.stringify(shoppingHistories, null, 2));
