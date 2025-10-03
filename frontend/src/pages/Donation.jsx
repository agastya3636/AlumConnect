import { useState } from "react";

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
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 p-4 md:p-8 flex items-center justify-center">
      <div className="bg-white dark:bg-slate-900/60 dark:border dark:border-slate-700 dark:shadow-none rounded-lg shadow-lg p-4 md:p-6 max-w-4xl w-full">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-slate-100 mb-4 md:mb-6 text-center">
          Donate to Our College
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="block text-gray-700 dark:text-slate-300 text-sm md:text-base">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={donationData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg text-sm md:text-base border-gray-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-slate-300 text-sm md:text-base">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={donationData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg text-sm md:text-base border-gray-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 dark:text-slate-300 text-sm md:text-base">
              Donation Amount (Rs)
            </label>
            <input
              type="number"
              name="amount"
              value={donationData.amount}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg text-sm md:text-base border-gray-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 placeholder:text-slate-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-slate-300 text-sm md:text-base">
              Payment Method
            </label>
            <select
              name="paymentMethod"
              value={donationData.paymentMethod}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg text-sm md:text-base border-gray-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
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
            className="w-full bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-500 transition duration-200 text-sm md:text-base"
          >
            Donate
          </button>
        </form>
      </div>
    </div>
  );
};

export default Donation;