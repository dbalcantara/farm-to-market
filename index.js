import express from 'express';
import router from './router.js';
import http from 'http';
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

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
const PORT = 3001;
app.listen(PORT, async () => {
    console.log(`Database Server Started at Port ${PORT}`);
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
