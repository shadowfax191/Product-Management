import axios from 'axios';

// Create an Axios instance with a base URL
const instance = axios.create({
    baseURL: 'https://bistro-boss-server-with-cart-part-4-main.vercel.app', // Replace with your server's base URL
});

export default instance;
