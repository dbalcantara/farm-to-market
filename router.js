import { newUser, login } from "./controllers/authRoutes.js";
import { createProduct, getProduct, updateProduct } from "./controllers/productRoutes.js";
import { createOrder, getOrders } from "./controllers/orderRoutes.js";

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