import needle from "needle";

const baseURL = 'http://localhost:3001';

// add new product
export async function AddNewProduct(productData) {
    try {
        const response = await needle('post', `${baseURL}/add-product`, productData);
        if (response.statusCode === 201) {
            console.log('Product added successfully:', response.body);
            return response.body; 
        } else {
            console.error('Failed to add product:', response.body.message || response.body);
            return { inserted: false, message: 'Failed to add product.' }; 
        }
    } catch (error) {
        console.error('Error adding product:', error.message); 
        return { inserted: false, message: error.message }; 
    }
}

// get product by id
export async function GetProductByID(productId) {
    try {
        const response = await needle('post', `${baseURL}/get-product-by-id`, { productId });
        console.log('Get Product by ID Response:', response.body); // log response
        return response.body; // return response
    } catch (error) {
        console.error('Error getting product by ID:', error.message); // log error
    }
}

// update product details
export async function UpdateProductDetails(productId, updatedData) {
    try {
        const response = await needle('post', `${baseURL}/update-product`, { ...updatedData, productId });
        console.log('Update Product Response:', response.body); // log response
        return response.body; // return response
    } catch (error) {
        console.error('Error updating product details:', error.message); // log error
    }
}

// delete product
export async function DeleteProduct(productId) {
    try {
        const response = await needle('post', `${baseURL}/delete-product`, { productId });
        console.log('Delete Product Response:', response.body); // log response
        return response.body; // return response
    } catch (error) {
        console.error('Error deleting product:', error.message); // log error
    }
}

// get all products
export async function GetAllProducts() {
    try {
        const response = await needle('post', `${baseURL}/show-all-product`);
        console.log('Product List:', response.body); // log response
        return response.body; // return response
    } catch (error) {
        console.error('Error showing all products:', error.message); // log error
    }
}
