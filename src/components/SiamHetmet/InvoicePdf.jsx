import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";



const InvoicePdf = () => {

    const { invoiceId } = useParams(); // Get the invoiceId from the URL

    // Fetch the invoice details based on invoiceId
    const { data: invoice, isLoading, error } = useQuery({
        queryKey: ['invoice', invoiceId],
        queryFn: async () => {
            const res = await axios.get(`https://bistro-boss-server-with-cart-part-4-main.vercel.app/invoices/${invoiceId}`);
            return res.data;
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading invoice</div>;

    const handlePrint = () => {
        window.print(); // This will open the print dialog
    };

    return (
        <div className="invoice-container p-12 overflow-auto max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="invoice-header flex justify-between mb-2 gap-4"> {/* Reduced bottom margin */}
                <div>
                <NavLink to="/">
              <img
                className="w-24"
                src="https://i.ibb.co/Ry5s6x5/7e82bec4-66a6-4bdf-b1b2-6612f913aa0d-removebg-preview.png"
                alt="logo"
              />
            </NavLink>
                    <h2 className="text-2xl font-bold">Siam Helmet</h2>
                    <p>47/1, Bangshal Road, <br/> West Side Of Puraton Chowrastha, 1100</p>
                    <p>Mobile: 01721-921206 (Office)</p>
                    <p>Mobile: 01xxxxxxxxxx (Sales)</p>
                    <p>Email: </p>
                    <p>Sold By: {invoice?.customerInfo?.soldBy || "N/A"}</p>
                </div>
                <div>
                    <div>
                        <h3 className="text-xl">Invoice</h3>
                        <p>Invoice No: {invoice.invoiceId}</p>
                        <p>Invoice Date: {new Date(invoice.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="mb-2"> {/* Reduced bottom margin */}
                        <h3 className="text-lg font-bold mt-5">Bill To</h3>
                        <p className="capitalize">Name: {invoice.customerInfo.name}</p>
                        <p>Mobile: {invoice.customerInfo.contact}</p>
                        {/* Display 'N/A' if email is missing */}
                        <p>Address: {invoice.customerInfo.address}</p>
                    </div>
                </div>
            </div>

            {/* Table of Items */}
            <table className="table-auto w-full border-collapse border mb-4"> {/* Added border to the table */}
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2 text-left">SL</th>
                        <th className="border px-4 py-2 text-left">Item</th>
                        <th className="border px-4 py-2 text-left">Warranty</th>
                        <th className="border px-4 py-2 text-left">Price</th>
                        <th className="border px-4 py-2 text-left">Quantity</th>
                        <th className="border px-4 py-2 text-left">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {invoice.invoiceItems.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{item.productName}</td>
                            <td className="border px-4 py-2">{item.warranty || "N/A"}</td>
                            <td className="border px-4 py-2">{item.price}</td>
                            <td className="border px-4 py-2">{item.quantity}</td>
                            <td className="border px-4 py-2">{item.quantity * item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Total Calculation Section */}
            <div className="flex justify-between">

                    <div className="w-2/4 text-sm">
                    <td className=" py-2 font-bold">Special Note:</td>
                        <ul className="list-disc">
                            <li>The prices listed are subject to change and are valid only as of the purchase date. Future orders may reflect updated pricing.</li>
                            <li>Please note: All sales are final. No returns or refunds will be accepted once the purchase is completed.</li>
                            <li>If a warranty is provided for any product, it is subject to specific terms and conditions. Please review these terms for details on warranty claims and eligibility.</li>
                            <li>While we ensure high product quality, minor variations in color and texture may occur due to the nature of materials used.</li>
                            <li>Delivery times are estimated and may vary. We are not responsible for delays caused by external factors, including weather or shipping provider issues.</li>
                        </ul>

                    </div>

                <table className="table-auto">
                    <tbody><tr>
                            <td className="px-4 py-2 font-bold">Total Quantity:</td>
                            <td className="px-4 py-2">{invoice.totalQuantity}</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 font-bold">Payment Type:</td>
                            <td className="px-4 py-2">{invoice.paymentType}</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 font-bold">Sub Total:</td>
                            <td className="px-4 py-2">{invoice.totalPrice}</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 font-bold">Due Amount:</td>
                            <td className="px-4 py-2">{invoice.dueAmount}</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 font-bold">Total Paid:</td>
                            <td className="px-4 py-2"> {invoice.totalPrice - invoice.dueAmount}</td>
                        </tr>
                        
                        {/* <tr>
                            <td className="px-4 py-2 font-bold">Previous Due:</td>
                            <td className="px-4 py-2">{invoice.previousDue || 0}</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 font-bold">Total Due:</td>
                            <td className="px-4 py-2">{invoice.totalPrice + (invoice.previousDue || 0)}</td>
                        </tr> */}
                    </tbody>
                </table>
            </div>

            {/* Print Button */}
            <div className="flex justify-center mt-4 print:hidden"> {/* Hide button when printing */}
                <button className="btn btn-primary" onClick={handlePrint}>
                    Print Invoice
                </button>
            </div>
        </div>
    );
};

export default InvoicePdf;