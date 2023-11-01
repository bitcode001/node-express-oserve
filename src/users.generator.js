const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

function generateRandomEmail() {
    return "user" + Math.floor(Math.random() * (100 - 20) + 20) + '@' + Math.random().toString(36).substring(3, 5) + '.com';
}

function generateRandomPassword() {
    return Math.random().toString(36).substring(2, 10);
}

function generateRandomUserImage() {
    return `https://example.com/profiles/${Math.floor(Math.random() * 100)}.png`;
}

const users = [];
const saltRounds = 10;

for (let i = 0; i < 10; i++) {
    const password = generateRandomPassword();
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const generatedEmail = generateRandomEmail();

    const user = {
        id: uuidv4(),
        username: generatedEmail.split('@')[0],
        email: generatedEmail,
        password: password,  // Storing plaintext password is not a good practice in real-world apps.
        hashedPassword: hashedPassword,
        avatar: generateRandomUserImage()
    };

    users.push(user);
}

fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
