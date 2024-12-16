import {addUser, getUserbyEmail, updateUserDetails, deleteUser, showAllUser} from "./controllers/authController.js";
import {addNewProduct, getProductByID, updateProductDetails, deleteProduct, showAllProducts} from "./controllers/productController.js";
import {addOrder, getOrderByTransactionId, updateOrder, deleteOrder, showAllOrderFromAUser, showAllOrders, confirmOrder, cancelorder} from "./controllers/orderController.js";
import {signup, login, logout, addToCart, removeFromCart, checkout, cancelOrder} from "./actions/customer.js";

const router = (app) => {

    // Allow Cross Origin Resource Sharing
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
        next();
    })

    // POST routes (actual API functionality)
    app.post('/add-user', addUser);
    app.post('/get-user-by-email', getUserbyEmail);
    app.post('/update-user', updateUserDetails);
    app.post('/delete-user', deleteUser);
    //app.post('/show-all-users', showAllUser);
    app.get('/show-all-users', showAllUser); 

    app.post('/add-product', addNewProduct);
    app.post('/get-product-by-id', getProductByID);
    app.post('/update-product', updateProductDetails);
    app.post('/delete-product', deleteProduct);
    app.get('/show-all-products', showAllProducts); 
    
    app.post('/add-order', addOrder);
    app.post('/get-order-by-transaction-id', getOrderByTransactionId);
    app.post('/update-order', updateOrder);
    app.post('/delete-order', deleteOrder);
    app.get('/show-orders-of-user', showAllOrderFromAUser);
    app.get('/show-all-orders', showAllOrders);

    app.post('/signup', signup);
    app.post('/login', login);
    app.post('/logout', logout);

    app.post('/add-to-cart', addToCart);
    app.post('/remove-from-cart', removeFromCart);
    app.post('/checkout', checkout);
    app.post('/cancel-order', cancelOrder);

    app.post("/confirm-order", confirmOrder);
    app.post("/cancelorder", cancelorder)
};

export default router;
