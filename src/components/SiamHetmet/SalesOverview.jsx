import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesOverview = () => {
    const { data: invoices = [], isLoading, error } = useQuery({
        queryKey: ['/invoices'],
        queryFn: async () => {
            const res = await axios.get('https://bistro-boss-server-with-cart-part-4-main.vercel.app/invoices');
            return res.data;
        },
    });

    // State to store the selected year for filtering
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    // Extract unique years from invoices
    const availableYears = useMemo(() => {
        const years = invoices.map(invoice => new Date(invoice.createdAt).getFullYear());
        return [...new Set(years)];
    }, [invoices]);

    // Calculate total sales and best-selling product based on selected year
    const { totalSales, bestSellingProduct, monthlySales } = useMemo(() => {
        let totalSales = 0;
        const productSales = {};
        const monthlySales = {};

        invoices
            .filter(invoice => new Date(invoice.createdAt).getFullYear() === selectedYear)
            .forEach(invoice => {
                totalSales += invoice.totalPrice;

                // Count each product's quantity and accumulate by product name
                invoice.invoiceItems.forEach(item => {
                    if (!productSales[item.productName]) {
                        productSales[item.productName] = 0;
                    }
                    productSales[item.productName] += parseInt(item.quantity);
                });

                // Group sales by month for the graph
                const month = new Date(invoice.createdAt).toISOString().slice(0, 7);
                if (!monthlySales[month]) {
                    monthlySales[month] = 0;
                }
                monthlySales[month] += invoice.totalPrice;
            });

        // Identify best-selling product
        const bestSellingProduct = Object.entries(productSales).reduce(
            (acc, [product, quantity]) => (quantity > acc.quantity ? { product, quantity } : acc),
            { product: "", quantity: 0 }
        );

        return { totalSales, bestSellingProduct, monthlySales };
    }, [invoices, selectedYear]);

    // Prepare data for chart.js
    const chartData = {
        labels: Object.keys(monthlySales),
        datasets: [
            {
                label: `Monthly Sales in ${selectedYear} (TK)`,
                data: Object.values(monthlySales),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    if (isLoading) return <div className="text-center mt-8">Loading...</div>;
    if (error) return <div className="text-center text-red-500 mt-8">Error loading data</div>;

    return (
        <div className="flex flex-col items-center p-4 space-y-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-semibold text-gray-800">Sales Overview</h2>

            {/* Year Filter Dropdown */}
            <div className="flex items-center space-x-2 mb-4">
                <label htmlFor="year" className="text-lg font-medium text-gray-700">Select Year:</label>
                <select 
                    id="year" 
                    value={selectedYear} 
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="p-2 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring"
                >
                    {availableYears.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col items-center space-y-2 text-gray-700">
                <p className="text-lg">Total Sales: <span className="font-bold">৳{totalSales.toFixed(2)}</span></p>
                <p className="text-lg">
                    Best-Selling Product: 
                    <span className="font-bold"> {bestSellingProduct.product}</span> 
                    <span className="text-sm text-gray-500"> ({bestSellingProduct.quantity} units sold)</span>
                </p>
            </div>

            <div className="w-full max-w-lg lg:max-w-2xl p-4 bg-white rounded-lg shadow-md">
                <Bar 
                    data={chartData} 
                    options={{ 
                        responsive: true, 
                        plugins: { 
                            legend: { display: false }, 
                        } 
                    }} 
                />
            </div>
        </div>
    );
};

export default SalesOverview;
