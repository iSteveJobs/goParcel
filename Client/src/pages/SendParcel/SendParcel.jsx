import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FaCreditCard, FaEdit, FaTruck } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const MySwal = withReactContent(Swal);

const calculateCostComponents = ({
  parcelType,
  weight,
  senderDistrict,
  receiverDistrict,
}) => {
  const w = Number(weight) || 0;
  const withinDistrict = senderDistrict === receiverDistrict;

  let baseCost = 0,
    extraCost = 0,
    breakdown = [];

  if (parcelType === "document") {
    baseCost = withinDistrict ? 60 : 80;
    breakdown.push(`Base Cost: ৳ ${baseCost}`);
  } else {
    if (w <= 3) {
      baseCost = withinDistrict ? 110 : 150;
      breakdown.push(`Base Cost: ৳ ${baseCost}`);
    } else {
      baseCost = withinDistrict ? 110 : 150;
      const extraKg = w - 3;
      const extraKgCost = extraKg * 40;
      extraCost = extraKgCost;
      if (!withinDistrict) extraCost += 40;
      breakdown.push(`Base Cost: ৳ ${baseCost}`);
      breakdown.push(`Extra kg (${extraKg}kg × 40) = ৳ ${extraKgCost}`);
      if (!withinDistrict) breakdown.push(`Outside District Extra = ৳ 40`);
    }
  }

  return {
    baseCost,
    extraCost,
    breakdown,
    totalCost: baseCost + extraCost,
    weight: w,
    withinDistrict,
  };
};

const generateTrackingID = () => {
  const date = new Date();
  const datePart = date.toISOString().split("T")[0].replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `PCL-${datePart}-${rand}`;
};

const SendParcel = () => {
  const [toastVisible, setToastVisible] = useState(false);
  const { register, watch, handleSubmit } = useForm();
  const { user } = useAuth();
  const serviceCenters = useLoaderData();

  const senderDistrict = watch("senderDistrict");
  const receiverDistrict = watch("receiverDistrict");
  const parcelType = watch("parcelType");

  const uniqueRegions = [...new Set(serviceCenters.map((w) => w.region))];
  const getDistrictsByRegion = (region) =>
    serviceCenters.filter((w) => w.region === region).map((w) => w.district);

  const handleConfirm = (data, totalCost) => {
    const parcelPayload = {
      ...data,
      deliveryCost: totalCost,
      created_by: user.email,
      creation_date: new Date().toISOString(),
      status: "pending",
      payment_status: "unpaid",
      delivery_status: "not_collected",
      tracking_id: generateTrackingID(),
    };
    console.log("Saved Parcel:", parcelPayload);
    Swal.fire("Success!", "Parcel booked successfully!", "success");
  };

  const onSubmit = (data) => {
    if (toastVisible) return;
    setToastVisible(true);

    const { breakdown, totalCost, weight, withinDistrict } =
      calculateCostComponents({
        parcelType: data.parcelType,
        weight: data.weight,
        senderDistrict: data.senderDistrict,
        receiverDistrict: data.receiverDistrict,
      });

    MySwal.fire({
      title: (
        <div className="flex flex-col items-center gap-2 text-center">
          <FaTruck className="text-5xl text-green-500" />
          <span className="text-xl font-semibold mt-2">
            Delivery Cost Breakdown
          </span>
        </div>
      ),
      html: (
        <div className="text-left mt-3 space-y-1 text-gray-700">
          <p>
            <b>Parcel Type:</b> {data.parcelType}
          </p>
          <p>
            <b>Weight:</b> {weight} kg
          </p>
          <p>
            <b>Delivery Zone:</b>{" "}
            {withinDistrict ? "Within District" : "Outside District"}
          </p>
          <hr className="my-2 border-gray-300" />
          {breakdown.map((b, idx) => (
            <p key={idx}>{b}</p>
          ))}
          <hr className="my-2 border-gray-300" />
          <p className="text-lg font-bold text-green-600">
            Total Cost: ৳ {totalCost}
          </p>
        </div>
      ),
      showCancelButton: true,
      confirmButtonText: (
        <span className="flex items-center gap-2">
          <FaCreditCard /> Proceed to Payment
        </span>
      ),
      cancelButtonText: (
        <span className="flex items-center gap-2">
          <FaEdit /> Continue Editing
        </span>
      ),
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#ef4444",
      allowOutsideClick: false,
    }).then((result) => {
      setToastVisible(false);
      if (result.isConfirmed) handleConfirm(data, totalCost);
    });
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 font-inter">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
        Send Parcel
      </h1>
      <p className="text-center text-gray-500 mb-12">
        Door-to-Door Parcel Delivery
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        {/* Parcel Info */}
        <div className="bg-cyan-50 rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Parcel Info
          </h2>
          <div className="flex flex-wrap gap-6 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="document"
                {...register("parcelType", { required: true })}
                className="radio radio-primary"
              />
              Document
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="non-document"
                {...register("parcelType", { required: true })}
                className="radio radio-primary"
              />
              Non Document
            </label>
          </div>
          <input
            type="text"
            placeholder="Describe your parcel"
            className="input input-bordered w-full mb-4 focus:ring-2 focus:ring-green-400"
            {...register("parcelName", { required: true })}
          />
          {parcelType === "non-document" && (
            <input
              type="number"
              placeholder="Weight (kg)"
              className="input input-bordered w-full focus:ring-2 focus:ring-green-400"
              {...register("weight")}
            />
          )}
        </div>

        {/* Sender & Receiver */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Sender */}
          <div className="bg-cyan-50 rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Sender Info
            </h2>
            <input
              placeholder="Sender Name"
              className="input input-bordered w-full mb-3 focus:ring-2 focus:ring-green-400"
              {...register("senderName", { required: true })}
            />
            <input
              placeholder="Contact"
              className="input input-bordered w-full mb-3 focus:ring-2 focus:ring-green-400"
              {...register("senderContact", { required: true })}
            />
            <div className="grid grid-cols-2 gap-3 mb-3">
              <select
                className="select select-bordered focus:ring-2 focus:ring-green-400"
                {...register("senderDistrict", { required: true })}
              >
                <option value="">Select Region</option>
                {uniqueRegions.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <select
                className="select select-bordered focus:ring-2 focus:ring-green-400"
                {...register("senderServiceCenter", { required: true })}
              >
                <option value="">Select Service Center</option>
                {getDistrictsByRegion(senderDistrict).map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>
            <input
              placeholder="Pickup Address"
              className="input input-bordered w-full mb-3 focus:ring-2 focus:ring-green-400"
              {...register("senderAddress", { required: true })}
            />
            <textarea
              placeholder="Pickup Instruction"
              className="textarea textarea-bordered w-full focus:ring-2 focus:ring-green-400"
              {...register("pickupInstruction", { required: true })}
            />
          </div>

          {/* Receiver */}
          <div className="bg-cyan-50 rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Receiver Info
            </h2>
            <input
              placeholder="Receiver Name"
              className="input input-bordered w-full mb-3 focus:ring-2 focus:ring-green-400"
              {...register("receiverName", { required: true })}
            />
            <input
              placeholder="Contact"
              className="input input-bordered w-full mb-3 focus:ring-2 focus:ring-green-400"
              {...register("receiverContact", { required: true })}
            />
            <div className="grid grid-cols-2 gap-3 mb-3">
              <select
                className="select select-bordered focus:ring-2 focus:ring-green-400"
                {...register("receiverDistrict", { required: true })}
              >
                <option value="">Select Region</option>
                {uniqueRegions.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <select
                className="select select-bordered focus:ring-2 focus:ring-green-400"
                {...register("receiverServiceCenter", { required: true })}
              >
                <option value="">Select Service Center</option>
                {getDistrictsByRegion(receiverDistrict).map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>
            <input
              placeholder="Delivery Address"
              className="input input-bordered w-full mb-3 focus:ring-2 focus:ring-green-400"
              {...register("receiverAddress", { required: true })}
            />
            <textarea
              placeholder="Delivery Instruction"
              className="textarea textarea-bordered w-full focus:ring-2 focus:ring-green-400"
              {...register("deliveryInstruction", { required: true })}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button className="btn btn-primary px-14 py-3 text-lg font-semibold hover:scale-105 transition-transform duration-200">
            Submit Parcel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
