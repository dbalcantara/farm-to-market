import {addUser, getUserbyEmail, updateUserDetails, deleteUser, showAllUser} from "./controllers/authController.js";
import {addNewProduct, getProductByID, updateProductDetails, deleteProduct, showAllProducts} from "./controllers/productController.js";
import {addOrder, getOrderByTransactionId, updateOrder, deleteOrder, showAllOrderFromAUser, showAllOrders} from "./controllers/orderController.js";
import {signup, login, logout} from "./actions/customer.js";

const router = (app) => {
    // POST routes (actual API functionality)
    app.post('/add-user', addUser);
    app.post('/get-user-by-email', getUserbyEmail);
    app.post('/update-user', updateUserDetails);
    app.post('/delete-user', deleteUser);
    app.post('/show-all-users', showAllUser);

    app.post('/add-product', addNewProduct);
    app.post('/get-product-by-id', getProductByID);
    app.post('/update-product', updateProductDetails);
    app.post('/delete-product', deleteProduct);
    app.post('/show-all-products', showAllProducts); 
    
    app.post('/add-order', addOrder);
    app.post('/get-order-by-transaction-id', getOrderByTransactionId);
    app.post('/update-order', updateOrder);
    app.post('/delete-order', deleteOrder);
    app.post('/show-orders-of-user', showAllOrderFromAUser);
    app.post('/show-all-orders', showAllOrders);

    app.post('/signup', signup);
    app.post('/login', login);
    app.post('/logout', logout);
};

export default router;
