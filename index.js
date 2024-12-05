import express from 'express';
import router from './router.js';
import http from 'http';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// default route to verify server is running
app.get('/', (req, res) => {
    res.send('API is running');
});

// set up routes
router(app);

// error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// start server
const PORT = 27107;
app.listen(PORT, async () => {
    console.log(`Database Server Started at Port ${PORT}`);

    // run test cases after server starts
    await runTests();
});

// helper function to send POST requests
function sendPostRequest(endpoint, data) {
    const options = {
        hostname: 'localhost',
        port: PORT,
        path: endpoint,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(data)),
        },
    };

    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                resolve({ statusCode: res.statusCode, body: JSON.parse(body) });
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.write(JSON.stringify(data));
        req.end();
    });
}

// helper functions
async function createMultipleUsers(users) {
    for (let user of users) {
        const response = await sendPostRequest('/add-user', user);
        console.log("Create User Response:", response);
    }
}

async function createMultipleProducts(products) {
    for (let product of products) {
        const response = await sendPostRequest('/add-product', product);
        console.log("Create Product Response:", response);
    }
}

async function createMultipleOrders(orders) {
    for (let order of orders) {
        const response = await sendPostRequest('/add-order', order);
        console.log("Create Order Response:", response);
    }
}

async function updateMultipleUsers(users) {
    for (let user of users) {
        const response = await sendPostRequest('/update-user', {
            email: user.email,
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName + " Updated",
            password: user.password + "123"
        });
        console.log("Update User Response:", response);
    }
}

async function updateMultipleProducts(products) {
    for (let product of products) {
        const response = await sendPostRequest('/update-product', {
            productId: product.productId,
            productName: product.productName + " Updated",
            productQuantity: product.productQuantity + 50
        });
        console.log("Update Product Response:", response);
    }
}

async function updateMultipleOrders(orders) {
    for (let order of orders) {
        const response = await sendPostRequest('/update-order', {
            transactionId: order.transactionId,
            orderQuantity: order.orderQuantity + 5,
            orderStatus: 1
        });
        console.log("Update Order Response:", response);
    }
}

async function readMultipleUsers(users) {
    for (let user of users) {
        const response = await sendPostRequest('/get-user-by-email', { email: user.email });
        console.log("Read User by Email Response:", response);
    }
}

async function readMultipleProducts(products) {
    for (let product of products) {
        const response = await sendPostRequest('/get-product-by-id', { productId: product.productId });
        console.log("Read Product by ID Response:", response);
    }
}

async function readMultipleOrders(orders) {
    for (let order of orders) {
        const response = await sendPostRequest('/get-order-by-transaction-id', { transactionId: order.transactionId });
        console.log("Read Order by Transaction ID Response:", response);
    }
}

async function deleteOneUser(email) {
    const response = await sendPostRequest('/delete-user', { email });
    console.log("Delete One User Response:", response);
}

async function deleteOneProduct(productId) {
    const response = await sendPostRequest('/delete-product', { productId });
    console.log("Delete One Product Response:", response);
}

async function deleteOneOrder(transactionId) {
    const response = await sendPostRequest('/delete-order', { transactionId });
    console.log("Delete One Order Response:", response);
}

// run tests with separate functions
async function runTests() {
    console.log("Running CRUD Test Cases...");

    try {
        const users = [
            { firstName: "Kusuo", middleName: "K.", lastName: "Saiki", email: "saikik@gmail.com", password: "i'mapsychic" },
            { firstName: "Nendou", middleName: "K.", lastName: "Riki", email: "nendou@gmail.com", password: "dumbdumb" },
            { firstName: "Teruhashi", middleName: "T.", lastName: "Kokomi", email: "teruhashi@gmail.com", password: "beautiful" }
        ];

        const products = [
            { productId: "P001", productName: "Coffee Jelly", productDescription: "Coffee-flavored jelly with a bittersweet taste", productType: 1, productQuantity: 50 },
            { productId: "P002", productName: "Matcha Latte", productDescription: "Green tea flavored milk beverage", productType: 1, productQuantity: 100 },
            { productId: "P003", productName: "Cocoa Puffs", productDescription: "Chocolate flavored breakfast cereal", productType: 1, productQuantity: 200 }
        ];

        const orders = [
            { transactionId: "T001", productId: "P001", orderQuantity: 10, orderStatus: 0, email: "saikik@gmail.com", dateOrdered: "2024-11-26", time: "12:00 PM" },
            { transactionId: "T002", productId: "P002", orderQuantity: 5, orderStatus: 0, email: "nendou@gmail.com", dateOrdered: "2024-11-27", time: "2:00 PM" },
            { transactionId: "T003", productId: "P003", orderQuantity: 20, orderStatus: 0, email: "teruhashi@gmail.com", dateOrdered: "2024-11-28", time: "4:00 PM" }
        ];

        // create operations
        await createMultipleUsers(users);
        await createMultipleProducts(products);
        await createMultipleOrders(orders);

        // read operations
        await readMultipleUsers(users);
        await readMultipleProducts(products);
        await readMultipleOrders(orders);

        // update operations
        await updateMultipleUsers(users);
        await updateMultipleProducts(products);
        await updateMultipleOrders(orders);

        // DELETE: Delete One User
        await deleteOneUser("saikik@gmail.com");

        // DELETE: Delete One Product
        await deleteOneProduct("P001");

        // DELETE: Delete One Order
        await deleteOneOrder("T001");

        const validUser = {
            firstName: "Kusuo",
            lastName: "Saiki",
            email: "saikik@gmail.com",
            password: "i'mapsychic",
            confirmPassword: "i'mapsychic"
        };

        const invalidUser = {
            firstName: "Kusuo",
            lastName: "Saiki",
            email: "invalid-email",
            password: "123",
            confirmPassword: "456" // Passwords do not match
        };

        // 1. Test Signup
        console.log("\n--- Testing Signup ---");
        const signupResponse = await sendPostRequest('/signup', validUser);
        console.log("Signup Response (Valid):", signupResponse);

        const invalidSignupResponse = await sendPostRequest('/signup', invalidUser);
        console.log("Signup Response (Invalid):", invalidSignupResponse);

        // 2. Test Login
        console.log("\n--- Testing Login ---");
        const loginResponse = await sendPostRequest('/login', {
            email: validUser.email,
            password: validUser.password
        });
        console.log("Login Response (Valid):", loginResponse);

        const invalidLoginResponse = await sendPostRequest('/login', {
            email: validUser.email,
            password: "wrongpassword"
        });
        console.log("Login Response (Invalid Password):", invalidLoginResponse);

        const nonExistentLoginResponse = await sendPostRequest('/login', {
            email: "nonexistent@gmail.com",
            password: "somepassword"
        });
        console.log("Login Response (Non-existent User):", nonExistentLoginResponse);

        // 3. Test Logout
        console.log("\n--- Testing Logout ---");
        const logoutResponse = await sendPostRequest('/logout', {});
        console.log("Logout Response:", logoutResponse);
    } catch (error) {
        console.error("Error during test case execution:", error.message);
    }
}
