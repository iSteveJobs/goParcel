import React from "react";
import locationMerchantImg from "../../../assets/location-merchant.png";

const BeMerchant = () => {
  return (
    <div
      data-aos="zoom-in-up"
      className="bg-blue-800 p-20 rounded-4xl bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat"
    >
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={locationMerchantImg} />
        <div>
          <h1 className="text-4xl font-extrabold">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="py-6">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          {/* <button className="btn bg-green-700 rounded-full border-0">Become a Merchant</button>
          <button className="btn btn-outline rounded-full hover:bg-green-500 hover:border-0 lg:ms-4">Earn with goParcel Courier</button> */}
          <div className="flex flex-col gap-3 lg:flex-row lg:gap-0 lg:items-center">
            <button className="btn bg-green-700 rounded-full border-0">
              Become a Merchant
            </button>

            <button
              className="btn btn-outline border-green-700 text-green-500 rounded-full
                   hover:bg-white hover:border-0 mt-3 lg:mt-0 lg:ms-4"
            >
              Earn with goParcel Courier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeMerchant;
