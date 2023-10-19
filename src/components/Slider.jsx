import { useEffect, useState } from "react";

const Slider = (name) => {

    const [sliders, setSliders] = useState([])

    useEffect(() => {
        fetch('/sliderData.json')
            .then(res => res.json())
            .then(data => {
                setSliders(data)
            })

    }, [])

    const filterData = sliders.filter(item => item.title == name.title)



    return (
        <div className="carousel w-full max-h-screen">
            {
                filterData.map((data, index) =>
                    <div key={index} id={`slide${index+1}`} className="carousel-item relative w-full">
                        
                                <img src={data.image} className="w-full" />
                                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                    <a href={`#slide${index===0 ?filterData.length : index}`} className="btn btn-circle">❮</a>
                                    <a href={`#slide${index===filterData.length-1 ? 1: index+2 }`} className="btn btn-circle">❯</a>
                                </div>
                            </div>

                )
            }
        </div>
    );
};

export default Slider;