const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


function generateRandomBarCode(idx) {
    const bar_codes = [
        "JZQTVLUI",
        "HGTO0ZDU",
        "ED875631",
        "PO9JPDHM",
        "6WRZ65XS",
        "82WHWI86",
        "F7NQLKPZ",
        "DIHG5ZYZ",
        "7LWXU93X",
        "WWJP2QB3"
    ]
    // return Math.random().toString(36).substring(2, 10).toUpperCase();
    return bar_codes[idx];
}

function generateRandomShopName() {
    const prefixes = ["Super", "Mega", "Ultra", "Best", "Top", "Prime", "Elite", "Supreme"];
    const names = ["Mart", "Store", "Shop", "Outlet", "Bazaar", "Emporium"];
    return prefixes[Math.floor(Math.random() * prefixes.length)] + ' ' + names[Math.floor(Math.random() * names.length)];
}

function generateShopLocation() {
    const citiesAndCountries = [
        {"city": "Kathmandu", "country": "Nepal"},
        {"city": "Mumbai", "country": "India"},
        {"city": "Bangkok", "country": "Thailand"},
        {"city": "Tokyo", "country": "Japan"},
        {"city": "New York", "country": "USA"},
        {"city": "London", "country": "UK"},
        {"city": "Paris", "country": "France"},
        {"city": "Sydney", "country": "Australia"},
        {"city": "Cape Town", "country": "South Africa"},
        {"city": "Rio de Janeiro", "country": "Brazil"},
        {"city": "Beijing", "country": "China"},
        {"city": "Dubai", "country": "UAE"},
        {"city": "Istanbul", "country": "Turkey"},
        {"city": "Moscow", "country": "Russia"},
        {"city": "Toronto", "country": "Canada"},
        {"city": "Mexico City", "country": "Mexico"},
        {"city": "Buenos Aires", "country": "Argentina"},
        {"city": "Cairo", "country": "Egypt"},
        {"city": "Rome", "country": "Italy"},
        {"city": "Berlin", "country": "Germany"}
    ];

    const draw = citiesAndCountries[Math.floor(Math.random() * citiesAndCountries.length)];
    return `${draw.city}, ${draw.country}`;
}

function generateRandomIconURL() {
    return `https://picsum.photos/id/${Math.floor(Math.random() * 90 + 10)}/200/300`;
}

function generateRandomColorHash() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

function generateRandomMaxItemScan() {
    return Math.floor(Math.random() * 7) + 3;  // Gives a number between 3-9
}

const data = [];

for (let i = 0; i < 10; i++) {
    const entry = {
        shopId: uuidv4(), // This is the UUID
        shopBarCode: generateRandomBarCode(i),
        shopName: generateRandomShopName(),
        shopDisplayIcon: generateRandomIconURL(),
        shopLocation: generateShopLocation(),
        shopThemeColor: generateRandomColorHash(),
        maxItemScan: generateRandomMaxItemScan()
    };
    data.push(entry);
}

fs.writeFileSync('shops.json', JSON.stringify(data, null, 2));
