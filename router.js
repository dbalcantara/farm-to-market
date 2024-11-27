import { newUser, login } from "./controllers/authController.js";
import { createProduct, getProduct, updateProduct } from "./controllers/productController.js";
import { createOrder, getOrders } from "./controllers/orderController.js";


const app = (app) => {
    // authentication
    app.post('/register', newUser);
    app.post('/login',  login);

    // products
    app.post('/products', createProduct);
    app.get('/products', getProduct);
    app.put('/products/:id', updateProduct);

    // orders
    app.post('/orders', createOrder);
    app.get('/orders', getOrders);
}
    
export default app;
