
import { Link } from 'react-router-dom';

const Home = () => {
    window.scrollTo(0, 0);

    return (
        <div className=" mx-auto" style={{ background: "linear-gradient(135deg, #14121E, #1F1F39)", minHeight: "100vh" }}>
            {/* Banner Section */}
            <section className="text-white py-10 text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to Siam Helmet Management</h1>
                <p className="text-lg">Streamline your helmet inventory and product data with ease</p>
            </section>

            {/* Features Section */}
            <section className="py-10 text-center text-white max-w-7xl lg:mx-auto  mx-3 ">
                <h2 className="text-3xl font-bold mb-6">Core Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">


                    <Link to='/products'><div className="bg-white bg-opacity-10  p-6 rounded-lg shadow-md hover:bg-opacity-20 transition duration-300 ease-in-out">
                        <h3 className="text-2xl font-semibold mb-4">Real-Time Stock Updates</h3>
                        <p>Stay informed with instant updates on stock levels and alerts for low inventory.</p>
                    </div></Link>

                    <Link to='/invoicehistory'><div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md hover:bg-opacity-20 transition duration-300 ease-in-out">
                        <h3 className="text-2xl font-semibold mb-4">Seamless Invoice Creation</h3>
                        <p>Quickly generate, edit, and manage invoices for helmet sales with ease.</p>

                    </div></Link>
                    <Link to='/overview'><div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md hover:bg-opacity-20 transition duration-300 ease-in-out">
                        <h3 className="text-2xl font-semibold mb-4">Comprehensive Sales Analytics</h3>
                        <p>Analyze sales trends and inventory data to make data-driven decisions effortlessly.</p>
                    </div></Link>

                </div>
            </section>


        </div>
    );
};

export default Home;
