import toast, { Toaster } from "react-hot-toast";
import { useLoaderData } from "react-router-dom";


const UpdateData = () => {
    window.scrollTo(0, 0)
    const data = useLoaderData()
     
    const handleUpdate=(e)=>{
        e.preventDefault()
        const name = e.target.name.value
        const photo = e.target.photo.value
        const type = e.target.type.value
        const price = e.target.price.value
        const rating = e.target.rating.value
         const brandName= e.target.select.value
         const description=e.target.description.value
       const myData={name, photo, type, price, rating,brandName,description};
       
       fetch(`https://express-assignment-psi.vercel.app/users/${data._id}`,{
        method:'PUT',
        headers:{
            "content-Type":'application/json'
        },
        body:JSON.stringify(myData)

    })
    .then(res =>res.json())
    .then(data=>{
        if(data.acknowledged){
            toast.success('Successfully Updated to Database',{
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                  padding:'10px'
                },
              })
        }
    })


    }


   
    return (
        <div>
             <form onSubmit={handleUpdate} className="  max-w-3xl mx-auto my-3 md:my-20 p-5 lg:p-10 space-y-10 bg-primary-content rounded-xl">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <label className="input-group">
                            <span>Name</span>
                            <input type="text" defaultValue={data?.name} placeholder="name" className="input input-bordered" name="name" required />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image</span>
                        </label>
                        <label className="input-group">
                            <span>Image</span>
                            <input type="text" defaultValue={data?.photo} placeholder="photo URL" name="photo" className="input input-bordered" required />
                        </label>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Brands Name</span>
                        </label>
                        <label className="input-group">
                            <span>Brand Name</span>
                            <div className="form-control rounded-none">
                                <div className="input-group rounded-none">
                                    <select defaultValue={data?.select} required name="select" className="select select-bordered rounded-none">
                                        <option >Disney</option>
                                        <option>Netflix</option>
                                        <option>Warner Bros.</option>
                                        <option>Sony Pictures</option>
                                        <option>Spotify</option>
                                        <option>Amazon Prime</option>
                                    </select>
                                </div>
                            </div>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Type</span>
                        </label>
                        <label className="input-group">
                            <span>Type</span>
                            <input type="text" defaultValue={data?.type} placeholder="Type" name="type" className="input input-bordered" required />
                        </label>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <label className="input-group">
                            <span>price</span>
                            <input type="text" defaultValue={data?.price} placeholder="price" className="input input-bordered" name="price" required />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Rating</span>
                        </label>
                        <label className="input-group">
                            <span>Rating</span>
                            <input type="number" defaultValue={data?.rating} placeholder="rating" name="rating" className="input input-bordered" min={0} max={5} required />
                        </label>
                    </div>
                </div>
                <div className="">
                    <div className="">
                        <label className="">
                            <span className="label-text">Description</span>
                        </label>
                        <label className="input-group">
                            <span>Description</span>
                            <input type="text" defaultValue={data?.description} placeholder="Description" name="description" className="input input-bordered w-full h-40" required />
                        </label>

                    </div>
                </div>
                <input type="submit" value='Update Product' className="w-full btn btn-primary" />


            </form>
            <Toaster ></Toaster>
        </div>
    );
};

export default UpdateData;