import { newUser, login } from "./controllers/authController.js";
import { createProduct, getProduct, updateProduct } from "./controllers/productController.js";
import { createOrder, getOrders } from "./controllers/orderController.js";


const app = (app) => {
    app.post('/register', newUser);
    app.post('/login',  login);
    app.post('/',  createProduct);
    app.get('/', getProduct);
    app.put('/:id', updateProduct);
    app.post('/', createOrder);
    app.get('/:email', getOrders);
    
}
    
export default app;