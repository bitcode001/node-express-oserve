const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const app = express();
var cors = require('cors');
const PORT = 3000;

const users = require('./src/users.json', 'utf8');
const shops = require('./src/shops.json', 'utf8');
const products = require('./src/shop-item-catalogue.json', 'utf8');
const shoppingHistories = require('./src/shopping-history.json', 'utf8');
const shopPromotions = require('./src/shop-promotions.json', 'utf8');

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(cors());

// MIDDLEWARE
const SECRET_SALT_KEY = "ondc-secret-salt-101";
// JWT authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_SALT_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) return res.status(400).send({ status: 400, message: 'Invalid request body' });

    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(400).send({ error: 'User not found' });
    }

    const isValidPassword = bcrypt.compareSync(password, user.hashedPassword);
    if (!isValidPassword) {
        return res.status(400).send({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_SALT_KEY, { expiresIn: '30d' });

    // Exclude sensitive data in the response
    const { hashedPassword, password: ppw, ...userWithoutSensitiveData } = user;

    return res.json({ ...userWithoutSensitiveData, token });
});

app.get('/api/products', (req, res) => {
    if(products && products.length > 0) {
        return res.json(products);
    } else {
        res.status(404).json({
            error: "Error getting products from DB"
        })
    }
});

app.get('/api/product/by-barcode/:prodBarId', (req, res) => {
    const reqBarId = req.params.prodBarId;

    const filteredProduct = products.find(el => el.productBarCode == reqBarId);

    if(filteredProduct) {
        return res.json(filteredProduct);
    } else {
        return res.status(404).json({
            error: "Error retrieving product information"
        })
    }
});

// Protected Route: Get all shops
// app.get('/api/shops', authenticateToken, (req, res) => {
app.get('/api/shops', (req, res) => {
    if(shops.length > 0) {
        return res.json(shops);
    } else {
        return res.status(404).json({
            error: "Error getting all shops"
        })
    }
});

app.get('/api/near-by/shops', (req, res) => {
    const nearbyShops = shops.slice(0, 6);

    if(nearbyShops.length > 0) {
        return res.json(nearbyShops);
    } else {
        return res.status(404).json({
            error: "Error getting nearby shops"
        })
    }
})

app.get('/api/shop/by-name/:shopName', (req, res) => {
    const reqName = req.params.shopName;

    const filteredShop = shops.filter(el => el.shopName.toLowerCase().startsWith(reqName.toLowerCase()));
    if(filteredShop.length > 0) {
        return res.json(filteredShop);
    } else {
        return res.status(404).json({
            error: "Error getting shop from given name"
        })
    }
});

// Route: Get specific shop from barcode
app.get('/api/shop/by-barcode/:barcode', (req, res) => {
    const shop_barcode = req.params.barcode;

    const shopFromBarcode = shops.filter(shop => shop.shopBarCode === shop_barcode);
    // console.log('filtered: ', shopFromBarcode);
    if(shopFromBarcode.length > 0) {
        return res.status(200).json(shopFromBarcode[0]);
    } else {
        return res.status(404).json({ error: "Error finding the store ! May be the shop is not registered in our platform yet !" });
    }
});

// Protected Route: Get shopping history for a specific user
// app.get('/api/shopping-history/:userId', authenticateToken, (req, res) => {

app.get('/api/shopping-history', (req, res) => {
    // if (req.user.id !== userId) {
    //     // Ensure user can only fetch their own shopping history
    //     return res.status(403).json({ error: "You can only view your own shopping history." });
    // }

    return res.json(shoppingHistories);
});
app.get('/api/shopping-history/:userId', (req, res) => {
    const userId = req.params.userId;
    // if (req.user.id !== userId) {
    //     // Ensure user can only fetch their own shopping history
    //     return res.status(403).json({ error: "You can only view your own shopping history." });
    // }

    const userShoppingHistory = shoppingHistories.filter(history => history.shopperId === userId);
    return res.json(userShoppingHistory);
});

app.get('/api/ad-promotions', (req, res) => {
    // if (req.user.id !== userId) {
    //     // Ensure user can only fetch their own shopping history
    //     return res.status(403).json({ error: "You can only view your own shopping history." });
    // }

    return res.status(200).json(shopPromotions);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
