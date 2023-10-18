import Banner from "./Banner";
import BrandCards from "./BrandCards";

import Questions from "./Questions";
import Top from "./Top";


const Home = () => {
    return (
        <div className="max-w-7xl mx-auto">
           <Banner></Banner>
           <BrandCards></BrandCards>
           <Questions></Questions>
           <Top></Top>
        </div>
    );
};

export default Home;