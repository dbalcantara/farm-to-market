import express from 'express';
import router from './router.js';
import http from 'http';
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/productImages', express.static('/productImages'));

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

    await AddProducts();

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


async function AddProducts() {
    try {
        const products = [
            { productId: "P10001", productName: "Apple (Green)", productDescription: "Crisp and tangy, perfect for merienda or fruit salad.", productType: 1, productCategory: "Fruits", productPrice: 65, productQuantity: 100, productImage: "/productsImages/P10001.webp" }, 
            { productId: "P10002", productName: "Apple (Red)", productDescription: "Sweet and juicy, a pasalubong favorite.", productType: 1, productCategory: "Fruits", productPrice: 52, productQuantity: 100, productImage: "/productsImages/P10002.webp" }, 
            { productId: "P10003", productName: "Banana (Lakatan)", productDescription: "Sweet and creamy, perfect for baon or banana cue.", productType: 1, productCategory: "Fruits", productPrice: 230, productQuantity: 100, productImage: "/productsImages/P10003.webp" }, 
            { productId: "P10004", productName: "Banana (Latundan)", productDescription: "Mildly sweet, great for a quick snack.", productType: 1, productCategory: "Fruits", productPrice: 104, productQuantity: 100, productImage: "/productsImages/P10004.webp" }, 
            { productId: "P10005", productName: "Banana (Saba)", productDescription: "Versatile for turon or nilagang saba.", productType: 1, productCategory: "Fruits", productPrice: 145, productQuantity: 100, productImage: "/productsImages/P10005.webp" }, 
            { productId: "P10006", productName: "Durian", productDescription: "Bold and creamy, a true tropical treat.", productType: 1, productCategory: "Fruits", productPrice: 300, productQuantity: 100, productImage: "/productsImages/P10006.webp" }, 
            { productId: "P10007", productName: "Grapes (Green)", productDescription: "Sweet and seedless for handaan.", productType: 1, productCategory: "Fruits", productPrice: 745, productQuantity: 100, productImage: "/productsImages/P10007.webp" }, 
            { productId: "P10008", productName: "Grapes (Red)", productDescription: "Juicy and festive for special occasions.", productType: 1, productCategory: "Fruits", productPrice: 475, productQuantity: 100, productImage: "/productsImages/P10008.webp" }, 
            { productId: "P10009", productName: "Kiat Kiat", productDescription: "Easy-to-peel, great for family gatherings.", productType: 1, productCategory: "Fruits", productPrice: 120, productQuantity: 100, productImage: "/productsImages/P10009.webp" }, 
            { productId: "P10010", productName: "Kiwi", productDescription: "Tangy and tropical, adds flair to fruit platters.", productType: 1, productCategory: "Fruits", productPrice: 45, productQuantity: 100, productImage: "/productsImages/P10010.webp" }, 
            { productId: "P10011", productName: "Lanzones", productDescription: "Sweet and fibrous, a tropical favorite.", productType: 1, productCategory: "Fruits", productPrice: 430, productQuantity: 100, productImage: "/productsImages/P10011.webp" }, 
            { productId: "P10012", productName: "Lemon", productDescription: "Zesty, perfect for lemonade or marinades.", productType: 1, productCategory: "Fruits", productPrice: 29, productQuantity: 100, productImage: "/productsImages/P10012.webp" }, 
            { productId: "P10013", productName: "Mango (Green)", productDescription: "Tangy and best with bagoong.", productType: 1, productCategory: "Fruits", productPrice: 99, productQuantity: 100, productImage: "/productsImages/P10013.webp" }, 
            { productId: "P10014", productName: "Mango (Yellow)", productDescription: "Sweet and essential for desserts.", productType: 1, productCategory: "Fruits", productPrice: 99, productQuantity: 100, productImage: "/productsImages/P10014.webp" }, 
            { productId: "P10015", productName: "Melon", productDescription: "Refreshing, ideal for homemade melon juice.", productType: 1, productCategory: "Fruits", productPrice: 245, productQuantity: 100, productImage: "/productsImages/P10015.webp" }, 
            { productId: "P10016", productName: "Orange", productDescription: "Sweet and zesty for snacks or juice.", productType: 1, productCategory: "Fruits", productPrice: 55, productQuantity: 100, productImage: "/productsImages/P10016.webp" }, 
            { productId: "P10017", productName: "Papaya", productDescription: "Vibrant, great for breakfast or atsara.", productType: 1, productCategory: "Fruits", productPrice: 149, productQuantity: 100, productImage: "/productsImages/P10017.webp" }, 
            { productId: "P10018", productName: "Pineapple", productDescription: "Sweet-tangy, perfect for fiestas.", productType: 1, productCategory: "Fruits", productPrice: 255, productQuantity: 100, productImage: "/productsImages/P10018.webp" }, 
            { productId: "P10019", productName: "Santol", productDescription: "Tangy and nostalgic with salt.", productType: 1, productCategory: "Fruits", productPrice: 75, productQuantity: 100, productImage: "/productsImages/P10019.webp" }, 
            { productId: "P10020", productName: "Strawberries", productDescription: "Fresh from Benguet, perfect for desserts.", productType: 1, productCategory: "Fruits", productPrice: 599, productQuantity: 100, productImage: "/productsImages/P10020.webp" }, 
            { productId: "P10021", productName: "Watermelon", productDescription: "Juicy, perfect for summer merienda.", productType: 1, productCategory: "Fruits", productPrice: 500, productQuantity: 100, productImage: "/productsImages/P10021.webp" }, 
            { productId: "P10022", productName: "Alugbati", productDescription: "Fresh for guisado or sinigang.", productType: 1, productCategory: "Vegetables", productPrice: 15, productQuantity: 100, productImage: "/productsImages/P10022.webp" }, 
            { productId: "P10023", productName: "Ampalaya", productDescription: "Bitter yet healthy, great for ginataan.", productType: 1, productCategory: "Vegetables", productPrice: 145, productQuantity: 100, productImage: "/productsImages/P10023.webp" }, 
            { productId: "P10024", productName: "Asparagus", productDescription: "Tender and nutritious for stir-fries.", productType: 1, productCategory: "Vegetables", productPrice: 240, productQuantity: 100, productImage: "/productsImages/P10024.webp" }, 
            { productId: "P10025", productName: "Baguio Beans", productDescription: "Crunchy for ginisang gulay.", productType: 1, productCategory: "Vegetables", productPrice: 89, productQuantity: 100, productImage: "/productsImages/P10025.webp" }, 
            { productId: "P10026", productName: "Bell Pepper (Green)", productDescription: "Perfect for relleno or pinakbet.", productType: 1, productCategory: "Vegetables", productPrice: 120, productQuantity: 100, productImage: "/productsImages/P10026.webp" }, 
            { productId: "P10027", productName: "Bell Pepper (Red)", productDescription: "Sweet and colorful for menudo.", productType: 1, productCategory: "Vegetables", productPrice: 120, productQuantity: 100, productImage: "/productsImages/P10027.webp" }, 
            { productId: "P10028", productName: "Broccoli", productDescription: "Nutritious for steaming or guisado.", productType: 1, productCategory: "Vegetables", productPrice: 130, productQuantity: 100, productImage: "/productsImages/P10028.webp" }, 
            { productId: "P10029", productName: "Cabbage", productDescription: "Crunchy for pancit or sinigang.", productType: 1, productCategory: "Vegetables", productPrice: 169, productQuantity: 100, productImage: "/productsImages/P10029.webp" }, 
            { productId: "P10030", productName: "Calamansi", productDescription: "Essential for sauces and drinks.", productType: 1, productCategory: "Vegetables", productPrice: 39, productQuantity: 100, productImage: "/productsImages/P10030.webp" }, 
            { productId: "P10031", productName: "Camote", productDescription: "Sweet and perfect for snacks.", productType: 1, productCategory: "Vegetables", productPrice: 79, productQuantity: 100, productImage: "/productsImages/P10031.webp" }, 
            { productId: "P10032", productName: "Carrot", productDescription: "Crisp for lumpia and stews.", productType: 1, productCategory: "Vegetables", productPrice: 139, productQuantity: 100, productImage: "/productsImages/P10032.webp" }, 
            { productId: "P10033", productName: "Cauliflower", productDescription: "Perfect for chopsuey or paksiw.", productType: 1, productCategory: "Vegetables", productPrice: 169, productQuantity: 100, productImage: "/productsImages/P10033.webp" }, 
            { productId: "P10034", productName: "Corn Yellow", productDescription: "Sweet for boiling or grilling.", productType: 1, productCategory: "Vegetables", productPrice: 50, productQuantity: 100, productImage: "/productsImages/P10034.webp" }, 
            { productId: "P10035", productName: "Cucumber", productDescription: "Refreshing for salads or sides.", productType: 1, productCategory: "Vegetables", productPrice: 120, productQuantity: 100, productImage: "/productsImages/P10035.webp" }, 
            { productId: "P10036", productName: "Eggplant", productDescription: "Smoky for tortang talong or kare-kare.", productType: 1, productCategory: "Vegetables", productPrice: 149, productQuantity: 100, productImage: "/productsImages/P10036.webp" }, 
            { productId: "P10037", productName: "Gabi", productDescription: "Starchy for sinigang or laing.", productType: 1, productCategory: "Vegetables", productPrice: 55, productQuantity: 100, productImage: "/productsImages/P10037.webp" }, 
            { productId: "P10038", productName: "Garlic", productDescription: "Aromatic for everyday cooking.", productType: 1, productCategory: "Vegetables", productPrice: 60, productQuantity: 100, productImage: "/productsImages/P10038.webp" }, 
            { productId: "P10039", productName: "Ginger", productDescription: "Essential for tinola or salabat.", productType: 1, productCategory: "Vegetables", productPrice: 85, productQuantity: 100, productImage: "/productsImages/P10039.webp" }, 
            { productId: "P10040", productName: "Kalabasa", productDescription: "Sweet for ginataang gulay.", productType: 1, productCategory: "Vegetables", productPrice: 200, productQuantity: 100, productImage: "/productsImages/P10040.webp" }, 
            { productId: "P10041", productName: "Kangkong", productDescription: "Ideal for sinigang or adobo.", productType: 1, productCategory: "Vegetables", productPrice: 30, productQuantity: 100, productImage: "/productsImages/P10041.webp" }, 
            { productId: "P10042", productName: "Lettuce", productDescription: "Crisp for lumpia or salads.", productType: 1, productCategory: "Vegetables", productPrice: 245, productQuantity: 100, productImage: "/productsImages/P10042.webp" }, 
            { productId: "P10043", productName: "Malunggay", productDescription: "Nutritious for tinola or smoothies.", productType: 1, productCategory: "Vegetables", productPrice: 20, productQuantity: 100, productImage: "/productsImages/P10043.webp" }, 
            { productId: "P10044", productName: "Monggo", productDescription: "Versatile for ginisang monggo.", productType: 1, productCategory: "Vegetables", productPrice: 49, productQuantity: 100, productImage: "/productsImages/P10044.webp" }, 
            { productId: "P10045", productName: "Mustasa", productDescription: "Zesty for burong mustasa.", productType: 1, productCategory: "Vegetables", productPrice: 79, productQuantity: 100, productImage: "/productsImages/P10045.webp" }, 
            { productId: "P10046", productName: "Okra", productDescription: "Tender for pinakbet or sinigang.", productType: 1, productCategory: "Vegetables", productPrice: 15, productQuantity: 100, productImage: "/productsImages/P10046.webp" }, 
            { productId: "P10047", productName: "Onion (Red)", productDescription: "Flavorful for marinades.", productType: 1, productCategory: "Vegetables", productPrice: 45, productQuantity: 100, productImage: "/productsImages/P10047.webp" }, 
            { productId: "P10048", productName: "Onion (White)", productDescription: "Mild for soups or grills.", productType: 1, productCategory: "Vegetables", productPrice: 47, productQuantity: 100, productImage: "/productsImages/P10048.webp" }, 
            { productId: "P10049", productName: "Pechay", productDescription: "Perfect for nilaga or ginisa.", productType: 1, productCategory: "Vegetables", productPrice: 200, productQuantity: 100, productImage: "/productsImages/P10049.webp" }, 
            { productId: "P10050", productName: "Potato", productDescription: "Versatile for kaldereta or fries.", productType: 1, productCategory: "Vegetables", productPrice: 109, productQuantity: 100, productImage: "/productsImages/P10050.webp" }, 
            { productId: "P10051", productName: "Radish", productDescription: "Spicy for sinigang or atsara.", productType: 1, productCategory: "Vegetables", productPrice: 85, productQuantity: 100, productImage: "/productsImages/P10051.webp" }, 
            { productId: "P10052", productName: "Sayote", productDescription: "Crunchy for tinola or guisado.", productType: 1, productCategory: "Vegetables", productPrice: 69, productQuantity: 100, productImage: "/productsImages/P10052.webp" }, 
            { productId: "P10053", productName: "Sili (Labuyo)", productDescription: "Spicy for dipping sauces.", productType: 1, productCategory: "Vegetables", productPrice: 70, productQuantity: 100, productImage: "/productsImages/P10053.webp" }, 
            { productId: "P10054", productName: "Sili (Sigang)", productDescription: "Enhancer for sinigang.", productType: 1, productCategory: "Vegetables", productPrice: 159, productQuantity: 100, productImage: "/productsImages/P10054.webp" }, 
            { productId: "P10055", productName: "Singkamas", productDescription: "Sweet and refreshing with bagoong.", productType: 1, productCategory: "Vegetables", productPrice: 85, productQuantity: 100, productImage: "/productsImages/P10055.webp" }, 
            { productId: "P10056", productName: "Tomato", productDescription: "Juicy for guisado and sawsawan.", productType: 1, productCategory: "Vegetables", productPrice: 139, productQuantity: 100, productImage: "/productsImages/P10056.webp" }, 
            { productId: "P10057", productName: "Upo", productDescription: "Tender for soups and guisado.", productType: 1, productCategory: "Vegetables", productPrice: 180, productQuantity: 100, productImage: "/productsImages/P10057.webp" }, 
            { productId: "P10058", productName: "Quail Eggs", productDescription: "Perfect for kwek-kwek or sopas.", productType: 2, productCategory: "Eggs", productPrice: 79, productQuantity: 100, productImage: "/productsImages/P10058.webp" }, 
            { productId: "P10059", productName: "Salted Eggs", productDescription: "A classic with ensaladang talong.", productType: 2, productCategory: "Eggs", productPrice: 120, productQuantity: 100, productImage: "/productsImages/P10059.webp" }, 
            { productId: "P10060", productName: "White Eggs (Large)", productDescription: "Great for scrambled eggs or torta.", productType: 2, productCategory: "Eggs", productPrice: 275, productQuantity: 100, productImage: "/productsImages/P10060.webp" }, 
            { productId: "P10061", productName: "White Eggs (Small)", productDescription: "Ideal for daily breakfasts.", productType: 2, productCategory: "Eggs", productPrice: 249, productQuantity: 100, productImage: "/productsImages/P10061.webp" }, 
            { productId: "P10062", productName: "White Eggs (XL)", productDescription: "Perfect for hearty omelets.", productType: 2, productCategory: "Eggs", productPrice: 300, productQuantity: 100, productImage: "/productsImages/P10062.webp" }, 
            { productId: "P10063", productName: "Brown Eggs (Organic)", productDescription: "Rich flavor for any dish.", productType: 2, productCategory: "Eggs", productPrice: 379, productQuantity: 100, productImage: "/productsImages/P10063.webp" }, 
            { productId: "P10064", productName: "Chicken Breast", productDescription: "Lean and tender for tinola.", productType: 2, productCategory: "Chicken", productPrice: 265, productQuantity: 100, productImage: "/productsImages/P10064.webp" }, 
            { productId: "P10065", productName: "Chicken Drumstick", productDescription: "Juicy for adobo or fried chicken.", productType: 2, productCategory: "Chicken", productPrice: 269, productQuantity: 100, productImage: "/productsImages/P10065.webp" }, 
            { productId: "P10066", productName: "Chicken Thigh", productDescription: "Perfect for kare-kare or grilling.", productType: 2, productCategory: "Chicken", productPrice: 280, productQuantity: 100, productImage: "/productsImages/P10066.webp" }, 
            { productId: "P10067", productName: "Chicken Wings", productDescription: "Ideal for pulutan or buffalo wings.", productType: 2, productCategory: "Chicken", productPrice: 282, productQuantity: 100, productImage: "/productsImages/P10067.webp" }, 
            { productId: "P10068", productName: "Chicken Whole", productDescription: "Great for handaan centerpiece.", productType: 2, productCategory: "Chicken", productPrice: 315, productQuantity: 100, productImage: "/productsImages/P10068.webp" }, 
            { productId: "P10069", productName: "Chicken Gizzard", productDescription: "Classic for adobo or pulutan.", productType: 2, productCategory: "Chicken", productPrice: 115, productQuantity: 100, productImage: "/productsImages/P10069.webp" }, 
            { productId: "P10070", productName: "Chicken Liver", productDescription: "Creamy for menudo or paté.", productType: 2, productCategory: "Chicken", productPrice: 60, productQuantity: 100, productImage: "/productsImages/P10070.webp" }, 
            { productId: "P10071", productName: "Chicken Feet", productDescription: "Tasty for adobo or street food.", productType: 2, productCategory: "Chicken", productPrice: 105, productQuantity: 100, productImage: "/productsImages/P10071.webp" }, 
            { productId: "P10072", productName: "Chicken Neck", productDescription: "Flavorful for soups or stews.", productType: 2, productCategory: "Chicken", productPrice: 80, productQuantity: 100, productImage: "/productsImages/P10072.webp" }
        ];

        await createMultipleProducts(products);
    }  catch (error) {
        console.error("Error during test case execution:", error.message);
    }
}
