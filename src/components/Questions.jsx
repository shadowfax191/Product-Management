
const Questions = () => {
    return (
        
        <div className="rounded-xl p-10 mt-10" style={{ backgroundImage: 'url(https://i.ibb.co/2gJfRR7/cool-background.png)' }}>
            <div className=" "></div>
            <div className=" text-center text-neutral-content">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:py-10 ">
                    <div className="space-y-2">
                        <div className="collapse bg-gray-600">
                            <input type="radio" name="my-accordion-1" checked="checked" />
                            <div className="collapse-title text-xl font-medium">
                               Do you have subscription option?
                            </div>
                            <div className="collapse-content">
                                <p>We do have. Contact us for more info.</p>
                            </div>
                        </div>
                        <div className="collapse bg-gray-600">
                            <input type="radio" name="my-accordion-1" />
                            <div className="collapse-title text-xl font-medium">
                               Can you refund after purchase?
                            </div>
                            <div className="collapse-content">
                                <p>Yes, We do. But it has to be under 24 hours after purchase</p>
                            </div>
                        </div>
                        <div className="collapse bg-gray-600">
                            <input type="radio" name="my-accordion-1" />
                            <div className="collapse-title text-xl font-medium">
                               Do you have Affiliate program?
                            </div>
                            <div className="collapse-content">
                                <p>yes, contact us.</p>
                            </div>
                        </div>
                    </div>
                    <img src="https://i.ibb.co/kGxK5gf/Humaaans-Chill-at-Home.png" alt="" />

                </div>
            </div>
        </div>
    );
};

export default Questions;