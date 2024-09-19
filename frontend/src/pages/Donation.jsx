import React, { useState } from "react";

const Donation = () => {
  const [donationData, setDonationData] = useState({
    name: "",
    email: "",
    amount: "",
    paymentMethod: "creditCard",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonationData({ ...donationData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle donation submission logic here
    console.log("Donation Data:", donationData);
    // Optionally, show a success message or redirect
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-8 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Donate to Our College
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={donationData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={donationData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Donation Amount(Rs)</label>
            <input
              type="number"
              name="amount"
              value={donationData.amount}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Payment Method</label>
            <select
              name="paymentMethod"
              value={donationData.paymentMethod}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="creditCard">Credit Card</option>
              <option value="debitCard">Debit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bankTransfer">Bank Transfer</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Donate
          </button>
        </form>
      </div>
    </div>
  );
};

export default Donation;
