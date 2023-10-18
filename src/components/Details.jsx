import { useContext, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { AuthContext } from "./AuthProvider/AuthProdiver";

const Details = () => {
    const data = useLoaderData([])
    const { id } = useParams()

    const detailData = data.find(data => data._id == id)

    const {user}=useContext(AuthContext)
   
    const [counts,setCount]=useState(1)
    console.log(counts);
    const cartId = { cartId: id,userId: user.uid}
    const handleCart = () => {
       
        if(counts===1){
            fetch('http://localhost:5000/cartId', {
            method: "POST",
            headers: {
                "content-Type": 'application/json'
            },
            body: JSON.stringify(cartId)

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
        }
        else if(counts>=2){
        alert('error')
        }
        setCount(counts+1)
    }

 




    return (
        <div>
            {
                <div className="hero min-h-screen bg-base-200 py-10 md:py-20">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <img src={detailData.photo} className="md:max-w-sm rounded-lg shadow-2xl" />
                        <div className="card-body">
                            <h2 className="card-title text-3xl">{detailData.name}</h2>
                            <p className="text-primary font-semibold text-xl">{detailData.brandName}</p>
                            <div className="flex justify-evenly">
                                <p> Type: {detailData.type}</p>
                                <p className="font-bold text-primary">Price: ${detailData.price}</p>
                            </div>

                            <div className="rating rating-md">


                                {
                                    [1, 2, 3, 4, 5].map((a, index) => (
                                        <input key={index} type="radio" name={`rating-${detailData._id}`} className="mask mask-star-2 bg-primary " checked={a <= detailData.rating} readOnly />
                                    ))
                                }

                            </div>


                            <p className="text-2xl py-5">{detailData.description}</p>

                            <button onClick={()=>handleCart(detailData._id)} className="btn btn-primary w-full max-w-sm  mx-auto mt-10">Add To Cart</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Details;