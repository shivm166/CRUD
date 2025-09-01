import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({
    id: null,
    name: "",
    username: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePost = async () => {
    try {
      let res;
      if (form.id) {
        // Update an existing record
        res = await axios.put(
          `https://jsonplaceholder.typicode.com/users/${form.id}`,
          form
        );
        if (res.status === 200) {
          setData((prevData) =>
            prevData.map((user) => (user.id === res.data.id ? res.data : user))
          );
        }
      } else {
        // Add a new record
        res = await axios.post(
          "https://jsonplaceholder.typicode.com/users",
          form
        );
        if (res.status === 201) {
          const ids = (data || []).map((item) => item.id);
          const maxId = ids.length > 0 ? Math.max(...ids) : 0;
          const newId = maxId + 1;
          const newUser = {
            ...res.data,
            id: newId,
          };
          setData((prevData) => [...prevData, newUser]);
        }
      }
      setForm({ id: null, name: "", username: "", email: "" });
      setEditingUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setData(data.filter((item) => item.id !== id));
      console.log(`Record Deleted ${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setForm(user);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 font-sans">
      <h1 className="text-4xl font-bold text-gray-800 my-6">HTTP Methods</h1>

      {/* Form Section */}
      <div className="p-5 font-sans w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">
          {editingUser ? "Edit Record" : "Add New Record"}
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePost();
          }}
          className="flex flex-col gap-4 border border-gray-300 p-5 rounded-lg shadow-md bg-white"
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
            {editingUser ? "Update Record" : "Submit"}
          </button>
        </form>
      </div>

      {/* Data Display Section */}
      {data.length > 0 ? (
        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
          {data.map((user) => (
            <li
              key={user.id}
              className="bg-gray-100 border border-gray-300 p-6 rounded-lg shadow-md hover:bg-gray-200 transition-colors duration-200 flex flex-col items-center text-center"
            >
              <h1 className="text-sm font-light text-gray-500">
                ID: <span className="font-medium text-gray-800">{user.id}</span>
              </h1>
              <h1 className="text-lg font-semibold text-gray-900 mt-1">
                Name: <span className="font-normal">{user.name}</span>
              </h1>
              <h1 className="text-md text-gray-700 mt-1">
                Username: <span className="font-normal">{user.username}</span>
              </h1>
              <h1 className="text-md text-gray-700 mt-1">
                Email: <span className="font-normal">{user.email}</span>
              </h1>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="py-2 px-4 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 transition-colors duration-200"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(user)}
                  className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition-colors duration-200"
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 text-3xl text-gray-600 font-medium text-center">
          NO DATA TO DISPLAY
        </p>
      )}
    </div>
  );
};

export default Home;
