import needle from 'needle';
import './server.js';  // Assuming server.js is your main server file

// SAMPLE USER
const user1 = {
    firstName: 'Harry ',
    lastName: 'Potter',
    email: 'hp@gmail.com',
    password: '1111',
    userType: 'customer'
};

// SAMPLE ITEM
const item1 = {
    name: 'cat',
    description: 'furry',
    type: 2,
    price: 100000,
    quantity: 1
};

// SAMPLE ORDER
const order1 = {
    productID: 'Product',
    orderQuantity: 1,
    orderStatus: 1,
    email: 'hp@gmail.com'
};


needle.post('http://localhost:3000/register', user1, { json: true }, (err, res) => {
    if (err) throw err;
    console.log('complete', res.body);  // Should succeed
});


needle.post('http://localhost:3000/register', item1, { json: true }, (err, res) => {
    if (err) throw err;
    console.log('missing key', res.body);  // Should fail with a 400 error
});


needle.post('http://localhost:3000/orders', order1, { json: true }, (err, res) => {
    if (err) throw err;
    console.log('empty string', res.body);  // Should fail with a 400 error
});


needle.get('http://localhost:3000/orders?email=hp@gmail.com', (err, res) => {
    if (err) throw err;
    console.log('incomplete details', res.body);  // Should return 404
});
