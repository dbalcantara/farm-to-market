import needle from "needle";

const baseURL = 'http://localhost:27107';

// Function to add a new user
export async function AddUser(userData) {
    try {
        const response = await needle('post', `${baseURL}/add-user`, userData);
        console.log('Add User Response:', response.body); // log response
        return response.body; // return response
    } catch (error) {
        console.error('Error adding user:', error.message); // log error
    }
}

// Function to get user by email
export async function GetUserByEmail(emailq) {
    try {
        const response = await needle('post', `${baseURL}/get-user-by-email`, { email: emailq });
        console.log('Get User by Email Response:', response.body); // log response
        return response.body; // return response
    } catch (error) {
        console.error('Error getting user by email:', error.message); // log error
    }
}

// Function to update user details
export async function UpdateUserDetails(email, updatedData) {
    try {
        const response = await needle('post', `${baseURL}/update-user`, { ...updatedData, email });
        console.log('Update User Response:', response.body); // log response
        return response.body; // return response
    } catch (error) {
        console.error('Error updating user details:', error.message); // log error
    }
}

// Function to delete user by email
export async function DeleteUser(email) {
    try {
        const response = await needle('post', `${baseURL}/delete-user`, { email });
        console.log('Delete User Response:', response.body); // log response
        return response.body; // return response
    } catch (error) {
        console.error('Error deleting user:', error.message); // log error
    }
}

// Function to get all users
export async function GetAllUsers() {
    try {
        const response = await needle('post', `${baseURL}/show-all-user`);
        console.log('User List:', response.body); // log response
        return response.body; // return response
    } catch (error) {
        console.error('Error showing all users:', error.message); // log error
    }
}