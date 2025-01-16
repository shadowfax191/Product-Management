import { useState } from "react";
import dayjs from "dayjs"; // Day.js for date formatting
import axios from "axios";

// eslint-disable-next-line react/prop-types
const AllProductTable = ({ totalproduct, refetch, isLoading }) => {  // Add isLoading prop

    const [editingProduct, setEditingProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEdit = (product) => {
        // Set the product that is being edited
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedProduct = {
            productName: form.productName.value,
            quantity: form.quantity.value,
            warranty: form.warranty.value,
        };

        try {
            // Use product ID to update the product in the database
            await axios.put(`https://bistro-boss-server-with-cart-part-4-main.vercel.app/products/${editingProduct._id}`, updatedProduct);
            form.reset();
            setIsModalOpen(false);
            setEditingProduct(null);
            refetch(); // Refetch the data after updating
        } catch (error) {
            console.error('Failed to update product:', error);
        }
    };

    const handleDelete = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await axios.delete(`https://bistro-boss-server-with-cart-part-4-main.vercel.app/products/${productId}`);
                refetch(); // Refetch the data to update the product list after deletion
            } catch (error) {
                console.error('Failed to delete product:', error);
            }
        }
    };

    if (isLoading) {
        return (
            <div className="text-center p-4">
                <p className="text-lg font-semibold">Loading...</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full bg-white shadow-md rounded-lg">
                <thead className="bg-gray-100 border-b">
                    <tr>
                        <th className="text-left p-4 font-semibold text-gray-600">Product Name</th>
                        <th className="text-left p-4 font-semibold text-gray-600">Quantity</th>
                        <th className="text-left p-4 font-semibold text-gray-600">Warranty</th>
                        <th className="text-left p-4 font-semibold text-gray-600">Entry Date</th>
                        <th className="text-left p-4 font-semibold text-gray-600">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {totalproduct.map((product) => (
                        <tr key={product._id} className="border-b hover:bg-gray-50">
                            <td className="p-4">{product.productName}</td>
                            <td className="p-4">{product.quantity}</td>
                            <td className="p-4">{product.warranty}</td>
                            <td className="p-4">{dayjs(product.entryDate).format('DD/MM/YYYY')}</td>
                            <td className="p-4">
                                <button className="btn btn-sm btn-primary mr-2" onClick={() => handleEdit(product)}>Edit</button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(product._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isModalOpen && (
                <dialog id="editProductModal" className="modal bg-opacity-50" open>
                    <div className="modal-box bg-slate-200 shadow-2xl shadow-slate-600" >
                        <form method="dialog">
                            <button
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={() => {
                                    setEditingProduct(null);
                                    setIsModalOpen(false); // Close the modal
                                }}
                            >
                                ✕
                            </button>
                        </form>
                        <form onSubmit={handleEditSubmit}>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text font-bold">Product Name</span>
                                </div>
                                <input
                                    type="text"
                                    name="productName"
                                    defaultValue={editingProduct.productName}
                                    className="input input-bordered input-primary w-full"
                                    required
                                />
                            </label>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text font-bold">Quantity</span>
                                </div>
                                <input
                                    type="number"
                                    name="quantity"
                                    defaultValue={editingProduct.quantity}
                                    className="input input-bordered input-primary w-full"
                                    required
                                />
                            </label>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text font-bold">Warranty</span>
                                </div>
                                <input
                                    type="text"
                                    name="warranty"
                                    defaultValue={editingProduct.warranty}
                                    className="input input-bordered input-primary w-full"
                                    required
                                />
                            </label>
                            <input type="submit" className="btn btn-primary mt-4 w-full" value="Update Product" />
                        </form>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default AllProductTable;
