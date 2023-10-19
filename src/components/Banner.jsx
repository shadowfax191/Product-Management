/* eslint-disable react/no-unescaped-entities */

const Banner = () => {
    return (
        <div>
            <div className=" my-2 md:mb-20 md:my-10 p-3 md:p-5 lg:p-0">
  <div className="hero flex flex-col lg:flex-row-reverse items-center">
    <div className="flex-1">
    <img src="https://i.ibb.co/BjrYQHT/OTTApp-Builders-1585296767860.jpg" className="  rounded-lg shadow-2xl mb-4 lg:mb-0 md:mb-10" />
    </div>
    <div className="flex-1 space-y-4">
      <h1 className="text-5xl font-bold text-center">Welcome to the World of <br /> <span className="text-primary">Entertainment</span> </h1>
      <p className="text-center text-lg font-semibold">Cheers to the Best Hours: <span className="text-primary text-xl">Happy Hour Delights</span> </p>
      <p className="">we create unforgettable experiences that turn ordinary moments into extraordinary memories. Join us for Happy Hour Delights and embark on a journey filled with fun, laughter, and excitement. Get ready to indulge in the best hours of your day as you explore a world of entertainment that's second to none.</p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
        </div>
    );
};

export default Banner;