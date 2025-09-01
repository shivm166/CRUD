import React, { useState, useEffect } from "react";
import axios from "axios";

// Now accepts 'data', 'setData', and an optional 'editingUser' prop
const Form = ({ data, setData, editingUser }) => {
  const [form, setForm] = useState({
    id: null, // New: Add an 'id' field to the state
    name: "",
    username: "",
    email: "",
  });

  // Use a useEffect hook to populate the form if an editingUser prop is passed
  useEffect(() => {
    if (editingUser) {
      setForm(editingUser);
    } else {
      // Clear the form if no user is being edited
      setForm({ id: null, name: "", username: "", email: "" });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  const handlePost = async () => {
    try {
      let res;
      // Conditional logic to determine if we are creating or updating
      if (form.id) {
        // If the form has an ID, it's an update (PUT request)
        res = await axios.put(
          `https://jsonplaceholder.typicode.com/users/${form.id}`,
          form
        );
        if (res.status === 200) {
          // Update the existing user in the state array
          setData((prevData) =>
            prevData.map((user) => (user.id === res.data.id ? res.data : user))
          );
        }
      } else {
        // If the form has no ID, it's a new record (POST request)
        res = await axios.post(
          "https://jsonplaceholder.typicode.com/users",
          form
        );
        if (res.status === 201) {
          // Find the maximum current ID
          const ids = (data || []).map((item) => item.id);
          const maxId = ids.length > 0 ? Math.max(...ids) : 0;
          const newId = maxId + 1;

          // Create the new user object with the incremented ID
          const newUser = {
            ...res.data,
            id: newId,
          };
          setData((prevData) => [...prevData, newUser]);
        }
      }
      // Reset the form after a successful post or put
      setForm({ id: null, name: "", username: "", email: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePost();
    console.log(form);
  };

  return (
    <>
      <div className="p-5 font-sans">
        <h1 className="text-2xl font-bold mb-4">
          {form.id ? "Edit Record" : "Add New Record"}
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-sm mx-auto border border-gray-300 p-5 rounded-lg shadow-md"
        >
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name || ""}
              onChange={handleChange}
              className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username || ""}
              onChange={handleChange}
              className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email || ""}
              onChange={handleChange}
              className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            {form.id ? "Update Record" : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
