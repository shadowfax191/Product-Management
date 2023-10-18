import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BrandCards = () => {

    const [brands, setBrands] = useState([])

    useEffect(() => {
        fetch('/data.json')
            .then(res => res.json())
            .then(data => setBrands(data))
    }, [])


    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-14 md:p-5 p-3 lg:p-0">
                {
                    brands.map((brand) =>
                        <div key={brand.id} >
                            <Link to={`/collection/${brand.title}`}>
                                <div className="card bg-base-100 shadow-2xl shadow-primary-focus ">
                                    <figure><img src={brand.image} className="h-60 w-full" alt="" /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title text-2xl">{brand.title}</h2>
                                    </div>

                                </div></Link>
                        </div>


                    )
                }
            </div>
        </div>
    );
};

export default BrandCards;