
const AddProduct = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const photo = e.target.photo.value
        const type = e.target.type.value
        const price = e.target.price.value
        const rating = e.target.rating.value
         const brandName= e.target.select.value


        console.log(name, photo, type, price, rating,brandName);


    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto my-3 md:my-20 p-5 lg:p-10 space-y-10 bg-primary-content rounded-xl">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <label className="input-group">
                            <span>Name</span>
                            <input type="text" placeholder="name" className="input input-bordered" name="name" required />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image</span>
                        </label>
                        <label className="input-group">
                            <span>Image</span>
                            <input type="text" placeholder="photo URL" name="photo" className="input input-bordered" required />
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
                                    <select name="select" className="select select-bordered rounded-none">
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
                            <input type="text" placeholder="Type" name="type" className="input input-bordered" required />
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
                            <input type="text" placeholder="price" className="input input-bordered" name="price" required />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Rating</span>
                        </label>
                        <label className="input-group">
                            <span>Rating</span>
                            <input type="number" placeholder="rating" name="rating" className="input input-bordered" required />
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
                            <input type="text" placeholder="Description" name="description" className="input input-bordered w-full h-40" required />
                        </label>

                    </div>
                </div>
                <input type="submit" value='Add Product' className="w-full btn btn-primary" />


            </form>
        </div>
    );
};

export default AddProduct;