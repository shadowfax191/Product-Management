import Banner from "./Banner";
import BrandCards from "./BrandCards";

import Questions from "./Questions";
import Top from "./Top";


const Home = () => {
    return (
        <div className="max-w-7xl mx-auto " >
           <Banner></Banner>
           <BrandCards></BrandCards>
           <Top></Top>
           <h2 className="text-6xl font-bold px-10">F<span className="text-primary">.</span>A<span className="text-primary">.</span>Q</h2>
           <Questions></Questions>
        </div>
    );
};

export default Home;