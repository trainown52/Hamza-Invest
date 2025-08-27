"use client";

import { useState, ChangeEvent, FormEvent } from "react";

// ✅ Define form type
interface KycForm {
  fullName: string;
  dob: string;
  address: string;
  country: string;
  idType: string;
  idNumber: string;
  idFile: File | null;
}

export default function KycPage() {
  const [form, setForm] = useState<KycForm>({
    fullName: "",
    dob: "",
    address: "",
    country: "",
    idType: "",
    idNumber: "",
    idFile: null,
  });
  const [submitted, setSubmitted] = useState(false);

  // ✅ Strong typing for inputs + select + file
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    const files = (e.target as HTMLInputElement).files;

    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  }

  // ✅ Strong typing for form submit
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", form.fullName);
    formData.append("dob", form.dob);
    formData.append("address", form.address);
    formData.append("country", form.country);
    formData.append("idType", form.idType);
    formData.append("idNumber", form.idNumber);
    if (form.idFile) formData.append("idFile", form.idFile);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/kyc", {
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to submit KYC");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-12">
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-black mb-2 text-center">
          KYC Verification
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Complete your KYC to unlock all features
        </p>
        {submitted ? (
          <div className="text-center py-10">
            <h3 className="text-xl font-semibold text-black mb-2">
              Thank you!
            </h3>
            <p className="text-gray-700">
              Your KYC details have been submitted for review.
            </p>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={form.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date of Birth
              </label>
              <input
                id="dob"
                name="dob"
                type="date"
                required
                value={form.dob}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                required
                value={form.address}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Your address"
              />
            </div>
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Country
              </label>
              <input
                id="country"
                name="country"
                type="text"
                required
                value={form.country}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Country of residence"
              />
            </div>
            <div>
              <label
                htmlFor="idType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                ID Type
              </label>
              <select
                id="idType"
                name="idType"
                required
                value={form.idType}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="">Select ID type</option>
                <option value="passport">Passport</option>
                <option value="national_id">National ID</option>
                <option value="driver_license">Drivers License</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="idNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                ID Number
              </label>
              <input
                id="idNumber"
                name="idNumber"
                type="text"
                required
                value={form.idNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="ID number"
              />
            </div>
            <div>
              <label
                htmlFor="idFile"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Upload ID Document
              </label>
              <input
                id="idFile"
                name="idFile"
                type="file"
                accept="image/*,application/pdf"
                required
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200"
            >
              Submit KYC
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
