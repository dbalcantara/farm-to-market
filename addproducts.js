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

async function createMultipleProducts(products) {
    for (let product of products) {
        const response = await sendPostRequest('/add-product', product);
        console.log("Create Product Response:", response);
    }
}


// run tests with separate functions
async function runTests() {
    console.log("Adding the products...");
    try {
        const AddCropProducts = [
            { productId: "P10001", productName: "Apple (Green)", productDescription: "Crisp and tangy, perfect for merienda or fruit salad.", productType: 1, productCategory: "Fruits", productPrice: 65, productQuantity: 100, productImage: "/productsImages/P10001.webp" }
        ];
        
        await createMultipleProducts(AddCropProducts);
    
    } catch (error) {
        console.error("Error during test case execution:", error.message);
    }
}