import axios from "axios";
import AllProductTable from "./AllProductTable";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";



const AllProduct = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
  
    // Fetch all products with automatic refetch every 1 second
    const { data: totalproduct = [], refetch } = useQuery({
      queryKey: ['/products'],
      queryFn: async () => {
        const res = await axios.get('https://bistro-boss-server-with-cart-part-4-main.vercel.app/products');
        return res.data;
      },
      refetchInterval: 1000, // Automatically refetch every 1 second
    });
  
    // Filter products based on the search term
    const filteredProducts = totalproduct.filter((product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    // Calculate total pages for pagination
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  
    // Slice the filtered products array to get the products for the current page
    const currentProducts = filteredProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  
    // Handle search input changes
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1); // Reset to the first page when starting a new search
    };
  
    // Handle pagination
    const handlePageChange = (newPage) => {
      if (newPage > 0 && newPage <= totalPages) {
        setCurrentPage(newPage);
      }
    };
  
    // Handle adding a product
    const handleSubmit = async (e) => {
      e.preventDefault();
      const form = e.target;
  
      const productName = form.productName.value;
      const quantity = form.quantity.value;
      const warranty = form.warranty.value;
  
      const newProduct = {
        productName,
        quantity,
        warranty,
      };
  
      try {
        const response = await axios.post('https://bistro-boss-server-with-cart-part-4-main.vercel.app/addProduct', newProduct);
        if (response.status === 201) {
          console.log('Product added successfully:', response.data);
          form.reset();
          document.getElementById('addProduct').close();
          refetch(); // Refetch the data after adding a product
        }
      } catch (error) {
        console.error('Failed to add product:', error);
      }
    };
  
    return (
      <div className="max-w-7xl mx-auto pt-10">
        <div>
          {/* Search Input */}
          <div className="flex justify-between p-5 gap-2 md:gap-10">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search products"
              className="input input-bordered input-primary w-full"
            />
            <button className="btn btn-primary" onClick={() => document.getElementById('addProduct').showModal()}>
              Add Product
            </button>
          </div>
  
          {/* Add Product Modal */}
          <dialog id="addProduct" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
              <form onSubmit={handleSubmit}>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-bold">Product Name</span>
                  </div>
                  <input
                    type="text"
                    name="productName"
                    placeholder="Type here"
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
                    placeholder="Type here"
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
                    placeholder="Type here"
                    className="input input-bordered input-primary w-full"
                    defaultValue="N/A"
                    required
                  />
                </label>
                <input type="submit" className="btn btn-primary mt-4 w-full" value="Add Product" />
              </form>
            </div>
          </dialog>
        </div>
  
        {/* Product Table */}
        <AllProductTable totalproduct={currentProducts} refetch={refetch} />
  
        {/* Pagination Controls */}
        <div className="flex justify-center mt-10 items-center gap-1 mb-20">
          <button
            className="btn btn-secondary mx-2"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <span className="mx-2">Page {currentPage} of {totalPages}</span>
          <button
            className="btn btn-secondary mx-2"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    );
  };

export default AllProduct;