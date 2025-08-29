import React, { useState } from "react";
import axios from "axios";

const Form = ({ data, setData }) => {
  const postData = (post) => {
    return axios.post("https://jsonplaceholder.typicode.com/users", post);
  };
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
  });

  const addPostData = async () => {
    // Correctly send the 'form' state data
    try {
      const res = await postData(form);
      console.log("res:", res);
      if (res.status === 201) {
        // Create a new object for the user with a unique ID.
        // We use Date.now() to generate a unique key.
        const newUser = { ...res.data, id: Date.now() };

        setData([...data, newUser]);
        // Clear the form after a successful submission
        setForm({ name: "", username: "", email: "" });
      }
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPostData();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-8 font-sans flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
        <h1 className="text-2xl md:text-3xl font-extrabold text-center mb-6 text-white tracking-wide">
          Add New User
        </h1>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-sm font-semibold mb-1 text-gray-400"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name || ""}
              onChange={handleChange}
              className="px-4 py-2 bg-gray-700 rounded-lg text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="text-sm font-semibold mb-1 text-gray-400"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username || ""}
              onChange={handleChange}
              className="px-4 py-2 bg-gray-700 rounded-lg text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-semibold mb-1 text-gray-400"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email || ""}
              onChange={handleChange}
              className="px-4 py-2 bg-gray-700 rounded-lg text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
              required
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full px-6 py-3 text-lg font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
