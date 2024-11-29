import mongoose from 'mongoose';

//establish database connection via mongoose
await mongoose.connect("mongodb+srv://scpepito:yTHW4UiE7G2%40gE.@cluster0.cscy5.mongodb.net/");

// create User model with schema for user details
const User = mongoose.model('users',{
    firstName : { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
    userType: { type: String, default: "customer" },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    shoppingCart: [String], //array of product ids
    pastPurchases: [String] //array of product ids
});

// add new user
export const addUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!(firstName && lastName && email && password)) {
            return res.status(400).send({ inserted: false, message: "missing required fields" });
        }
        const newUser = new User(req.body);
        await newUser.save(); // save new user to DB
        res.status(201).send({ inserted: true, message: "user added successfully" });
    } catch (error) {
        res.status(500).send({ inserted: false, message: error.message }); // handle error
    }
};

// get user by email
const getUserbyEmail = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    res.send(user); // return user data
}

// update user details
const updateUserDetails = async (req, res) => {
    const userTemp = await User.findOne({ email: req.body.email });
    if (!userTemp) {
        res.send({ updated: false, message: "user not found" });
        return; // stop if user not found
    }

    // update user fields if provided in request
    if (req.body.firstName) userTemp.firstName = req.body.firstName;
    if (req.body.middleName) userTemp.middleName = req.body.middleName;
    if (req.body.lastName) userTemp.lastName = req.body.lastName;
    if (req.body.password) userTemp.password = req.body.password;
    if (req.body.shoppingCart) userTemp.shoppingCart = req.body.shoppingCart;
    if (req.body.pastPurchases) userTemp.pastPurchases = req.body.pastPurchases;

    try {
        await userTemp.save(); // save updated user
        res.send({ updated: true, message: "user details updated successfully" });
    } catch (error) {
        res.status(500).send({ updated: false, message: "error updating user details" }); // handle error
    }
}

// delete user by email
const deleteUser = async (req, res) => {
    const userDeletetion = await User.deleteOne({ email: req.body.email });
    res.send(userDeletetion); // send result of deletion
};

// show all users
const showAllUser = async (req, res) => {
    res.send(await User.find({})); // fetch all users from DB
}

export { getUserbyEmail, updateUserDetails, deleteUser, showAllUser }