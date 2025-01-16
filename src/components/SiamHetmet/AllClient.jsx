import axios from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const AllClients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch all clients with automatic refetch every 1 second
  const { data: totalClients = [], refetch } = useQuery({
    queryKey: ['/clients'],
    queryFn: async () => {
      const res = await axios.get('https://bistro-boss-server-with-cart-part-4-main.vercel.app/clients');
      return res.data;
    },
    refetchInterval: 1000, // Automatically refetch every 1 second
  });

  // Filter clients based on the search term
  const filteredClients = totalClients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total pages for pagination
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

  // Slice the filtered clients array to get the clients for the current page
  const currentClients = filteredClients.slice(
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

  // Handle adding a client
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const contactNumber = form.contactNumber.value;
    const address = form.address.value;

    const newClient = {
      name,
      contactNumber,
      address,
    };
    console.log(newClient);
    try {
      const response = await axios.post('https://bistro-boss-server-with-cart-part-4-main.vercel.app/addClient', newClient);
      if (response.status === 201) {
        console.log('Client added successfully:', response.data);
        form.reset();
        document.getElementById('addClient').close();
        refetch(); // Refetch the data after adding a client
      }
    } catch (error) {
      console.error('Failed to add client:', error);
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
            placeholder="Search clients"
            className="input input-bordered input-primary w-full"
          />
          <button className="btn btn-primary" onClick={() => document.getElementById('addClient').showModal()}>
            Add Client
          </button>
        </div>

        {/* Add Client Modal */}
        <dialog id="addClient" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <form onSubmit={handleSubmit}>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-bold">Name</span>
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter client's name"
                  className="input input-bordered input-primary w-full"
                  required
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-bold">Contact Number</span>
                </div>
                <input
                  type="text"
                  name="contactNumber"
                  placeholder="Enter contact number"
                  className="input input-bordered input-primary w-full"
                  required
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-bold">Address</span>
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter address"
                  className="input input-bordered input-primary w-full"
                  required
                />
              </label>
              <input type="submit" className="btn btn-primary mt-4 w-full" value="Add Client" />
            </form>
          </div>
        </dialog>
      </div>

      {/* Clients Table */}
      <table className="table-auto w-full text-left">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-4 border-b-2 border-gray-300">Name</th>
            <th className="p-4 border-b-2 border-gray-300">Contact Number</th>
            <th className="p-4 border-b-2 border-gray-300">Address</th>
            <th className="p-4 border-b-2 border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentClients.map((client, index) => (
            <tr
              key={client._id}
              className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                } hover:bg-gray-200 transition-colors`}
            >
              <td className="p-4 border-b border-gray-300">{client.name}</td>
              <td className="p-4 border-b border-gray-300">{client.contactNumber}</td>
              <td className="p-4 border-b border-gray-300">{client.address}</td>
              <td className="p-4 border-b border-gray-300">

                <Link to={`/clientprofile/${client._id}`}>
                  <button className="btn btn-info">View Profile</button>
                </Link>



              </td>
            </tr>
          ))}
        </tbody>
      </table>


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

export default AllClients;
