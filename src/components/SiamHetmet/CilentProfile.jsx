import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const CilentProfile = () => {

    const { clientId } = useParams(); // Retrieve the client ID from the URL

    const { data: invoices = [], isLoading, error } = useQuery({
        queryKey: ['/invoices'],
        queryFn: async () => {
            const res = await axios.get('https://bistro-boss-server-with-cart-part-4-main.vercel.app/invoices');
            return res.data;
        },
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading invoices</div>;
    }

    // Filter invoices to show only those that match the client ID
    const filteredInvoices = invoices.filter(invoice => invoice.customerInfo.id === clientId);

    // Calculate the total due amount
    const totalDueAmount = filteredInvoices.reduce((total, invoice) => total + parseFloat(invoice.dueAmount), 0);

    return (
        <div className="p-6 max-w-screen-2xl mx-auto">
            {filteredInvoices.length > 0 && (
                <h1 className="text-2xl font-bold mb-4 text-center capitalize">
                    {filteredInvoices[0].customerInfo.name} Invoice History
                </h1>
            )}

            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2 text-left">Invoice ID</th>
                            <th className="border px-4 py-2 text-left">Customer Name</th>
                            <th className="border px-4 py-2 text-left">Date</th>
                            <th className="border px-4 py-2 text-left">Total Quantity</th>
                            <th className="border px-4 py-2 text-left">Total Price</th>
                            <th className="border px-4 py-2 text-left">Due Amount</th>
                            <th className="border px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInvoices.map((invoice, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                <td className="border px-4 py-2">{invoice.invoiceId}</td>
                                <td className="border px-4 py-2 capitalize">{invoice.customerInfo.name}</td>
                                <td className="border px-4 py-2">{new Date(invoice.createdAt).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">{invoice.totalQuantity}</td>
                                <td className="border px-4 py-2">{invoice.totalPrice}</td>
                                <td className="border px-4 py-2">{invoice.dueAmount}</td>
                                <td className="border px-4 py-2">
                                    <Link to={`/invoice/${invoice.invoiceId}`} className="btn btn-sm btn-primary">
                                        View Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredInvoices.length > 0 && (
                <div className="mt-4 text-right font-bold">
                    <p>Total Due Amount: ${totalDueAmount.toFixed(2)}</p>
                </div>
            )}
        </div>
    );
};


export default CilentProfile;