import needle from 'needle';
import './server.js';  // Assuming server.js is your main server file

/*
    1. Add a test for POST /add-book
        - object with complete keys and non-empty values
        - object with 1 missing key
        - object with complete keys but 1 key has an empty string as its value
*/

// object with complete keys and non-empty values

const user1 = {
    firstName: 'Harry ',
    lastName: 'Potter',
    email: 'hp@gmail.com',
    password: '1111',
    userType: 'customer'
};

needle.post('http://localhost:27017/newUser', user1, { json: true }, (err, res) => {
    if (err) throw err;
    console.log('complete', res.body);  // Should succeed
});


// object with 1 missing key

const item1 = {
    name: 'cat',
    description: 'furry',
    type: 2,
    price: 100000,
    quantity: 1
};
needle.post('http://localhost:27017/createProduct', item1, { json: true }, (err, res) => {
    if (err) throw err;
    console.log('missing key', res.body);  // Should fail with a 400 error
});

// object with complete keys but 1 key has an empty string as its value

const order1 = {
    productID: 'Product',
    orderQuantity: 1,
    orderStatus: 1,
    email: 'hp@gmail.com'
};
needle.post('http://localhost:27017/createOrder', order1, { json: true }, (err, res) => {
    if (err) throw err;
    console.log('empty string', res.body);  // Should fail with a 400 error
});

/*
    2. Add a test for GET /find-by-isbn-author
        - isbn is not existing
        - author is not existing
        - isbn and author is not existing
        - isbn and author is found
*/

// isbn is not existing
needle.get('http://localhost:27017/getOrders?email=hp@gmail.com', (err, res) => {
    if (err) throw err;
    console.log('incomplete details', res.body);  // Should return 404
});

// // author is not existing
// needle.get('http://localhost:3000/find-by-isbn-author?isbn=978-0-7475-3269-9&author=J.K+Bowling', (err, res) => {
//     if (err) throw err;
//     console.log('author not existing:', res.body);  // Should return 404
// });

// // isbn and author is not existing
// needle.get('http://localhost:3000/find-by-isbn-author?isbn=999-0-7475-3269-9&author=J.K+Bowling', (err, res) => {
//     if (err) throw err;
//     console.log('isbn and author not existing:', res.body);  // Should return 404
// });

// // isbn and author is found
// needle.get('http://localhost:3000/find-by-isbn-author?isbn=978-0-7475-3269-9&author=J.K+Rowling', (err, res) => {
//     if (err) throw err;
//     console.log('isbn and author found:', res.body);  // Should return the book
// });

// /*
//     3. Add a test for GET /find-by-author
//         - author is not found
//         - author is found
// */

// // author is not found
// needle.get('http://localhost:3000/find-by-author?author=Denisse+Alcantara', (err, res) => {
//     if (err) throw err;
//     console.log('author not found:', res.body);  // Should return 404
// });

// // author is found
// needle.get('http://localhost:3000/find-by-author?author=J.K+Rowling', (err, res) => {
//     if (err) throw err;
//     console.log('author found:', res.body);  // Should return the books
// });
