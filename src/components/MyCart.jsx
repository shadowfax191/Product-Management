import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider/AuthProdiver";
import { useLoaderData } from "react-router-dom";

const MyCart = () => {
    const { user } = useContext(AuthContext)
    const data = useLoaderData()
    const [collections, setCollecTion] = useState([])

    const CartInfo = []
    

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => {
                setCollecTion(data);
            })
    }, [])


    data.forEach(newData => {
        if (newData.userId == user.uid) {
            const mainCartData = collections.find((collect) => collect._id == newData.cartId)
            if (mainCartData) {
                CartInfo.push(mainCartData)

            }

        }
    })
    const handleDelete = (id) => {
        const backCart = data.find((collect) => collect.cartId == id)
        const newId = backCart._id
        console.log(newId);
        fetch(`http://localhost:5000/cartId/${newId}`, {
            method: "DELETE",

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
window.location.reload()

            })
        //     console.log(CartInfo);
        // const filterData =CartInfo.filter(item => item._id != id)
        // console.log(filterData);
        // setNewCarts(filterData)

    }
   

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto py-10 md:py-20">
            {
                CartInfo.map((cart, index) =>
                    <div key={index}>
                        <div className="card bg-base-100 shadow-xl pb-10">
                            <figure><img className="h-64" src={cart.photo} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title text-2xl">{cart?.name}</h2>
                                <p className="text-primary font-semibold">{cart?.brandName}</p>
                                <div className="flex justify-evenly">
                                    <p> Type: {cart?.type}</p>
                                    <p className="font-bold text-primary">Price: ${cart?.price}</p>
                                </div>

                                <div className="rating rating-md flex justify-end px-6">


                                    {
                                        [1, 2, 3, 4, 5].map((a, index) => (
                                            <input key={index} type="radio" name={`rating-${cart?._id}`} className="mask mask-star-2 bg-primary " checked={a <= cart?.rating} readOnly />
                                        ))
                                    }

                                </div>


                                <div className="card-actions justify-end pt-4">
                                    <button onClick={() => handleDelete(cart?._id)} className="btn btn-primary">Delete</button>
                                </div>


                            </div>
                        </div>
                    </div>

                )
            }
        </div>
    );
};

export default MyCart;