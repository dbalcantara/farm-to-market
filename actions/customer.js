import {User} from "../controllers/authController.js";
import {Order} from "../controllers/orderController.js";
import {hashPassword, generateToken, comparePassword} from "./authentication.js";

function isValidEmail(email) {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;

        if (!(firstName && lastName && email && password && confirmPassword)) {
            res.send({status: false, message: "Please provide all required fields"});
            return;
        }
    
        if (!isValidEmail(email)) {
            res.send({ status: false, message: "Invalid email address"});
            return;
        }
    
        const existingUser = await User.findOne({email: email});
    
        if (existingUser) {
            res.send({ status: false, message: "User with this email already exists"});
            return;
        }
    
        if (password !== confirmPassword) {
            res.send({ status: false, message: "Passwords do not match"});
            return;
        }
    
        delete req.body.confirmPassword;
        req.body.password = await hashPassword(password);
        
        generateToken(req.body._id, res); // Generate token for user
    
        const newUser = new User(req.body);
        await newUser.save();
        res.send({ status: true, message: "User signed up successfully"});

    } catch (error) {       
        res.status(500).json({ status: false, message: "Internal server error" });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!isValidEmail(email)) {
            return res.status(400).json({ status: false, message: "Invalid email address"});
        }
        const existingUser = await User.findOne({email: email});
        console.log(existingUser);
        if (!existingUser) {
            return res.status(400).json({ status: false, message: "User with this email does not exist"});
        }
        // 
        const isPasswordMatch = await comparePassword(password, existingUser.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ status: false, message: "Invalid password" });
        }
        // token for the user
        generateToken(existingUser._id, res);
        // success
        return res.status(200).json({ status: true, message: "User logged in successfully" });
    } catch (error) {
        // Internal server error
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('jwt');
        res.send({ status: true, message: "User logged out successfully"});
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal server error" });
    }
}

export const addToCart = async (req, res) => {
    try {
        const { email, productId, quantity } = req.body;
        const existingUser = await User.findOne({email: email});
        const cart = existingUser.shoppingCart;
        const productIndex = cart.findIndex(product => product.productId === productId);
        if (productIndex === -1) {
            cart.push({ productId: productId, quantity: quantity });
        } else {
            cart[productIndex].quantity += quantity;
        }
        existingUser.shoppingCart = cart;
        await existingUser.save();
        res.send({ status: true, message: "Product added to cart successfully" });
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal server error" });
    }
}
export const removeFromCart = async (req, res) => {
    try {
        const { email, productId, quantity } = req.body;
        const existingUser = await User.findOne({email: email});
        const cart = existingUser.shoppingCart;
        const productIndex = cart.findIndex(product => product.productId === productId);
        if (productIndex === -1) {
            res.send({ status: false, message: "Product not found in cart" });
            return;
        }
        if (cart[productIndex].quantity > quantity) {
            cart[productIndex].quantity -= quantity;
        } else {
            cart.splice(productIndex, 1);
        }
        res.send({ status: true, message: "Product removed from cart successfully" });
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal server error" });
    }
}
export const checkout = async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await User.findOne({email: email});
        if (existingUser.shoppingCart.length === 0) {
            res.send({ status: false, message: "Cart is empty" });
            return;
        }
        const allTransactions = await Order.find({});
        var index = allTransactions.length + 1
        const cart = existingUser.shoppingCart; 
        
        for (let i = 0; i < cart.length; i++) {
            let order = {
                transactionId: index,
                productId: cart[i].productId,
                orderQuantity: cart[i].quantity,
                orderStatus: 0,
                email: email,
                dateOrdered: Date.now(),
                time: new Date().toLocaleTimeString()
            }
            index++;
            let newOrder = new Order(order);
            await newOrder.save();
        }
        res.send({ status: true, message: "Orders placed successfully" });
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal server error" });
    }
}
export const cancelOrder = async (req, res) => {
    try {
        const { transactionId } = req.body;
        const order = await Order.findOne({transactionId: transactionId});
        if (!order) {
            res.send({ status: false, message: "Order not found" });
            return;
        }
        order.orderStatus = 2;
        await order.save();
        res.send({ status: true, message: "Order cancelled successfully" });
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal server error" });
    }
}
