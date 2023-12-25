const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

function getPromotionType() {
    const possibleType = ["cash-discount", "percentage-discount"];
    return possibleType[Math.floor(Math.random() * possibleType.length)];
}

function generateRandomPromotionName() {
    const promName = ["New Year", "New onboarding", "Summer Deals", "Winter Deals", "Black Friday", "Christmas", "Holiday Season"];
    return promName[Math.floor(Math.random() * promName.length)];
}

const promDescriptions = {
    "New Year": [
        "Celebrate the dawn of a new year with exclusive deals and exciting offers!",
        "Kick off the year with a bang! Enjoy special discounts and promotions for a limited time.",
        "Embrace the New Year with fantastic savings. Explore our special promotions today!"
    ],
    "New onboarding": [
        "Join our community and experience a seamless onboarding process with extra perks and benefits!",
        "New members, rejoice! Unlock exclusive advantages as you onboard with us.",
        "Embark on your journey with us and enjoy special privileges for new members."
    ],
    "Black Friday": [
        "Don't miss out on the biggest shopping day of the year! Unbeatable discounts and deals await you on Black Friday.",
        "Get ready for the ultimate shopping spree! Dive into the best Black Friday deals and savings.",
        "Black Friday is here, and so are incredible offers! Shop now and save big on your favorite items."
    ],
    "Christmas": [
        "Spread the holiday cheer with our festive promotions! Discover joyous deals to make your Christmas merrier.",
        "'Tis the season of giving! Explore our Christmas specials and find the perfect gifts for your loved ones.",
        "Celebrate the magic of Christmas with exclusive promotions and heartwarming savings."
    ],
    "Holiday Season": [
        "Make your holidays unforgettable with our exclusive promotions! Discover special deals that add joy to your festive season.",
        "Celebrate the holidays in style! Explore our Holiday promotions and treat yourself to delightful savings and surprises.",
        "This holiday season, indulge in the spirit of giving and receiving. Enjoy our festive promotions and spread the joy!"
    ],
    "Summer Deals": [
        "Beat the heat with our sizzling Summer Deals! Dive into refreshing discounts and cool savings on your favorite products.",
        "Make your summer brighter with our hot Summer Deals! From beach essentials to outdoor gear, find everything you need at unbeatable prices.",
        "Sizzle in style with our Summer Deals! Discover amazing offers on summer must-haves and enjoy the season to the fullest."
    ],
    "Winter Deals": [
        "Embrace the chill with our cozy Winter Deals! Warm up to exclusive discounts on winter essentials and seasonal delights.",
        "Let it snow with our Winter Deals! Find the perfect gifts and winter essentials at prices that will warm your heart.",
        "Experience the magic of winter with our frosty Winter Deals! Enjoy savings on cold-weather favorites and make the season merry and bright."
    ]
    // Add more descriptions for each promotionName as needed
};

function generatePromotionDescription(promotion,i) {
    return promDescriptions[promotion][i%3];
}

function generateRandomDiscountPercent() {
    return Math.floor(Math.random() * 7) + 3;  // Gives a number between 3-9
}

function generateRandomDiscountAmount() {
    return Math.floor(Math.random() * 13) + 3;  // Gives a number between 3-15
}

const data = [];

for (let i = 0; i < 10; i++) {
    const promNames = generateRandomPromotionName();
    const entry = {
        id: uuidv4(), // This is the UUID
        name: promNames,
        description: generatePromotionDescription(promNames, i),
        discountAmount: generateRandomDiscountAmount(),
        discountPercent: generateRandomDiscountPercent(),
        promotionType: getPromotionType(),
    };
    data.push(entry);
}

// console.log(JSON.stringify(data, null, 2));
fs.writeFileSync('shop-promotions.json', JSON.stringify(data, null, 2));
