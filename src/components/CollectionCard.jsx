import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CollectionCard = () => {
    const { title } = useParams([])
    console.log(title);
    const [collection, setCollecTion] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/users') 
        .then(res=>res.json())
        .then(data=>{
           setCollecTion(data);
        })
    }, [])


    return (
        <div>

        </div>
    );
};

export default CollectionCard;