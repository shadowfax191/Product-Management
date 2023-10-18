import {  useParams } from "react-router-dom";

const CollectionCard = () => {
    const {title}=useParams([])
    console.log(title);




    return (
        <div>
            
        </div>
    );
};

export default CollectionCard;