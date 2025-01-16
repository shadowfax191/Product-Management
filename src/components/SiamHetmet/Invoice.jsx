import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

const Invoice = () => {
    const [saleType, setSaleType] = useState('retail'); // Retail/Wholesale selection
    const [clientQuery, setClientQuery] = useState('');  // Search for client
    const [filteredClients, setFilteredClients] = useState([]);


    const [customerInfo, setCustomerInfo] = useState({ name: '', contact: '', address: '',id:'' });
    const [selectedProduct, setSelectedProduct] = useState({ productName: '', quantity: 1, price: 0, warranty: '' });
    const [invoiceItems, setInvoiceItems] = useState([]);
    const [paymentType, setPaymentType] = useState('Cash');  // New Payment Type State
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [query, setQuery] = useState('');
    const [dueAmount, setDueAmount] = useState(0);  // Track due amount



    const { data: totalClients = [] } = useQuery({
        queryKey: ['/clients'],
        queryFn: async () => {
            const res = await axios.get('https://bistro-boss-server-with-cart-part-4-main.vercel.app/clients');
            return res.data;
        },
    });

    useEffect(() => {
        if (clientQuery) {
            const filtered = totalClients.filter((client) =>
                client.name.toLowerCase().includes(clientQuery.toLowerCase())
            );
            setFilteredClients(filtered);
        } else {
            setFilteredClients([]);
        }
    }, [clientQuery, totalClients]);

    const handleClientSelect = (client) => {
        setCustomerInfo({ name: client.name, contact: client.contactNumber, address: client.address,id: client._id });
        setClientQuery(client.name);  // This will populate the search input with the selected client's name
        setFilteredClients([]);  // Hide client suggestions after selection
    };


    // Fetch products using useQuery
    const { data: totalproduct = [] } = useQuery({
        queryKey: ['/products'],
        queryFn: async () => {
            const res = await axios.get('https://bistro-boss-server-with-cart-part-4-main.vercel.app/products');
            return res.data;
        },
    });

    // Filter products based on query for autocomplete
    useEffect(() => {
        if (query) {
            const filtered = totalproduct.filter((product) =>
                product.productName.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts([]);
        }
    }, [query, totalproduct]);

    const handleCustomerInputChange = (e) => {
        setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
    };

    const handleProductChange = (e) => {
        setSelectedProduct({ ...selectedProduct, [e.target.name]: e.target.value });
    };

    const handleProductSelect = (productName) => {
        const selected = totalproduct.find(product => product.productName === productName);
        if (selected) {
            setSelectedProduct({
                productName: selected.productName,
                quantity: 1,
                price: selected.price,
                warranty: selected.warranty || 'N/A',  // Assign warranty if available
            });
            setQuery(selected.productName);
            setFilteredProducts([]); // Hide the suggestion list after selecting
        }
    };

    const addProductToInvoice = () => {
        // Check if price is properly set
        if (!selectedProduct.price || selectedProduct.price <= 0) {
            alert("Please select a valid product with a price.");
            return;
        }

        setInvoiceItems([...invoiceItems, selectedProduct]);
        setSelectedProduct({ productName: '', quantity: 1, price: 0, warranty: '' });
        resetForm();
        setShowAddModal(false);
    };

    const editProductInInvoice = () => {
        const updatedItems = invoiceItems.map((item, index) =>
            index === editingIndex ? selectedProduct : item
        );
        setInvoiceItems(updatedItems);
        setEditingIndex(null);
        setShowEditModal(false);
    };

    const editProduct = (index) => {
        const productToEdit = invoiceItems[index];
        setSelectedProduct(productToEdit);
        setEditingIndex(index);
        setShowEditModal(true);
    };

    const removeProduct = (index) => {
        setInvoiceItems(invoiceItems.filter((_, i) => i !== index));
    };

    const totalQuantity = invoiceItems.reduce((acc, item) => acc + parseInt(item.quantity, 10), 0);
    const totalPrice = invoiceItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

    const resetForm = () => {
        setQuery(''); // Reset the search input
        setSelectedProduct({ productName: '', quantity: 1, price: 0, warranty: '' });
    };

    const handleCheckout = async () => {
        if (!customerInfo.name || !customerInfo.contact || !customerInfo.address) {
            alert('Please fill out all customer information fields.');
            return;
        }

        if (invoiceItems.length === 0) {
            alert('Please add at least one product to the invoice.');
            return;
        }

        const invoiceData = {
            customerInfo,
            invoiceItems,
            totalQuantity,
            totalPrice,
            paymentType,
            dueAmount: paymentType === 'Due' ? dueAmount : 0,  // Include due amount only if payment type is "Due"
        };
        

        console.log(invoiceData);

        try {
            // Save invoice to the database
            const response = await axios.post('https://bistro-boss-server-with-cart-part-4-main.vercel.app/invoices', invoiceData);
            const { invoiceId } = response.data;

            // Update the product quantities in the database
            for (let item of invoiceItems) {
                const product = totalproduct.find(p => p.productName === item.productName);
                const newQuantity = product.quantity - item.quantity;
                await axios.put(`https://bistro-boss-server-with-cart-part-4-main.vercel.app/products/${product._id}`, { ...product, quantity: newQuantity });
            }

            

            // Navigate to the invoice page with the generated invoice ID
            window.location.href = `/invoice/${invoiceId}`;
        } catch (error) {
            console.error('Failed to save the invoice:', error);
        }
    };

    return (
        <div className="p-6 max-w-screen-2xl mx-auto">
            {/* Customer Info Section */}
            <div className="mb-4">
                <label className="label font-bold">Sale Type</label>
                <select
                    className="input input-bordered w-full"
                    value={saleType}  // Add a state for saleType: retail/wholesale
                    onChange={(e) => setSaleType(e.target.value)}
                    autoComplete="off"
                >
                    <option value="retail">Retail</option>
                    <option value="wholesale">Wholesale</option>
                </select>
            </div>
            {saleType === 'wholesale' && (
                <div className="mb-4">
                    <label className="label font-bold">Search Client</label>
                    <input
                        type="text"
                        placeholder="Search Client"
                        className="input input-bordered w-full"
                        value={clientQuery}  // Add a state for clientQuery
                        onChange={(e) => setClientQuery(e.target.value)}
                        autoComplete="off"
                    />
                    {filteredClients.length > 0 && (
                        <ul className="bg-white border max-h-36 overflow-y-auto">
                            {filteredClients.map((client, index) => (
                                <li
                                    key={index}
                                    className="p-2 cursor-pointer hover:bg-gray-200"
                                    onClick={() => handleClientSelect(client)}  // This will auto-fill customer info
                                >
                                    {client.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            <div className="grid grid-cols-3 gap-4 mb-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Customer Name"
                    className="input input-bordered w-full"
                    value={customerInfo.name}
                    onChange={handleCustomerInputChange}
                    autoComplete="off"
                />
                <input
                    type="text"
                    name="contact"
                    placeholder="Customer Contact"
                    className="input input-bordered w-full"
                    value={customerInfo.contact}
                    onChange={handleCustomerInputChange}
                    autoComplete="off"
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Customer Address"
                    className="input input-bordered w-full"
                    value={customerInfo.address}
                    onChange={handleCustomerInputChange}
                    autoComplete="off"
                />
            </div>

            {/* Payment Type Section */}
            <div className="mb-4">
                <label className="label font-bold">Payment Type</label>
                <select
                    className="input input-bordered w-full"
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value)}
                    autoComplete="off"
                >
                    <option value="Cash">Cash</option>
                    <option value="Due">Due</option>
                    <option value="Bkash/Nogod">Bkash/Nogod</option>
                    <option value="Full Payment">Full Payment</option>
                </select>
            </div>
            {
        paymentType === 'Due' && (
            <div className="mb-4">
                <label className="label font-bold">Due Amount</label>
                <input
                    type="number"
                    placeholder="Enter Due Amount"
                    className="input input-bordered w-full"
                    value={dueAmount}  // Add a state for dueAmount
                    onChange={(e) => setDueAmount(e.target.value)}
                />
            </div>
        )
    }

            {/* Add Product Button */}
            <div className="flex justify-center">
                <button className="btn btn-primary mb-4" onClick={() => setShowAddModal(true)}>
                    Add Product
                </button>
            </div>

            {/* Add Product Modal */}
            {showAddModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Add Product</h3>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault(); // Prevent default form submission
                                addProductToInvoice();
                            }}
                            className="form-control"
                        >
                            {/* Product Name */}
                            <label className="label">Product Name</label>
                            <input
                                type="text"
                                name="productName"
                                placeholder="Search Product"
                                className="input input-bordered"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                autoComplete="off"
                                required
                            />
                            {filteredProducts.length > 0 && (
                                <ul className="bg-white border max-h-36 overflow-y-auto">
                                    {filteredProducts.map((product, index) => (
                                        <li
                                            key={index}
                                            className="p-2 cursor-pointer hover:bg-gray-200"
                                            onClick={() => handleProductSelect(product.productName)}
                                        >
                                            {product.productName}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* Quantity */}
                            <label className="label">Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Quantity"
                                className="input input-bordered"

                                onChange={handleProductChange}
                                required
                                autoComplete="off"
                            />

                            {/* Price */}
                            <label className="label">Price</label>
                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                className="input input-bordered"

                                onChange={handleProductChange}
                                required
                                autoComplete="off"
                            />

                            {/* Warranty */}
                            <label className="label">Warranty</label>
                            <input
                                type="text"
                                name="warranty"
                                placeholder="Warranty"
                                className="input input-bordered"
                                value={selectedProduct.warranty}
                                onChange={handleProductChange}
                                required
                                autoComplete="off"
                            />

                            {/* Actions */}
                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary">
                                    Save Product
                                </button>
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() => {
                                        setShowAddModal(false);
                                        resetForm(); // Reset the form on cancel
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Product Modal */}
            {showEditModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Edit Product</h3>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault(); // Prevent default form submission
                                editProductInInvoice();
                            }}
                            className="form-control"
                        >
                            {/* Product Name */}
                            <label className="label">Product Name</label>
                            <input
                                type="text"
                                name="productName"
                                className="input input-bordered"
                                value={selectedProduct.productName}
                                onChange={handleProductChange}
                                autoComplete="off"
                                required
                            />

                            {/* Quantity */}
                            <label className="label">Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                className="input input-bordered"
                                value={selectedProduct.quantity}
                                autoComplete="off"
                                onChange={handleProductChange}
                                required
                            />

                            {/* Price */}
                            <label className="label">Price</label>
                            <input
                                type="number"
                                name="price"
                                className="input input-bordered"
                                value={selectedProduct.price}
                                autoComplete="off"
                                onChange={handleProductChange}
                                required
                            />

                            {/* Warranty */}
                            <label className="label">Warranty</label>
                            <input
                                type="text"
                                name="warranty"
                                className="input input-bordered"
                                value={selectedProduct.warranty}
                                onChange={handleProductChange}
                                required
                            />

                            {/* Actions */}
                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary">
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() => {
                                        setShowEditModal(false);
                                        resetForm(); // Reset the form on cancel
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Product Table */}
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2 text-left">SL</th>
                            <th className="border px-4 py-2 text-left">Product Name</th>
                            <th className="border px-4 py-2 text-left">Warranty</th>
                            <th className="border px-4 py-2 text-left">Quantity</th>
                            <th className="border px-4 py-2 text-left">Price</th>
                            <th className="border px-4 py-2 text-left">Total</th>
                            <th className="border px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoiceItems.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{item.productName}</td>
                                <td className="border px-4 py-2">{item.warranty}</td>
                                <td className="border px-4 py-2">{item.quantity}</td>
                                <td className="border px-4 py-2">{item.price}</td>
                                <td className="border px-4 py-2">{item.quantity * item.price}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        className="btn btn-sm btn-warning mr-2"
                                        onClick={() => editProduct(index)}
                                    >
                                        Edit
                                    </button>
                                    <button className="btn btn-sm btn-error" onClick={() => removeProduct(index)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {/* Total Quantity and Price Row */}
                        <tr className="bg-gray-300">
                            <td className="border px-4 py-2" colSpan="2"></td> {/* Empty cells to align totals */}
                            <td className="border text-right font-bold px-4 py-2">Total Quantity</td>
                            <td className="border font-bold px-4 py-2 text-center">{totalQuantity}</td>
                            <td className="border text-right font-bold px-4 py-2">Total Price</td>
                            <td className="border font-bold px-4 py-2 text-center">{totalPrice}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center">
                <button
                    className="btn btn-primary mt-4"
                    onClick={handleCheckout}
                >
                    Check Out
                </button>
            </div>
        </div>
    );
};

export default Invoice;
