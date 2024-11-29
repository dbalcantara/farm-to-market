import needle from "needle";

const baseURL = 'http://localhost:27107'; // server URL

// add new order
export const addOrder = async (orderData) => {
    const response = await needle('post', `${baseURL}/add-order`, orderData);
    console.log(response.body); // log response
    return response.body; // return response
};

// get order by transaction id
export const getOrderByTransactionId = async (transactionId) => {
    const response = await needle('post', `${baseURL}/get-order-by-transaction-id`, { transactionId });
    console.log(response.body); // log response
    return response.body; // return response
};

// update order details
export const updateOrder = async (transactionId, orderData) => {
    const data = { ...orderData, transactionId };
    const response = await needle('post', `${baseURL}/update-order`, data);
    console.log(response.body); // log response
    return response.body; // return response
};

// delete order by transaction id
export const deleteOrder = async (transactionId) => {
    const response = await needle('post', `${baseURL}/delete-order`, { transactionId });
    console.log(response.body); // log response
    return response.body; // return response
};

// show all orders of a specific user
export const showAllOrderFromAUser = async (email) => {
    const response = await needle('post', `${baseURL}/show-orders-of-user`, { email });
    console.log(response.body); // log response
    return response.body; // return response
};

// show all orders
export const showAllOrders = async () => {
    const response = await needle('post', `${baseURL}/show-all-orders`);
    console.log(response.body); // log response
    return response.body; // return response
};
