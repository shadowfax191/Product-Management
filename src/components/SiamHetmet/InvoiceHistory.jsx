import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";


const InvoiceHistory = () => {
    const { data: invoices = [], isLoading, error } = useQuery({
        queryKey: ['/invoices'],
        queryFn: async () => {
            const res = await axios.get('https://bistro-boss-server-with-cart-part-4-main.vercel.app/invoices');
            return res.data;
        },
    });

    console.log(invoices);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading invoices</div>;
    }

    return (
        <div className="p-6 max-w-screen-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">Invoice History</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2 text-left">Invoice ID</th>
                            <th className="border px-4 py-2 text-left">Customer Name</th>
                            <th className="border px-4 py-2 text-left">Date</th>
                            <th className="border px-4 py-2 text-left">Total Quantity</th>
                            <th className="border px-4 py-2 text-left">Total Price</th>
                            <th className="border px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                <td className="border px-4 py-2">{invoice.invoiceId}</td>
                                <td className="border px-4 py-2 capitalize">{invoice.customerInfo.name}</td>
                                <td className="border px-4 py-2">{new Date(invoice.createdAt).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">{invoice.totalQuantity}</td>
                                <td className="border px-4 py-2">{invoice.totalPrice}</td>
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
        </div>
    );
};


export default InvoiceHistory;