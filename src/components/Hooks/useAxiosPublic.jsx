import axios from "axios";



const axiosPublic =axios.create({
    baseURL:'https://bistro-boss-server-with-cart-part-4-main.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;