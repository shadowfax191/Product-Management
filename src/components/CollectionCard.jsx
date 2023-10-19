import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "./Slider";

const CollectionCard = () => {
    const { title } = useParams([])
    const [collections, setCollecTion] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => {
                setCollecTion(data);
            })
    }, [])

    const filterCollectionsData = collections.filter(item => item.brandName == title)

    console.log(filterCollectionsData);



    return (
        <div>
            <Slider title={title}></Slider>
            <div className="max-w-7xl mx-auto">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-10">
                    {
                        filterCollectionsData.map(collection =>
                            <div key={collection?._id}>
                                <div className="card card-side flex-col md:flex-row bg-base-100 rounded-none ">
                                    <figure><img className="md:h-40 md:w-96 h-96 rounded-none flex-1" src={collection?.photo} alt="Movie" /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title text-2xl">{collection?.name}</h2>
                                        <p className="text-primary font-semibold">{collection?.brandName}</p>
                                        <div className="flex justify-evenly">
                                            <p> Type: {collection?.type}</p>
                                            <p className="font-bold text-primary">Price: ${collection?.price}</p>
                                        </div>

                                        <div className="rating rating-md flex justify-end px-6">


                                            {
                                                [1, 2, 3, 4, 5].map((a, index) => (
                                                    <input key={index} type="radio" name={`rating-${collection?._id}`} className="mask mask-star-2 bg-primary " checked={a <= collection?.rating} readOnly />
                                                ))
                                            }

                                        </div>
                                        <p>{collection?.description}</p>
                                        <div className="flex justify-between pt-3">
                                            <div className="card-actions justify-start">
                                                <Link to={`/details/${collection?._id}`}> <button className="btn btn-primary">Details</button></Link>
                                            </div>
                                            <div className="card-actions justify-end">
                                                <Link to={`/update/${collection?._id}`}><button className="btn btn-primary">Update</button></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )       
                    }
                </div>
                <div>
                    {
                        filterCollectionsData.length?'':
                        <div>
                              
                              <p className="text-center text-2xl md:text-8xl text-primary font-bold py-10 md:py-20 ">No product Available </p>
                              <Link to='/addProduct'>
                                <p className="text-center text-xl  text-primary pb-5">You can add product to see the Product here</p>
                              <button className="btn btn-primary max-w-xs mx-auto w-full flex justify-center mb-10">GO to add product</button>
                              </Link>
                        </div>
                      
                    }
                </div>
            </div>
        </div>
    );
};

export default CollectionCard;